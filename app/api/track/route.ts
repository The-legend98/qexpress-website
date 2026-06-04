import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ODOO_URL     = process.env.ODOO_API_URL;
const ODOO_API_KEY = process.env.ODOO_API_KEY;
const ODOO_DB      = process.env.ODOO_DB;

export async function GET(req: NextRequest) {
  if (!ODOO_URL || !ODOO_API_KEY || !ODOO_DB) {
    return NextResponse.json(
      { success: false, message: "Server not configured" },
      { status: 500 }
    );
  }

  const shipmentNumber = req.nextUrl.searchParams.get("shipment_number");
  if (!shipmentNumber?.trim()) {
    return NextResponse.json(
      { success: false, message: "shipment_number is required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${ODOO_URL}/api/track_delivery_order?shipment_number=${encodeURIComponent(shipmentNumber.trim())}`,
      {
        method: "GET",
        headers: {
          Authorization: ODOO_API_KEY,
          "X-Odoo-Database": ODOO_DB,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json().catch(() => ({ success: false, message: "Bad response" }));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 502 }
    );
  }
}