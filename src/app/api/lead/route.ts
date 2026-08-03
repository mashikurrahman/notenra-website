import { Resend } from "resend";

/* Single endpoint behind both lead forms: the demo modal (reachable from all
   19 "Book Demo" buttons on the site) and the /contact form.

   Everything sensitive stays here. The Resend key is read from the server
   environment and never reaches the browser, which is the reason for a route
   handler rather than posting to a third-party form service from the client. */

export const dynamic = "force-dynamic";

const FROM = process.env.LEAD_FROM_EMAIL ?? "leads@notenra.com";
const TO = process.env.LEAD_TO_EMAIL ?? "hello@notenra.com";

/* Bots fill every field they can see, including ones positioned off-screen.
   A submission that fills this one is discarded. */
const HONEYPOT_FIELD = "company";

/* Humans do not complete a multi-field form in under this. The client stamps
   the time the form was first rendered; anything faster is scripted. */
const MIN_FILL_MS = 2500;

type LeadType = "demo" | "contact";

interface LeadPayload {
  type?: LeadType;
  name?: string;
  email?: string;
  specialty?: string;
  practiceSize?: string;
  practice?: string;
  message?: string;
  notes?: string;
  [HONEYPOT_FIELD]?: string;
  startedAt?: number;
}

function isValidEmail(value: string) {
  // Deliberately permissive: the goal is to catch typos and obvious junk, not
  // to re-implement RFC 5322. Anything that passes still gets verified by the
  // fact that a human has to reply to it.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(lead: LeadPayload) {
  const isDemo = lead.type === "demo";

  const rows: Array<[string, string | undefined]> = isDemo
    ? [
        ["Name", lead.name],
        ["Work email", lead.email],
        ["Specialty", lead.specialty],
        ["Practice size", lead.practiceSize],
        ["EHR / requirements", lead.notes],
      ]
    : [
        ["Name", lead.name],
        ["Work email", lead.email],
        ["Practice", lead.practice],
        ["Message", lead.message],
      ];

  const present = rows.filter(([, v]) => v && v.trim().length > 0);

  const text = present.map(([k, v]) => `${k}: ${v}`).join("\n");

  const html = `
    <h2 style="font:600 18px system-ui;margin:0 0 16px">
      ${isDemo ? "Demo request" : "Contact form message"}
    </h2>
    <table style="font:14px system-ui;border-collapse:collapse">
      ${present
        .map(
          ([k, v]) => `
        <tr>
          <td style="padding:6px 16px 6px 0;color:#5F778F;vertical-align:top">${k}</td>
          <td style="padding:6px 0;color:#0B1B3A;white-space:pre-wrap">${escapeHtml(v!)}</td>
        </tr>`
        )
        .join("")}
    </table>`;

  return {
    subject: isDemo
      ? `Demo request — ${lead.name ?? "Unknown"}${lead.specialty ? ` (${lead.specialty})` : ""}`
      : `Contact form — ${lead.name ?? "Unknown"}`,
    text,
    html,
  };
}

export async function POST(request: Request) {
  let lead: LeadPayload;

  try {
    lead = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Malformed request." },
      { status: 400 }
    );
  }

  /* Spam checks return 200. Telling a bot precisely why it was rejected just
     helps whoever is tuning it — a silent accept is the cheaper outcome. */
  const trap = lead[HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim().length > 0) {
    return Response.json({ ok: true });
  }

  if (
    typeof lead.startedAt === "number" &&
    Date.now() - lead.startedAt < MIN_FILL_MS
  ) {
    return Response.json({ ok: true });
  }

  const name = lead.name?.trim();
  const email = lead.email?.trim();

  if (!name || !email) {
    return Response.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  /* A missing key is a deployment mistake, not a user error. Fail loudly in
     the server log and tell the visitor plainly rather than showing them a
     success screen for a lead that was never sent. */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[lead] RESEND_API_KEY is not set — the submission was NOT delivered.",
      { name, email, type: lead.type }
    );
    return Response.json(
      { ok: false, error: "Our form is temporarily unavailable." },
      { status: 503 }
    );
  }

  const { subject, text, html } = buildEmail(lead);

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      text,
      html,
      // So a reply in the inbox goes straight back to the prospect.
      replyTo: email,
    });

    if (error) {
      console.error("[lead] Resend rejected the send:", error, {
        name,
        email,
      });
      return Response.json(
        { ok: false, error: "We couldn't send that just now." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    /* The lead is logged on any failure path so a delivery outage never means
       a silently lost prospect — it can be recovered from the server logs. */
    console.error("[lead] Unexpected failure:", err, { name, email });
    return Response.json(
      { ok: false, error: "We couldn't send that just now." },
      { status: 500 }
    );
  }
}
