"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const { t, locale, toggle } = useLanguage();

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-brand-50/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="font-serif text-xl font-bold text-brand-700">
            Bella Cucina
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                pathname === l.href
                  ? "bg-brand-100 text-brand-800"
                  : "text-ink/70 hover:text-brand-700"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <button
            onClick={toggle}
            aria-label="Switch language"
            className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            {locale === "en" ? "🇲🇽 ES" : "🇺🇸 EN"}
          </button>

          <Link
            href="/cart"
            className="relative rounded-full bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            {t.nav.cart}
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
