import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const schema = {
  name: (value: unknown) => typeof value === "string" && value.trim().length > 0,
  email: (value: unknown) => typeof value === "string" && /.+@.+\..+/.test(value),
  subject: (value: unknown) => typeof value === "string" && value.trim().length > 0,
  message: (value: unknown) => typeof value === "string" && value.trim().length >= 10,
};

function isValidPayload(payload: unknown): payload is {
  name: string;
  email: string;
  subject: string;
  message: string;
} {
  if (!payload || typeof payload !== "object") return false;
  const candidate = payload as Record<string, unknown>;

  return (
    schema.name(candidate.name) &&
    schema.email(candidate.email) &&
    schema.subject(candidate.subject) &&
    schema.message(candidate.message)
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isValidPayload(body)) {
      return NextResponse.json(
        { success: false, message: "Please fill out all fields with valid values." },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;
    const toEmail = process.env.CONTACT_TO_EMAIL || "hammadzahid221@gmail.com";
    const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER || process.env.GMAIL_USER;
    const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS;
    const fromEmail = process.env.SMTP_FROM || emailUser || email;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    if (!emailUser || !emailPass) {
      console.error("Contact form email service is not configured.");
      return NextResponse.json(
        {
          success: false,
          message:
            "Email delivery is not configured yet. Add SMTP credentials in the environment variables.",
        },
        { status: 500 }
      );
    }

    await transporter.sendMail({
      from: `Portfolio Contact <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New contact message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while sending the message." },
      { status: 500 }
    );
  }
}
