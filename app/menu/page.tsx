"use client";

import { categories } from "@/app/data/menu";
import MenuCard from "@/app/components/MenuCard";
import { useLanguage } from "@/app/context/LanguageContext";
import { useMenu } from "@/app/hooks/useMenu";

export default function MenuPage() {
  const { t } = useLanguage();
  const { items, loading, error } = useMenu();
  const menu = items ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="text-center">
        <h1 className="font-serif text-4xl font-bold text-ink">
          {t.menu.title}
        </h1>
        <p className="mt-2 text-ink/70">{t.menu.subtitle}</p>
      </header>

      {/* Category quick-nav */}
      <nav className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <a
            key={c}
            href={`#${c}`}
            className="rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
          >
            {t.categories[c]}
          </a>
        ))}
      </nav>

      {loading && (
        <p className="mt-12 text-center text-ink/50">Loading menu…</p>
      )}
      {error && <p className="mt-12 text-center text-red-600">{error}</p>}

      {categories.map((category) => {
        const items = menu.filter((m) => m.category === category);
        if (items.length === 0) return null;
        return (
          <section key={category} id={category} className="scroll-mt-24 pt-12">
            <h2 className="font-serif text-2xl font-bold text-brand-700">
              {t.categories[category]}
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
