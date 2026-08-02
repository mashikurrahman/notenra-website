import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const footerLinks = {
    Solutions: [
      {
        name: "Medical Documentation",
        href: "/solutions/medical-documentation",
      },
      { name: "Medical Coding", href: "/solutions/medical-coding" },
      { name: "Medical Billing", href: "/solutions/medical-billing" },
      {
        name: "Payroll Management",
        href: "/solutions/payroll-management",
      },
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Pricing", href: "/pricing" },
      { name: "Security & Compliance", href: "/security" },
      { name: "Testimonials", href: "/about#testimonials" },
      { name: "FAQ", href: "/about#faq" },
      { name: "Contact", href: "/contact" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Business Associate Agreement (BAA)", href: "/security" },
      { name: "HIPAA Statement", href: "/security" },
    ],
  };

  return (
    <footer className="bg-brand-ink text-white pt-16 pb-10 relative overflow-hidden">
      <div className="page-container relative z-10">
        <div className="pb-10 border-b border-white/10">
          <Logo variant="light" size="lg" />
          <p className="text-sm text-white/50 mt-2 max-w-sm">
            AI documentation, coding &amp; billing workflows, refined by
            healthcare experts.
          </p>
        </div>

        <div className="py-10 grid grid-cols-2 md:grid-cols-3 gap-8 border-b border-white/10">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold tracking-wider text-white/80 mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/40 hover:text-brand-teal transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div>
            &copy; {new Date().getFullYear()} NOTENRA Medical Intelligence, Inc.
            All rights reserved.
          </div>
          <span>
            Built for Modern Independent Practices &amp; Medical Groups
          </span>
        </div>
      </div>
    </footer>
  );
}
