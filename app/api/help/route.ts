import { NextRequest } from "next/server";
import { proxyToOdoo } from "@/lib/odooProxy";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return proxyToOdoo("/api/help", req);
}