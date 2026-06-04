import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ODOO_URL     = process.env.ODOO_API_URL;
const ODOO_API_KEY = process.env.ODOO_API_KEY;
const ODOO_DB      = process.env.ODOO_DB;

export async function GET(req: NextRequest) {
  const countryId = req.nextUrl.searchParams.get("country_id");
  if (!countryId) {
    return NextResponse.json({ success: false, message: "country_id is required" }, { status: 400 });
  }
  if (!ODOO_URL || !ODOO_API_KEY || !ODOO_DB) {
    return NextResponse.json({ success: false, message: "Server not configured" }, { status: 500 });
  }
  try {
    const res = await fetch(`${ODOO_URL}/api/areas/${countryId}`, {
      method: "GET",
      headers: {
        Authorization: ODOO_API_KEY,
        "X-Odoo-Database": ODOO_DB,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json().catch(() => ({ success: false, message: "Bad response" }));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 502 });
  }
}