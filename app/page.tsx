"use client";

import Link from "next/link";
import MenuCard from "@/app/components/MenuCard";
import { useLanguage } from "@/app/context/LanguageContext";
import { useMenu } from "@/app/hooks/useMenu";

export default function HomePage() {
  const { t } = useLanguage();
  const { items } = useMenu();
  const featured = (items ?? []).filter((m) => m.popular).slice(0, 3);
  const icons = ["👨‍🍳", "🚴", "🌿"];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:py-24 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700">
              {t.home.badge}
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {t.home.titleBefore}{" "}
              <span className="text-brand-600">{t.home.titleHighlight}</span>{" "}
              {t.home.titleAfter}
            </h1>
            <p className="mt-4 max-w-md text-lg text-ink/70">
              {t.home.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
              >
                {t.home.orderOnline}
              </Link>
              <Link
                href="/menu"
                className="rounded-full border border-brand-200 bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-50"
              >
                {t.home.viewMenu}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-brand-200 via-brand-300 to-brand-500 shadow-xl">
              <div className="flex h-full items-center justify-center text-[10rem]">
                🍝
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {t.home.props.map((f, i) => (
            <div
              key={f.title}
              className="rounded-2xl border border-brand-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="text-3xl">{icons[i]}</div>
              <h3 className="mt-2 font-serif text-lg font-semibold text-ink">
                {f.title}
              </h3>
              <p className="mt-1 text-sm text-ink/70">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl font-bold text-ink">
            {t.home.favorites}
          </h2>
          <Link
            href="/menu"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            {t.home.seeFullMenu}
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
