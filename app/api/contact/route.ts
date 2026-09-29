import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const required = ["name", "email", "company", "title", "size", "role"];
    for (const field of required) {
      if (!body[field] || typeof body[field] !== "string" || !body[field].trim()) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    if (!body.interest || !Array.isArray(body.interest) || body.interest.length === 0) {
      return NextResponse.json({ error: "At least one interest required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Kassandra Prophecy <contact@kassandraprophecy.com>",
      to: ["mustafa@kassandraprophecy.com"],
      replyTo: body.email,
      subject: `New briefing request — ${body.company} (${body.name})`,
      html: buildEmailHtml(body),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Email send failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface ContactBody {
  name: string;
  email: string;
  company: string;
  title: string;
  size: string;
  role: string;
  interest: string[];
  notes?: string;
}

function buildEmailHtml(data: ContactBody): string {
  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    company: escapeHtml(data.company),
    title: escapeHtml(data.title),
    size: escapeHtml(data.size),
    role: escapeHtml(data.role),
    notes: data.notes ? escapeHtml(data.notes) : "",
    interest: data.interest.map((i: string) => escapeHtml(i)),
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1A2834; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: #2B5372; color: white; padding: 28px 24px; border-radius: 12px 12px 0 0; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
          .header p { margin: 8px 0 0; opacity: 0.75; font-size: 14px; }
          .body { background: #F4F6F8; padding: 28px 24px; border-radius: 0 0 12px 12px; }
          .row { margin-bottom: 18px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #7A8A98; font-weight: 600; margin-bottom: 4px; }
          .value { font-size: 15px; color: #1A2834; }
          .interests { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
          .interest { background: #10B981; color: white; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; display: inline-block; }
          .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(43,83,114,0.1); font-size: 12px; color: #7A8A98; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Executive Briefing Request</h1>
            <p>${safe.company} — ${safe.name}</p>
          </div>
          <div class="body">
            <div class="row"><div class="label">Name</div><div class="value">${safe.name}</div></div>
            <div class="row"><div class="label">Work Email</div><div class="value">${safe.email}</div></div>
            <div class="row"><div class="label">Company</div><div class="value">${safe.company}</div></div>
            <div class="row"><div class="label">Job Title</div><div class="value">${safe.title}</div></div>
            <div class="row"><div class="label">Company Size</div><div class="value">${safe.size}</div></div>
            <div class="row"><div class="label">Role</div><div class="value">${safe.role}</div></div>
            <div class="row">
              <div class="label">Interest</div>
              <div class="interests">${safe.interest.map((i: string) => `<span class="interest">${i}</span>`).join("")}</div>
            </div>
            ${safe.notes ? `<div class="row"><div class="label">Notes</div><div class="value">${safe.notes.replace(/\n/g, "<br>")}</div></div>` : ""}
            <div class="footer">Sent from kassandraprophecy.com — Reply directly to this email to reach ${safe.name}.</div>
          </div>
        </div>
      </body>
    </html>
  `;
}
