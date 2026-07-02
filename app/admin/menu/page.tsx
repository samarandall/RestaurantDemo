"use client";

import { useCallback, useEffect, useState } from "react";
import { categories, type MenuItem } from "@/app/data/menu";

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((data) => setItems(data.items ?? []))
      .catch(() => setError("Could not load menu items."));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function addItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          description: data.get("description"),
          descriptionEs: data.get("descriptionEs"),
          price: Number(data.get("price")),
          category: data.get("category"),
          emoji: data.get("emoji"),
          popular: data.get("popular") === "on",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to add item");
      form.reset();
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(id: string) {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
      setItems((prev) => prev?.filter((i) => i.id !== id) ?? prev);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    } finally {
      setBusyId(null);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-brand-200 bg-brand-50/40 px-3 py-2 text-sm outline-none focus:border-brand-500";

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      {/* Add form */}
      <form
        onSubmit={addItem}
        className="h-fit space-y-3 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
      >
        <h2 className="font-serif text-xl font-bold text-ink">Add a dish</h2>

        <input name="name" required placeholder="Name" className={inputClass} />
        <textarea
          name="description"
          required
          rows={2}
          placeholder="Description (English)"
          className={inputClass}
        />
        <textarea
          name="descriptionEs"
          rows={2}
          placeholder="Descripción (Español) — optional"
          className={inputClass}
        />
        <div className="flex gap-3">
          <input
            name="price"
            required
            type="number"
            min="0"
            step="0.5"
            placeholder="Price"
            className={inputClass}
          />
          <input
            name="emoji"
            placeholder="Emoji"
            maxLength={4}
            defaultValue="🍽️"
            className={`${inputClass} w-24 text-center`}
          />
        </div>
        <select name="category" className={inputClass} defaultValue="Pasta">
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input name="popular" type="checkbox" className="h-4 w-4" />
          Mark as popular
        </label>
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-full bg-brand-600 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add dish"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>

      {/* Current items */}
      <div>
        <h2 className="mb-4 font-serif text-xl font-bold text-ink">
          Current menu{" "}
          <span className="text-ink/40">({items?.length ?? 0})</span>
        </h2>
        <div className="space-y-2">
          {items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-brand-100 bg-white p-3 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-xl">
                {item.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink">
                  {item.name}
                  {item.popular && (
                    <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">
                      Popular
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-ink/50">
                  {item.category} · ${item.price}
                </p>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                disabled={busyId === item.id}
                className="rounded-full border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                {busyId === item.id ? "…" : "Delete"}
              </button>
            </div>
          ))}
          {items && items.length === 0 && (
            <p className="text-ink/50">No items — add one to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
}
