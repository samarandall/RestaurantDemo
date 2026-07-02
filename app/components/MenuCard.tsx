"use client";

import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/app/context/LanguageContext";
import type { MenuItem } from "@/app/data/menu";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { add, decrement, qtyOf } = useCart();
  const { t, locale } = useLanguage();
  const qty = qtyOf(item.id);
  const description = locale === "es" ? item.descriptionEs : item.description;

  return (
    <div className="flex flex-col rounded-2xl border border-brand-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-3xl">
          {item.emoji}
        </div>
        <span className="font-serif text-lg font-bold text-brand-700">
          ${item.price}
        </span>
      </div>

      <h3 className="mt-3 font-serif text-lg font-semibold text-ink">
        {item.name}
        {item.popular && (
          <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 align-middle text-xs font-semibold text-brand-700">
            {t.card.popular}
          </span>
        )}
      </h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-ink/70">
        {description}
      </p>

      <div className="mt-4">
        {qty === 0 ? (
          <button
            onClick={() => add(item)}
            className="w-full rounded-full bg-brand-600 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            {t.card.addToOrder}
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-full bg-brand-50 p-1">
            <button
              onClick={() => decrement(item.id)}
              aria-label={t.card.removeOne(item.name)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-brand-700 shadow-sm transition hover:bg-brand-100"
            >
              −
            </button>
            <span className="font-semibold text-ink">
              {qty} {t.card.inCart}
            </span>
            <button
              onClick={() => add(item)}
              aria-label={t.card.addOne(item.name)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-brand-700 shadow-sm transition hover:bg-brand-100"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
