import { NextResponse } from "next/server";
import { getMenuItems, addMenuItem } from "@/app/lib/db";
import { categories } from "@/app/data/menu";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ items: getMenuItems() });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const description = String(body.description ?? "").trim();
  const price = Number(body.price);
  const category = body.category;

  if (!name || !description) {
    return NextResponse.json(
      { error: "Name and description are required." },
      { status: 400 }
    );
  }
  if (!Number.isFinite(price) || price < 0) {
    return NextResponse.json({ error: "Price must be a positive number." }, {
      status: 400,
    });
  }
  if (!categories.includes(category)) {
    return NextResponse.json(
      { error: `Category must be one of: ${categories.join(", ")}` },
      { status: 400 }
    );
  }

  const item = addMenuItem({
    name,
    description,
    descriptionEs: String(body.descriptionEs ?? "").trim(),
    price,
    category,
    emoji: String(body.emoji ?? "").trim() || undefined,
    popular: Boolean(body.popular),
  });

  return NextResponse.json({ item }, { status: 201 });
}
