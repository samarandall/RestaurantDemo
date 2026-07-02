"use client";

import { useCallback, useEffect, useState } from "react";
import type { Order } from "@/app/lib/db";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setError(null);
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data.orders ?? []))
      .catch(() => setError("Could not load orders."));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const revenue =
    orders?.reduce((s, o) => s + o.total, 0).toFixed(2) ?? "0.00";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="rounded-2xl border border-brand-100 bg-white px-5 py-3 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wide text-ink/50">
            Orders
          </div>
          <div className="font-serif text-2xl font-bold text-ink">
            {orders?.length ?? "—"}
          </div>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-white px-5 py-3 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wide text-ink/50">
            Revenue
          </div>
          <div className="font-serif text-2xl font-bold text-ink">
            ${revenue}
          </div>
        </div>
        <button
          onClick={load}
          className="ml-auto rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          ↻ Refresh
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {orders && orders.length === 0 && (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-white/50 py-16 text-center text-ink/50">
          No orders yet. Place one from the{" "}
          <a href="/menu" className="font-semibold text-brand-600">
            menu
          </a>
          .
        </div>
      )}

      <div className="space-y-4">
        {orders?.map((o) => (
          <div
            key={o.id}
            className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-brand-700">
                  {o.orderNumber}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
                    o.mode === "delivery"
                      ? "bg-brand-100 text-brand-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {o.mode}
                </span>
              </div>
              <span className="text-sm text-ink/50">
                {formatDate(o.createdAt)}
              </span>
            </div>

            <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_260px]">
              <div>
                <p className="text-sm font-semibold text-ink">
                  {o.customerName}{" "}
                  <span className="font-normal text-ink/60">· {o.phone}</span>
                </p>
                {o.address && (
                  <p className="text-sm text-ink/60">{o.address}</p>
                )}
                <ul className="mt-2 space-y-1 text-sm text-ink/80">
                  {o.items.map((it) => (
                    <li key={it.id} className="flex justify-between">
                      <span>
                        {it.qty}× {it.name}
                      </span>
                      <span className="tabular-nums text-ink/50">
                        ${(it.price * it.qty).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="space-y-1 rounded-xl bg-brand-50/60 p-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink/60">Subtotal</dt>
                  <dd>${o.subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/60">Delivery</dt>
                  <dd>${o.deliveryFee.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/60">Tax</dt>
                  <dd>${o.tax.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between border-t border-brand-100 pt-1 font-bold">
                  <dt>Total</dt>
                  <dd>${o.total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
