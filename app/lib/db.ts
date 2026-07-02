import "server-only";
import path from "node:path";
import fs from "node:fs";
import Database from "better-sqlite3";
import { menu as seedMenu, type MenuItem } from "@/app/data/menu";

export type OrderItem = { id: string; name: string; price: number; qty: number };

export type Order = {
  id: number;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string | null;
  mode: "delivery" | "pickup";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  createdAt: string;
};

// Reuse a single connection across hot reloads in dev.
const globalForDb = globalThis as unknown as { __bellaDb?: Database.Database };

function init(): Database.Database {
  const dataDir = path.join(process.cwd(), "data");
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new Database(path.join(dataDir, "bella-cucina.db"));
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id            TEXT PRIMARY KEY,
      name          TEXT NOT NULL,
      description   TEXT NOT NULL,
      descriptionEs TEXT NOT NULL DEFAULT '',
      price         REAL NOT NULL,
      category      TEXT NOT NULL,
      emoji         TEXT NOT NULL DEFAULT '🍽️',
      popular       INTEGER NOT NULL DEFAULT 0,
      sort          INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS orders (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number  TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      phone         TEXT NOT NULL,
      address       TEXT,
      mode          TEXT NOT NULL,
      items         TEXT NOT NULL,
      subtotal      REAL NOT NULL,
      delivery_fee  REAL NOT NULL,
      tax           REAL NOT NULL,
      total         REAL NOT NULL,
      created_at    TEXT NOT NULL
    );
  `);

  // Seed the menu from the static data the first time only.
  const count = (
    db.prepare("SELECT COUNT(*) AS n FROM menu_items").get() as { n: number }
  ).n;
  if (count === 0) {
    const insert = db.prepare(
      `INSERT INTO menu_items
        (id, name, description, descriptionEs, price, category, emoji, popular, sort)
       VALUES (@id, @name, @description, @descriptionEs, @price, @category, @emoji, @popular, @sort)`
    );
    const seedAll = db.transaction((items: MenuItem[]) => {
      items.forEach((item, i) =>
        insert.run({
          ...item,
          popular: item.popular ? 1 : 0,
          sort: i,
        })
      );
    });
    seedAll(seedMenu);
  }

  return db;
}

function getDb(): Database.Database {
  if (!globalForDb.__bellaDb) globalForDb.__bellaDb = init();
  return globalForDb.__bellaDb;
}

type MenuRow = Omit<MenuItem, "popular"> & { popular: number; sort: number };

function rowToItem(row: MenuRow): MenuItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    descriptionEs: row.descriptionEs,
    price: row.price,
    category: row.category,
    emoji: row.emoji,
    popular: row.popular === 1,
  };
}

export function getMenuItems(): MenuItem[] {
  const rows = getDb()
    .prepare("SELECT * FROM menu_items ORDER BY sort, name")
    .all() as MenuRow[];
  return rows.map(rowToItem);
}

export function addMenuItem(input: {
  name: string;
  description: string;
  descriptionEs?: string;
  price: number;
  category: MenuItem["category"];
  emoji?: string;
  popular?: boolean;
}): MenuItem {
  const db = getDb();
  const base =
    input.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item";
  // Ensure a unique id.
  let id = base;
  let n = 1;
  const exists = db.prepare("SELECT 1 FROM menu_items WHERE id = ?");
  while (exists.get(id)) id = `${base}-${++n}`;

  const maxSort =
    (db.prepare("SELECT MAX(sort) AS m FROM menu_items").get() as { m: number | null })
      .m ?? 0;

  db.prepare(
    `INSERT INTO menu_items
      (id, name, description, descriptionEs, price, category, emoji, popular, sort)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.name,
    input.description,
    input.descriptionEs ?? "",
    input.price,
    input.category,
    input.emoji || "🍽️",
    input.popular ? 1 : 0,
    maxSort + 1
  );

  return rowToItem(
    db.prepare("SELECT * FROM menu_items WHERE id = ?").get(id) as MenuRow
  );
}

export function deleteMenuItem(id: string): boolean {
  const info = getDb().prepare("DELETE FROM menu_items WHERE id = ?").run(id);
  return info.changes > 0;
}

type OrderRow = {
  id: number;
  order_number: string;
  customer_name: string;
  phone: string;
  address: string | null;
  mode: "delivery" | "pickup";
  items: string;
  subtotal: number;
  delivery_fee: number;
  tax: number;
  total: number;
  created_at: string;
};

function rowToOrder(row: OrderRow): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    phone: row.phone,
    address: row.address,
    mode: row.mode,
    items: JSON.parse(row.items) as OrderItem[],
    subtotal: row.subtotal,
    deliveryFee: row.delivery_fee,
    tax: row.tax,
    total: row.total,
    createdAt: row.created_at,
  };
}

export function createOrder(input: {
  customerName: string;
  phone: string;
  address: string | null;
  mode: "delivery" | "pickup";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}): Order {
  const db = getDb();
  const orderNumber =
    "BC-" + Math.floor(100000 + Math.random() * 900000).toString();
  const createdAt = new Date().toISOString();

  const info = db
    .prepare(
      `INSERT INTO orders
        (order_number, customer_name, phone, address, mode, items,
         subtotal, delivery_fee, tax, total, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      orderNumber,
      input.customerName,
      input.phone,
      input.address,
      input.mode,
      JSON.stringify(input.items),
      input.subtotal,
      input.deliveryFee,
      input.tax,
      input.total,
      createdAt
    );

  return rowToOrder(
    db
      .prepare("SELECT * FROM orders WHERE id = ?")
      .get(info.lastInsertRowid) as OrderRow
  );
}

export function getOrders(): Order[] {
  const rows = getDb()
    .prepare("SELECT * FROM orders ORDER BY id DESC")
    .all() as OrderRow[];
  return rows.map(rowToOrder);
}
