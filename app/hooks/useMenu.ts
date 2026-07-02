"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "@/app/data/menu";

export function useMenu() {
  const [items, setItems] = useState<MenuItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/menu")
      .then((r) => r.json())
      .then((data) => {
        if (active) setItems(data.items ?? []);
      })
      .catch(() => {
        if (active) setError("Could not load the menu.");
      });
    return () => {
      active = false;
    };
  }, []);

  return { items, loading: items === null && !error, error };
}
