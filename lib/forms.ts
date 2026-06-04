/* ════════════════════════════════════════════════════════════
   دوال الـ frontend — بتبعت للـ route تبع موقعك (مو لأودو مباشرة)
   استعملها بالكومبوننتس متل ما عملت مع calculateShipping
   ════════════════════════════════════════════════════════════ */

export type FormResponse = {
  success: boolean;
  data?: { id: number };
  message: string;
};

// الحقول المشتركة بين الفورمين
export type BaseFields = {
  fullname: string;
  email: string;
  phone: string;   // أرقام فقط (0-9)
  company: string;
  subject: string;
  body?: string;
};

export type ContactFields = BaseFields;
export type HelpFields = BaseFields;

async function postForm(
  endpoint: string,
  fields: BaseFields,
  file?: File | null
): Promise<FormResponse> {
  const fd = new FormData();
  fd.append("fullname", fields.fullname.trim());
  fd.append("email", fields.email.trim());
  fd.append("phone", fields.phone.replace(/\D/g, "")); // تنظيف: أرقام فقط
  fd.append("company", fields.company.trim());
  fd.append("subject", fields.subject.trim());
  fd.append("body", fields.body?.trim() ?? "");
  if (file) fd.append("attachment", file);

  const res = await fetch(endpoint, { method: "POST", body: fd });
  const data: FormResponse = await res
    .json()
    .catch(() => ({ success: false, message: "حدث خطأ غير متوقع" }));

  // لو فشل، بنرمي الرسالة القادمة من السيرفر مشان تعرضها بالـ UI
  if (!res.ok || !data.success) {
    throw new Error(data.message || "فشل الإرسال");
  }
  return data;
}

// نموذج طلب المساعدة (helpdesk ticket) — بيقبل مرفق اختياري
export function submitHelp(fields: HelpFields, file?: File | null) {
  return postForm("/api/help", fields, file);
}

// نموذج تواصل معنا (CRM lead)
export function submitContact(fields: ContactFields) {
  return postForm("/api/contact", fields);
}