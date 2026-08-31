"use client";

import {
  Container,
  GitPullRequest,
  Ship,
  Terminal,
  Server,
  AlertTriangle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useReveal } from "@/hooks/use-reveal";
import { troubleshootingCategories } from "@/data/devops";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof Container> = {
  Container,
  GitPullRequest,
  Ship,
  Terminal,
  Server,
};

export function TroubleshootingSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="troubleshooting" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("animate-reveal", isVisible && "is-visible")}
        >
          {/* Section header */}
          <div className="mb-12">
            {/* <span className="font-mono text-sm text-primary">// troubleshooting</span> */}
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Production Troubleshooting
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Problems I work with and troubleshoot in production environments.
              These are the categories of issues I diagnose and resolve as part
              of my DevOps responsibilities.
            </p>
          </div>

          {/* Troubleshooting cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {troubleshootingCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || AlertTriangle;
              return (
                <Card
                  key={cat.title}
                  className="p-5 bg-card/50 hover:bg-card/70 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <Icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold">{cat.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span className="text-primary/40 mt-0.5 shrink-0">
                          ›
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
