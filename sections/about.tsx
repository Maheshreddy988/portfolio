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

const contributionPoints = [
  "Backend APIs with Node.js, Express.js, and databases",
  "Git workflows, pull requests, and CI/CD configuration",
  "Docker images and Kubernetes application deployments",
  "AWS application infrastructure across compute, storage, and databases",
  "Terraform-based infrastructure configuration",
  "Prometheus, Grafana, logs, and application troubleshooting",
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
              Contributing across the delivery lifecycle
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Description */}
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I contribute across the delivery lifecycle — from writing backend
                APIs to containerizing services, supporting CI/CD, deploying
                applications, and checking application health with logs and metrics.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                My work includes REST APIs in Node.js, database changes, Docker
                images, Jenkins and GitHub Actions configuration, Kubernetes
                application deployment, and AWS configuration. When an application
                issue occurs, I use logs, metrics, and Linux diagnostics to help
                identify and resolve it.
              </p>
            </div>

            {/* Right: Contribution checklist */}
            <Card className="p-6 bg-card/50">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Practical experience
              </h3>
              <ul className="space-y-3">
                {contributionPoints.map((point) => (
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
