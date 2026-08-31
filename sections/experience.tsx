"use client";

import {
  Briefcase,
  MapPin,
  Code,
  Hammer,
  CheckCircle,
  ShieldCheck,
  Box,
  Rocket,
  Activity,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useReveal } from "@/hooks/use-reveal";
import { experiences, engineeringWorkflow } from "@/data/experience";
import { cn } from "@/lib/utils";

const workflowIcons: Record<string, typeof Code> = {
  Code,
  Hammer,
  CheckCircle,
  ShieldCheck,
  Box,
  Rocket,
  Activity,
};

export function ExperienceSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("animate-reveal", isVisible && "is-visible")}
        >
          {/* Section header */}
          <div className="mb-12">
            {/* <span className="font-mono text-sm text-primary">// experience</span> */}
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Professional experience
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-[1px] bg-gradient-to-b from-primary via-border to-transparent" />

            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.role} className="relative pl-12 sm:pl-16">
                  {/* Timeline dot */}
                  <div className="absolute left-2.5 sm:left-4.5 top-1.5 flex h-4 w-4 items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                    {exp.current && (
                      <div className="absolute h-4 w-4 rounded-full bg-primary/30 animate-ping" />
                    )}
                  </div>

                  <Card className="p-6 bg-card/50 hover:bg-card/70 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-primary" />
                          {exp.role}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge
                          variant="secondary"
                          className="font-mono text-xs"
                        >
                          {exp.period}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Differentiator badges */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {exp.highlights.map((h) => (
                        <Badge
                          key={h}
                          variant="outline"
                          className="border-primary/30 text-primary"
                        >
                          {h}
                        </Badge>
                      ))}
                    </div>

                    {/* Responsibilities */}
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {exp.responsibilities.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <ChevronRight className="h-4 w-4 text-primary/60 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering workflow visual */}
          <div className="mt-16">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 text-center">
              Engineering Workflow
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 flex-wrap">
              {engineeringWorkflow.map((stage, idx) => {
                const Icon = workflowIcons[stage.icon] || Code;
                return (
                  <div key={stage.step} className="flex items-center">
                    <div className="flex flex-col items-center gap-2 px-3 py-4 rounded-lg border border-border bg-card/40 hover:border-primary/30 hover:bg-card/60 transition-colors min-w-0 flex-1">
                      <span className="font-mono text-xs text-primary/60">
                        {stage.step}
                      </span>
                      <Icon className="h-6 w-6 text-primary" />
                      <span className="text-xs font-medium">{stage.label}</span>
                    </div>
                    {idx < engineeringWorkflow.length - 1 && (
                      <ChevronRight className="hidden sm:block h-5 w-5 text-muted-foreground/40 mx-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
