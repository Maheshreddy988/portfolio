import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";
import { domainHasMxRecords, getErrorDetails, sendContactEmails } from "@/lib/email";

export const runtime = "nodejs";
const requests = new Map<string, number[]>();
const WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

function clientIp(request: NextRequest) { return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"; }
function limited(ip: string) { const now = Date.now(); const recent = (requests.get(ip) ?? []).filter((time) => now - time < WINDOW); if (recent.length >= MAX_REQUESTS) { requests.set(ip, recent); return true; } recent.push(now); requests.set(ip, recent); return false; }

function validationMessage(field: string, message: string) {
  if (field === "name") return message.includes("at least") ? "Name must contain at least 2 characters" : message.includes("at most") ? "Name must be 100 characters or fewer" : "Please provide a valid name";
  if (field === "email") return "Please provide a valid email address";
  if (field === "company") return "Company must be 150 characters or fewer";
  if (field === "message") return message.includes("at least") ? "Message must contain at least 10 characters" : "Message must be 5000 characters or fewer";
  return "Please check your details and try again";
}

export async function POST(request: NextRequest) {
  console.log("[CONTACT] API request received");
  const ip = clientIp(request);
  if (limited(ip)) { console.error("[CONTACT] RATE LIMIT FAILED:", { reason: "Too many requests", status: 429 }); return NextResponse.json({ success: false, message: "Too many messages. Please try again later." }, { status: 429 }); }
  try {
    const body = await request.text();
    if (body.length > 20_000) { console.error("[CONTACT] REQUEST SIZE FAILED:", { length: body.length, maximum: 20_000 }); return NextResponse.json({ success: false, message: "Your message is too large." }, { status: 413 }); }
    let payload: unknown;
    try { payload = JSON.parse(body); } catch (error: unknown) { console.error("[CONTACT] JSON parsing failed:", getErrorDetails(error)); return NextResponse.json({ success: false, message: "Please check your details and try again." }, { status: 400 }); }
    const bodyRecord = typeof payload === "object" && payload !== null ? payload as Record<string, unknown> : {};
    console.log("[CONTACT] Request body parsed:", { name: bodyRecord.name ? "[provided]" : "[missing]", email: bodyRecord.email ? "[provided]" : "[missing]", company: bodyRecord.company ? "[provided]" : "[missing]", message: bodyRecord.message ? "[provided]" : "[missing]" });
    console.log("[CONTACT] Starting validation");
    const name = typeof bodyRecord.name === "string" ? bodyRecord.name.trim() : "";
    const emailInput = typeof bodyRecord.email === "string" ? bodyRecord.email.trim().toLowerCase() : "";
    const company = typeof bodyRecord.company === "string" ? bodyRecord.company.trim() : "";
    const message = typeof bodyRecord.message === "string" ? bodyRecord.message.trim() : "";
    console.log("[CONTACT] Validating name:", { provided: Boolean(name), length: name.length });
    console.log("[CONTACT] Validating email:", { provided: Boolean(emailInput), value: emailInput });
    console.log("[CONTACT] Validating company:", { provided: Boolean(company), length: company.length });
    console.log("[CONTACT] Validating message:", { provided: Boolean(message), length: message.length });
    const parsed = contactSchema.safeParse({ name, email: emailInput, company, message });
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      for (const validationIssue of parsed.error.issues) {
        console.error("[CONTACT] VALIDATION FAILED:", { field: String(validationIssue.path[0] ?? "request"), reason: validationIssue.message });
      }
      const field = String(issue?.path[0] ?? "request");
      const responseMessage = validationMessage(field, issue?.message ?? "");
      return NextResponse.json({ success: false, message: responseMessage }, { status: 400 });
    }
    const email = parsed.data.email.trim().toLowerCase();
    console.log("[CONTACT] Normalized request:", { name: parsed.data.name, email, company: parsed.data.company || "Not provided", messageLength: parsed.data.message.length });
    console.log("[CONTACT] Basic validation passed");
    if (!(await domainHasMxRecords(email))) return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    parsed.data.email = email;
    const result = await sendContactEmails(parsed.data);
    if (!result.confirmationSent) return NextResponse.json({ success: false, message: "We couldn't send your message right now. Please try again shortly." }, { status: 502 });
    return NextResponse.json({ success: true, message: "Thank you for reaching out! Your message has been sent successfully." });
  } catch (error: unknown) { console.error("[CONTACT] Unexpected API error:", getErrorDetails(error)); return NextResponse.json({ success: false, message: "We couldn’t send your message right now. Please try again shortly." }, { status: 500 }); }
}
