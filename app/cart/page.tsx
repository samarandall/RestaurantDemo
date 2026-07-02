"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/app/context/LanguageContext";

const DELIVERY_FEE = 4.5;
const TAX_RATE = 0.08;

export default function CartPage() {
  const { lines, subtotal, count, add, decrement, remove, clear } = useCart();
  const { t } = useLanguage();
  const [mode, setMode] = useState<"pickup" | "delivery">("delivery");
  const [placed, setPlaced] = useState<null | { name: string; order: string }>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const delivery = mode === "delivery" ? DELIVERY_FEE : 0;
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + delivery + tax).toFixed(2);

  async function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "Guest");
    setSubmitting(true);
    setOrderError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          phone: String(data.get("phone") || ""),
          address: String(data.get("address") || ""),
          mode,
          items: lines.map((l) => ({
            id: l.item.id,
            name: l.item.name,
            price: l.item.price,
            qty: l.qty,
          })),
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      const { order } = await res.json();
      setPlaced({ name, order: order.orderNumber });
      clear();
    } catch {
      setOrderError("Sorry, we couldn't place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="text-6xl">🎉</div>
        <h1 className="mt-4 font-serif text-3xl font-bold text-ink">
          {t.cart.thanks(placed.name)}
        </h1>
        <p className="mt-2 text-ink/70">
          {t.cart.confirmedBefore}{" "}
          <span className="font-semibold">{placed.order}</span>{" "}
          {t.cart.confirmedAfter}{" "}
          {mode === "delivery" ? t.cart.onTheWay : t.cart.readyForPickup}.
        </p>
        <p className="mt-6 rounded-xl bg-brand-100/60 px-4 py-3 text-sm text-brand-800">
          {t.cart.noPayment}
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
        >
          {t.cart.orderAgain}
        </Link>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="text-6xl">🧺</div>
        <h1 className="mt-4 font-serif text-3xl font-bold text-ink">
          {t.cart.emptyTitle}
        </h1>
        <p className="mt-2 text-ink/70">{t.cart.emptyText}</p>
        <Link
          href="/menu"
          className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
        >
          {t.cart.browseMenu}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-ink">
        {t.cart.yourOrder}
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Line items */}
        <div className="space-y-3">
          {lines.map(({ item, qty }) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                {item.emoji}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-ink">{item.name}</h3>
                <p className="text-sm text-ink/60">
                  ${item.price} {t.cart.each}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-brand-50 p-1">
                <button
                  onClick={() => decrement(item.id)}
                  aria-label={t.card.removeOne(item.name)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-brand-700 shadow-sm"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => add(item)}
                  aria-label={t.card.addOne(item.name)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-brand-700 shadow-sm"
                >
                  +
                </button>
              </div>
              <div className="w-16 text-right font-semibold text-ink">
                ${(item.price * qty).toFixed(2)}
              </div>
              <button
                onClick={() => remove(item.id)}
                aria-label={t.cart.remove(item.name)}
                className="text-ink/40 transition hover:text-brand-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={clear}
            className="text-sm font-medium text-ink/50 hover:text-brand-600"
          >
            {t.cart.clearCart}
          </button>
        </div>

        {/* Checkout summary */}
        <div className="h-fit rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-2 rounded-full bg-brand-50 p-1">
            {(["delivery", "pickup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-full py-2 text-sm font-semibold capitalize transition ${
                  mode === m
                    ? "bg-brand-600 text-white"
                    : "text-brand-700 hover:bg-brand-100"
                }`}
              >
                {t.cart[m]}
              </button>
            ))}
          </div>

          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/70">{t.cart.subtotal}</dt>
              <dd className="font-medium">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/70 capitalize">
                {mode === "delivery" ? t.cart.delivery : t.cart.pickup}
              </dt>
              <dd className="font-medium">
                {delivery === 0 ? t.cart.free : `$${delivery.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/70">{t.cart.tax}</dt>
              <dd className="font-medium">${tax.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between border-t border-brand-100 pt-2 text-base font-bold text-ink">
              <dt>{t.cart.total}</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>

          <form onSubmit={placeOrder} className="mt-5 space-y-3">
            <input
              name="name"
              required
              placeholder={t.cart.namePlaceholder}
              className="w-full rounded-lg border border-brand-200 bg-brand-50/40 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
            <input
              name="phone"
              required
              type="tel"
              placeholder={t.cart.phonePlaceholder}
              className="w-full rounded-lg border border-brand-200 bg-brand-50/40 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
            {mode === "delivery" && (
              <input
                name="address"
                required
                placeholder={t.cart.addressPlaceholder}
                className="w-full rounded-lg border border-brand-200 bg-brand-50/40 px-3 py-2 text-sm outline-none focus:border-brand-500"
              />
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "…" : `${t.cart.placeOrder} · $${total.toFixed(2)}`}
            </button>
            {orderError && (
              <p className="text-center text-sm text-red-600">{orderError}</p>
            )}
          </form>
          <p className="mt-3 text-center text-xs text-ink/50">
            {t.cart.demoNote}
          </p>
        </div>
      </div>
    </div>
  );
}
