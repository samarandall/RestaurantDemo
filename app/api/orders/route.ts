import { NextResponse } from "next/server";
import { createOrder, getOrders, type OrderItem } from "@/app/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ orders: getOrders() });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const customerName = String(body.customerName ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const mode = body.mode === "pickup" ? "pickup" : "delivery";
  const rawItems = Array.isArray(body.items) ? body.items : [];

  if (!customerName || !phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 }
    );
  }
  if (rawItems.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const items: OrderItem[] = rawItems.map((it: any) => ({
    id: String(it.id),
    name: String(it.name),
    price: Number(it.price),
    qty: Number(it.qty),
  }));

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const deliveryFee = mode === "delivery" ? 4.5 : 0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + deliveryFee + tax).toFixed(2);

  const order = createOrder({
    customerName,
    phone,
    address: mode === "delivery" ? String(body.address ?? "").trim() || null : null,
    mode,
    items,
    subtotal: +subtotal.toFixed(2),
    deliveryFee,
    tax,
    total,
  });

  return NextResponse.json({ order }, { status: 201 });
}
