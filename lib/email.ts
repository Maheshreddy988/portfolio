import nodemailer from "nodemailer";
import { promises as dns } from "dns";
import type { ContactSubmission } from "./contact";
import { escapeHtml, firstName } from "./contact";

function maskEmail(value: string | undefined) {
  if (!value) return undefined;
  const [local, domain] = value.split("@");
  return domain ? `${local.slice(0, 2)}***@${domain}` : "[configured]";
}

export function getErrorDetails(error: unknown) {
  if (error instanceof Error) {
    const smtpError = error as Error & {
      code?: string;
      command?: string;
      response?: string;
      responseCode?: number;
    };
    return {
      name: smtpError.name,
      message: smtpError.message,
      code: smtpError.code,
      command: smtpError.command,
      response: smtpError.response,
      responseCode: smtpError.responseCode,
      stack: smtpError.stack,
    };
  }
  return { message: String(error) };
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const missing = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_SECURE",
    "SMTP_USER",
    "SMTP_PASSWORD",
    "SMTP_FROM_EMAIL",
    "SMTP_FROM_NAME",
    "CONTACT_RECEIVER_EMAIL",
  ].filter((key) => !process.env[key]);
  // console.log("[CONTACT] Email configuration check:", { SMTP_HOST: host, SMTP_PORT: process.env.SMTP_PORT, SMTP_SECURE: process.env.SMTP_SECURE, SMTP_USER: maskEmail(user), SMTP_PASSWORD_CONFIGURED: Boolean(password), SMTP_FROM_EMAIL: maskEmail(process.env.SMTP_FROM_EMAIL), SMTP_FROM_NAME: process.env.SMTP_FROM_NAME, CONTACT_RECEIVER_EMAIL: maskEmail(process.env.CONTACT_RECEIVER_EMAIL) });
  if (missing.length) {
    console.error("[CONTACT] Missing required email environment variable", {
      variable: missing[0],
    });
    throw new Error(`Missing email configuration: ${missing.join(", ")}`);
  }
  // console.log("[CONTACT] Creating SMTP transporter:", { host, port, secure: process.env.SMTP_SECURE === "true", user: maskEmail(user) });
  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass: password },
  });
}

function sender() {
  return {
    name: process.env.SMTP_FROM_NAME ?? "Portfolio Contact",
    address: process.env.SMTP_FROM_EMAIL ?? process.env.SMTP_USER ?? "",
  };
}

export async function sendContactEmails(contact: ContactSubmission) {
  // console.log("[CONTACT] Runtime:", { nodeEnv: process.env.NODE_ENV });
  const receiver = process.env.CONTACT_RECEIVER_EMAIL;
  const from = sender();
  const transporter = getTransporter();
  if (!receiver || !from.address)
    throw new Error("Contact email is not configured");
  // console.log("[CONTACT] Verifying SMTP connection...");
  try {
    await transporter.verify();
  } catch (error: unknown) {
    console.error(
      "[CONTACT] SMTP verification FAILED:",
      getErrorDetails(error),
    );
    throw error;
  }
  // console.log("[CONTACT] SMTP verification SUCCESS");
  const company = contact.company || "Not provided";
  const submitted = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const ownerSubject = `New Portfolio Contact — ${contact.name}${contact.company ? ` from ${contact.company}` : ""}`;
  const ownerText = `New message received through your portfolio.\n\nCONTACT DETAILS\n\nName: ${contact.name}\nEmail: ${contact.email}\nCompany: ${company}\n\nMESSAGE\n\n${contact.message}\n\nSubmitted: ${submitted}\n\nReply directly to this email to respond to ${contact.name}.`;
  // console.log("[CONTACT] Preparing owner notification email:", { to: maskEmail(receiver), replyTo: maskEmail(contact.email), subject: ownerSubject });
  let notification;
  try {
    // console.log("[CONTACT] Sending owner notification email...");
    notification = await transporter.sendMail({
      from,
      to: receiver,
      replyTo: contact.email,
      subject: ownerSubject,
      text: ownerText,
      html: `<div style="font-family:Arial,sans-serif;max-width:640px;line-height:1.6"><h2>New portfolio contact</h2><p><b>Name:</b> ${escapeHtml(contact.name)}<br><b>Email:</b> ${escapeHtml(contact.email)}<br><b>Company:</b> ${escapeHtml(company)}</p><h3>Message</h3><p style="white-space:pre-wrap">${escapeHtml(contact.message)}</p><hr><p>Submitted: ${escapeHtml(submitted)}<br>Reply directly to this email to respond.</p></div>`,
    });
    // console.log("[CONTACT] Owner notification email SUCCESS:", { messageId: notification.messageId, accepted: notification.accepted, rejected: notification.rejected, response: notification.response, envelope: notification.envelope });
  } catch (error: unknown) {
    console.error(
      "[CONTACT] Owner notification email FAILED:",
      getErrorDetails(error),
    );
    throw error;
  }
  console.log("[CONTACT] Owner email sent successfully");
  try {
    const greeting = firstName(contact.name)
      ? `Hi ${firstName(contact.name)},`
      : "Hi,";
    const profileName =
      process.env.NEXT_PUBLIC_PROFILE_NAME ?? "Obulapuram Maheswara Reddy";
    const role =
      process.env.NEXT_PUBLIC_PROFILE_ROLE ??
      "Backend Developer & DevOps Engineer";
    const confirmationText = `${greeting}\n\nThank you for reaching out through my portfolio.\n\nI’ve received your message and appreciate your interest in connecting with me.\n\nName: ${contact.name}\nCompany: ${company}\n\nMessage:\n${contact.message}\n\nI’ll review your message and get back to you as soon as possible.\n\nBest regards,\n\n${profileName}\n${role}`;
    const confirmationSubject = `Thank you for reaching out — ${profileName}`;
    // console.log("[CONTACT] Preparing visitor confirmation email:", { to: maskEmail(contact.email), replyTo: maskEmail(receiver), subject: confirmationSubject });
    // console.log("[CONTACT] Sending visitor confirmation email...");
    const confirmation = await transporter.sendMail({
      from,
      to: contact.email,
      replyTo: receiver,
      subject: confirmationSubject,
      text: confirmationText,
      html: `<div style="font-family:Arial,sans-serif;max-width:640px;line-height:1.6"><p>${escapeHtml(greeting)}</p><p>Thank you for reaching out through my portfolio. I’ve received your message and appreciate your interest in connecting with me.</p><p><b>Name:</b> ${escapeHtml(contact.name)}<br><b>Company:</b> ${escapeHtml(company)}</p><p><b>Message:</b></p><p style="white-space:pre-wrap">${escapeHtml(contact.message)}</p><p>I’ll review your message and get back to you as soon as possible.</p><p>Best regards,<br><br><b>${escapeHtml(profileName)}</b><br>${escapeHtml(role)}<br>${escapeHtml(process.env.NEXT_PUBLIC_PROFILE_EMAIL ?? from.address)}<br>${escapeHtml(process.env.NEXT_PUBLIC_GITHUB_URL ?? "")}<br>${escapeHtml(process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "")}</p></div>`,
    });
    // console.log("[CONTACT] Visitor confirmation email SUCCESS:", { messageId: confirmation.messageId, accepted: confirmation.accepted, rejected: confirmation.rejected, response: confirmation.response, envelope: confirmation.envelope });
    // console.log("[CONTACT] COMPLETE SUCCESS:", { ownerNotification: true, visitorConfirmation: true });
    return { confirmationSent: true };
  } catch (error: unknown) {
    console.error(
      "[CONTACT] Visitor confirmation email FAILED:",
      getErrorDetails(error),
    );
    return { confirmationSent: false };
  }
}

export async function domainHasMxRecords(email: string): Promise<boolean> {
  const domain = email.split("@")[1]?.trim().toLowerCase();
  if (!domain) return false;
  console.log("[CONTACT] Starting MX validation:", { domain });
  console.log("[CONTACT] Resolving MX records...");
  try {
    const records = await dns.resolveMx(domain);
    console.log("[CONTACT] MX validation passed:", {
      domain,
      recordCount: records.length,
    });
    return records.length > 0;
  } catch (error: unknown) {
    console.error("[CONTACT] MX validation failed:", {
      domain,
      ...getErrorDetails(error),
      stack: undefined,
    });
    return false;
  }
}
