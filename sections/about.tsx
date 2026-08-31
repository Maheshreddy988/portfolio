"use client";

import {
  Server,
  Cloud,
  Container,
  GitBranch,
  Activity,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const focusAreas = [
  { icon: Server, label: "Backend Development" },
  { icon: Cloud, label: "Cloud Infrastructure" },
  { icon: Container, label: "Containerization" },
  { icon: GitBranch, label: "CI/CD Automation" },
  { icon: Activity, label: "Monitoring" },
  { icon: Wrench, label: "Production Troubleshooting" },
];

const ownershipPoints = [
  "Backend development with Node.js and Express.js",
  "Cloud infrastructure on AWS",
  "Containerization with Docker and Kubernetes",
  "CI/CD automation with Jenkins and GitHub Actions",
  "Production deployment and release management",
  "Monitoring with Prometheus and Grafana",
  "Production troubleshooting and incident response",
];

export function AboutSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("animate-reveal", isVisible && "is-visible")}
        >
          {/* Section header */}
          <div className="mb-12">
            {/* <span className="font-mono text-sm text-primary">// about</span> */}
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              End-to-end engineering ownership
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Description */}
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I work across the full delivery lifecycle — from writing backend
                APIs to containerizing services, automating deployments, and
                monitoring production systems. I enjoy owning applications
                end-to-end: building the code, shipping it through CI/CD,
                running it on Kubernetes, and keeping it healthy in production.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                My day-to-day spans application development and infrastructure
                delivery. That means writing REST APIs in Node.js, designing
                databases, building Docker images, configuring Jenkins
                pipelines, deploying to Kubernetes on AWS, and setting up
                monitoring with Prometheus and Grafana. When something breaks in
                production, I dig into logs, metrics, and system diagnostics to
                find the root cause.
              </p>
            </div>

            {/* Right: Ownership checklist */}
            <Card className="p-6 bg-card/50">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                What I Own
              </h3>
              <ul className="space-y-3">
                {ownershipPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Focus areas */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-colors text-center"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="text-xs font-medium leading-tight">
                    {area.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
