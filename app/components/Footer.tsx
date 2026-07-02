"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t border-brand-100 bg-brand-100/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-brand-700">
            Bella Cucina
          </h3>
          <p className="mt-2 text-sm text-ink/70">{t.footer.tagline}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">{t.footer.visit}</h4>
          <p className="mt-2 text-sm text-ink/70">
            128 Olive Street
            <br />
            Portland, OR 97204
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">{t.footer.hours}</h4>
          <p className="mt-2 text-sm text-ink/70">
            {t.footer.hoursValue}
            <br />
            {t.footer.hoursClosed}
          </p>
        </div>
      </div>
      <p className="pb-6 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} Bella Cucina · {t.footer.demo} ·{" "}
        <Link href="/admin" className="font-medium hover:text-brand-600">
          Admin
        </Link>
      </p>
    </footer>
  );
}
