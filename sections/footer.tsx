import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { profile } from "@/data/profile";

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-2">
              {/* <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
                <Terminal className="h-3.5 w-3.5 text-primary" />
              </div> */}
              <span className="font-mono text-sm font-semibold">
                <span className="text-primary">MAheshReddy</span>
                <span className="text-muted-foreground">.</span>
                <span>dev</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{profile.name}</p>
            <p className="text-xs text-muted-foreground">
              {profile.role} · {profile.location}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-primary/30 hover:bg-card/60 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-primary/30 hover:bg-card/60 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-primary/30 hover:bg-card/60 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          {/* <p className="text-xs text-muted-foreground font-mono">
            Built with Next.js · TypeScript · Tailwind CSS
          </p> */}
        </div>
      </div>
    </footer>
  );
}
