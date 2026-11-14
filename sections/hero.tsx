"use client";

import {
  ArrowRight,
  Download,
  Github,
  Code,
  GitBranch,
  GitPullRequest,
  Box,
  Ship,
  Cloud,
  Activity,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, heroWorkflow } from "@/data/profile";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof Code> = {
  Code,
  GitBranch,
  GitPullRequest,
  Box,
  Ship,
  Cloud,
  Activity,
};

export function HeroSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] opacity-50" />

      <div ref={ref} className="relative mx-auto max-w-6xl w-full px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div className={cn("animate-reveal", isVisible && "is-visible")}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Available for opportunities
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
              Backend Developer
              <br />
              <span className="text-primary text-glow">| DevOps Engineer</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed text-balance">
              {profile.tagline}
            </p>

            <p className="mt-4 font-mono text-sm text-muted-foreground/80">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={profile.resumeUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              {/* <Button variant="ghost" size="lg" asChild>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button> */}
            </div>
          </div>

          {/* Right: Architecture visual */}
          <div
            className={cn("animate-reveal", isVisible && "is-visible")}
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="relative rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 sm:p-8 glow-accent">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  deployment-pipeline.yaml
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {heroWorkflow.map((stage, idx) => {
                  const Icon = iconMap[stage.icon] || Code;
                  return (
                    <div key={stage.label}>
                      <div className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 transition-colors group-hover:bg-primary/20">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">
                          {stage.label}
                        </span>
                        {idx < heroWorkflow.length - 1 && (
                          <ChevronDown
                            className="ml-auto h-4 w-4 text-muted-foreground/40 animate-pipeline"
                            style={{ animationDelay: `${idx * 0.2}s` }}
                          />
                        )}
                      </div>
                      {idx < heroWorkflow.length - 1 && (
                        <div className="ml-5 h-4 w-[1px] bg-gradient-to-b from-primary/40 to-transparent" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="flex flex-col items-center gap-1 text-muted-foreground/50">
          <span className="text-xs font-mono">scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
