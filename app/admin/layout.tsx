"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin", label: "Orders" },
  { href: "/admin/menu", label: "Menu items" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-ink">
          Admin
          <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 align-middle text-xs font-semibold text-brand-700">
            Bella Cucina
          </span>
        </h1>
        <Link href="/" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
          ← Back to site
        </Link>
      </div>

      <nav className="mt-6 flex gap-2 border-b border-brand-100">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition ${
              pathname === tab.href
                ? "border-brand-600 text-brand-700"
                : "border-transparent text-ink/60 hover:text-brand-700"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8">{children}</div>
    </div>
  );
}
