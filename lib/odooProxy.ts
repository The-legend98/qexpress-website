import { NextRequest, NextResponse } from "next/server";


const ODOO_URL = process.env.ODOO_API_URL;     
const ODOO_API_KEY = process.env.ODOO_API_KEY;  
const ODOO_DB = process.env.ODOO_DB;            

const REQUIRED = ["fullname", "email", "phone", "company", "subject"];

export async function proxyToOdoo(path: string, req: NextRequest) {
  if (!ODOO_URL || !ODOO_API_KEY || !ODOO_DB) {
    return NextResponse.json(
      { success: false, message: "Server not configured (missing ODOO_API_URL / ODOO_API_KEY / ODOO_DB)" },
      { status: 500 }
    );
  }

  let incoming: FormData;
  try {
    incoming = await req.formData();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid form data" },
      { status: 400 }
    );
  }

  for (const field of REQUIRED) {
    const v = incoming.get(field);
    if (typeof v !== "string" || v.trim() === "") {
      return NextResponse.json(
        { success: false, message: `الحقل "${field}" مطلوب` },
        { status: 400 }
      );
    }
  }

  const forward = new FormData();
  incoming.forEach((value, key) => forward.append(key, value));

  try {
    const res = await fetch(`${ODOO_URL}${path}`, {
      method: "POST",
      headers: {
        Authorization: ODOO_API_KEY,
        "X-Odoo-Database": ODOO_DB,
      },
      body: forward,
    });

    const data = await res
      .json()
      .catch(() => ({ success: false, message: "Bad response from upstream server" }));

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "تعذّر الوصول إلى الخادم" },
      { status: 502 }
    );
  }
}