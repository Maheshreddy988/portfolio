"use client";

import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useReveal } from "@/hooks/use-reveal";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
  },
  {
    icon: Github,
    label: "GitHub",
    value: `@${profile.githubHandle}`,
    href: profile.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "View Profile",
    href: profile.linkedin,
  },
];

export function ContactSection() {
  const { ref, isVisible } = useReveal();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [submittedFirstName, setSubmittedFirstName] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isDevelopment = process.env.NODE_ENV === "development";
    if (isDevelopment) console.log("[CONTACT UI] Submitting contact form");
    setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (isDevelopment) console.log("[CONTACT UI] API response:", { status: response.status, ok: response.ok });
      const result = await response.json().catch(() => ({}));
      if (isDevelopment) {
        console.log("[CONTACT UI] HTTP status:", response.status);
        console.log("[CONTACT UI] Response:", result);
      }
      if (isDevelopment) console.log("[CONTACT UI] API result:", result);
      if (!response.ok || result.success !== true) throw new Error(result.message || "We couldn't send your message right now. Please try again.");
      setSubmittedFirstName(form.name.trim().split(/\s+/)[0] ?? "");
      setStatus("success");
    } catch (submissionError: unknown) { if (isDevelopment) console.error("[CONTACT UI] Contact submission failed:", submissionError); setStatus("error"); setError(isDevelopment && submissionError instanceof Error ? submissionError.message : "We couldn't send your message right now. Please try again shortly."); }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[500px] h-[200px] bg-primary/10 rounded-full blur-[100px] opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("animate-reveal", isVisible && "is-visible")}
        >
          {/* Section header */}
          <div className="mb-12 text-center">
            {/* <span className="font-mono text-sm text-primary">// contact</span> */}
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Let&apos;s Build Something Reliable
            </h2>
            <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Open to Backend Developer and DevOps Engineer roles. Reach
              out through any channel below.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Contact info */}
            <div className="space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <Card className="p-4 bg-card/50 hover:bg-card/70 hover:border-primary/30 transition-all flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium truncate">
                        {item.value}
                      </p>
                    </div>
                  </Card>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            {/* Right: Contact form */}
            <Card className="p-6 bg-card/50">
              {status === "success" ? (
                <div role="status" aria-live="polite" className="contact-success flex min-h-[390px] flex-col items-center justify-center px-2 py-6 text-center">
                  <div className="contact-success-icon relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <span className="contact-success-glow absolute inset-0 rounded-full bg-primary/20 blur-xl" aria-hidden="true" />
                    <svg viewBox="0 0 52 52" className="relative h-12 w-12" fill="none" aria-hidden="true">
                      <circle cx="26" cy="26" r="24" className="stroke-primary/30" strokeWidth="1" />
                      <path d="M15 27.5 22.5 35 38 18" className="contact-success-check stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="contact-success-content mt-6 max-w-md">
                    <h3 className="text-2xl font-semibold">Thank You{submittedFirstName ? `, ${submittedFirstName}` : ""}!</h3>
                    <p className="mt-3 font-medium">Your message has been received successfully.</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">I appreciate your interest in connecting with me. I&apos;ll review your message and get back to you as soon as possible.</p>
                    <p className="mt-4 text-sm text-primary">✓ Confirmation email sent to your email address</p>
                  </div>
                  <Button type="button" variant="outline" className="mt-6" onClick={() => { setForm({ name: "", email: "", company: "", message: "" }); setError(""); setStatus("idle"); requestAnimationFrame(() => nameInputRef.current?.focus()); }}>
                    Send Another Message
                  </Button>
                </div>
              ) : <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    ref={nameInputRef}
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Work Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company / Organization</Label>
                  <Input id="company" placeholder="Your company (optional)" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about the role or project..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                    className="mt-1.5 min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
                <p role="status" aria-live="polite" className={cn("text-xs text-center", status === "error" ? "text-destructive" : "text-muted-foreground")}>
                  {status === "error" ? error : "I&apos;ll get back to you as soon as possible."}
                </p>
              </form>}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
