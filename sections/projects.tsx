"use client";

import { useState } from "react";
import {
  Github,
  ExternalLink,
  ChevronDown,
  Calendar,
  User,
  Server,
  Container,
  Cloud,
  Layers,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useReveal } from "@/hooks/use-reveal";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const { ref, isVisible } = useReveal();
  const [expanded, setExpanded] = useState<string | null>(
    projects[0]?.id || null,
  );

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("animate-reveal", isVisible && "is-visible")}
        >
          {/* Section header */}
          <div className="mb-12">
            {/* <span className="font-mono text-sm text-primary">// projects</span> */}
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Project work
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Two genuine projects showing backend APIs, containerized application
              delivery, AWS configuration, CI/CD, and troubleshooting work.
            </p>
          </div>

          {/* Project cards */}
          <div className="space-y-6">
            {projects.map((project) => {
              const isOpen = expanded === project.id;
              return (
                <Card
                  key={project.id}
                  className="overflow-hidden bg-card/50 hover:bg-card/60 transition-colors"
                >
                  {/* Card header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : project.id)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">
                          {project.title}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="font-mono text-xs"
                        >
                          <Calendar className="mr-1 h-3 w-3" />
                          {project.year}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <User className="mr-1 h-3 w-3" />
                          {project.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-3xl">
                        {project.description}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-muted-foreground shrink-0 mt-1 transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {/* Expanded content */}
                  {isOpen && (
                    <div className="px-6 pb-6 animate-fade-in">
                      {/* Problem & Solution */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-lg border border-border bg-background/40">
                          <h4 className="text-xs font-semibold text-destructive/80 uppercase tracking-wider mb-2">
                            Problem
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {project.problem}
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-border bg-background/40">
                          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                            Solution
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      {/* Tech stacks */}
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 rounded-lg border border-border bg-background/40">
                          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">
                            <Server className="h-3.5 w-3.5 text-primary" />
                            Backend
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.backend.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs font-normal"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 rounded-lg border border-border bg-background/40">
                          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">
                            <Container className="h-3.5 w-3.5 text-primary" />
                            DevOps
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.devops.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs font-normal"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 rounded-lg border border-border bg-background/40">
                          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">
                            <Cloud className="h-3.5 w-3.5 text-primary" />
                            Infrastructure
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.infrastructure.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs font-normal"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-3">
                          <Layers className="h-4 w-4 text-primary" />
                          Key Features
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {project.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary/60 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* My role */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3">
                          My Role
                        </h4>
                        <ul className="space-y-2">
                          {project.responsibilities.map((r) => (
                            <li
                              key={r}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <ArrowRight className="h-4 w-4 text-primary/60 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Architecture flow */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3">
                          Deployment Architecture
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                          {project.architecture.map((step, idx) => (
                            <div key={step} className="flex items-center gap-2">
                              <span className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 border border-primary/20 text-primary">
                                {step}
                              </span>
                              {idx < project.architecture.length - 1 && (
                                <ArrowRight className="h-3 w-3 text-muted-foreground/40" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery evidence */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {[
                          { label: "CI/CD", value: project.cicd },
                          { label: "Deployment", value: project.deployment },
                          { label: "Monitoring", value: project.monitoring },
                          { label: "Challenges", value: project.challenges },
                        ].map((item) => (
                          <div key={item.label} className="p-4 rounded-lg border border-border bg-background/40">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                              {item.label}
                            </h4>
                            <p className="text-sm text-muted-foreground">{item.value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mb-6 p-4 rounded-lg border border-primary/20 bg-primary/5">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Result</h4>
                        <p className="text-sm text-muted-foreground">{project.result}</p>
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                        {project.githubUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-1.5 h-3.5 w-3.5" />
                              View Code
                            </a>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
