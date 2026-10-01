import nodemailer, { type Transporter } from "nodemailer";
import { contact } from "@/content/site";

/**
 * SMTP mailer for the contact form. Configured entirely from env:
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,
 *   CONTACT_TO (optional, comma-separated; defaults to the site email, info@rootsofgrowth.com.sa),
 *   CONTACT_FROM (optional, defaults to SMTP_USER).
 */
export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  to: string[];
  from: string;
};

/** Returns the config, or the list of missing env variable names. */
export function readMailConfig(): { config: MailConfig } | { missing: string[] } {
  const env = process.env;
  const required = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"] as const;
  const missing: string[] = required.filter((k) => !env[k]?.trim());
  const port = Number(env.SMTP_PORT || 465);
  if (!Number.isInteger(port) || port <= 0) missing.push("SMTP_PORT (invalid)");
  if (missing.length) return { missing };

  const secureRaw = (env.SMTP_SECURE ?? "").trim().toLowerCase();
  const secure = secureRaw ? secureRaw === "true" || secureRaw === "1" : port === 465;
  return {
    config: {
      host: env.SMTP_HOST!.trim(),
      port,
      secure,
      user: env.SMTP_USER!.trim(),
      pass: env.SMTP_PASS!,
      to: (env.CONTACT_TO?.trim() || contact.email).split(",").map((s) => s.trim()).filter(Boolean),
      from: (env.CONTACT_FROM || "").trim() || env.SMTP_USER!.trim(),
    },
  };
}

let cached: { key: string; transporter: Transporter } | null = null;

function getTransporter(c: MailConfig): Transporter {
  const key = `${c.host}|${c.port}|${c.secure}|${c.user}`;
  if (cached?.key === key) return cached.transporter;
  const transporter = nodemailer.createTransport({
    host: c.host,
    port: c.port,
    secure: c.secure,
    auth: { user: c.user, pass: c.pass },
    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  cached = { key, transporter };
  return transporter;
}

export async function sendMail(
  c: MailConfig,
  message: {
    subject: string;
    text: string;
    html: string;
    replyTo?: string;
    attachments?: { filename: string; content: Buffer; contentType?: string }[];
  },
) {
  return getTransporter(c).sendMail({
    from: { name: "Roots of Growth — Website", address: c.from },
    to: c.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    html: message.html,
    attachments: message.attachments,
  });
}

/** Escape text for safe interpolation into HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
