"use client";

import { useEffect, useRef, useState } from "react";
import {
  GitBranch,
  GitPullRequest,
  Package,
  CheckCircle,
  ScanSearch,
  ShieldCheck,
  Box,
  Container,
  Rocket,
  HeartPulse,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useReveal } from "@/hooks/use-reveal";
import { ciCdPipeline } from "@/data/devops";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof GitBranch> = {
  GitBranch,
  GitPullRequest,
  Package,
  CheckCircle,
  ScanSearch,
  ShieldCheck,
  Box,
  Container,
  Rocket,
  HeartPulse,
};

type StageState = "waiting" | "running" | "completed";
type PipelineStatus = "running" | "complete";

interface LogEntry {
  time: string;
  message: string;
  isRestart?: boolean;
}

const STAGE_INTERVAL = 2000;
const RESTART_DELAY = 3000;

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function CiCdSection() {
  const { ref, isVisible } = useReveal();

  const [activeStage, setActiveStage] = useState(0);
  const [stageStates, setStageStates] = useState<StageState[]>(
    ciCdPipeline.map(() => "waiting"),
  );
  const [pipelineStatus, setPipelineStatus] =
    useState<PipelineStatus>("running");
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [particleIdx, setParticleIdx] = useState<number>(-1);
  const [particleKey, setParticleKey] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const [inViewport, setInViewport] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const elapsedRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // IntersectionObserver to start/pause animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const addLog = (message: string, isRestart = false) => {
    const time = formatTime(elapsedRef.current);
    setLogEntries((prev) => [...prev, { time, message, isRestart }].slice(-20));
  };

  const resetPipeline = () => {
    setActiveStage(0);
    setStageStates(() => {
      const fresh: StageState[] = ciCdPipeline.map(() => "waiting");
      fresh[0] = "running";
      return fresh;
    });
    setPipelineStatus("running");
    setParticleIdx(-1);
    addLog("--- Restarted ---", true);
  };

  // Main auto-loop driven by setInterval — advances every 2s
  useEffect(() => {
    if (!inViewport) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
        restartTimerRef.current = undefined;
      }
      return;
    }

    // Kick off stage 0 if everything is waiting
    setStageStates((prev) => {
      if (prev.every((s) => s === "waiting")) {
        const fresh = [...prev];
        fresh[0] = "running";
        addLog(ciCdPipeline[0].logs[0]);
        addLog(ciCdPipeline[0].logs[1]);
        return fresh;
      }
      return prev;
    });

    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      elapsedRef.current += 2;

      setActiveStage((current) => {
        const isLast = current >= ciCdPipeline.length - 1;

        if (isLast) {
          // Mark last stage completed
          setStageStates((prev) => {
            const next = [...prev];
            next[current] = "completed";
            return next;
          });
          setPipelineStatus("complete");

          // Schedule restart after 3s
          restartTimerRef.current = setTimeout(() => {
            resetPipeline();
          }, RESTART_DELAY);

          return current;
        }

        // Mark current stage completed
        setStageStates((prev) => {
          const next = [...prev];
          next[current] = "completed";
          return next;
        });

        // Trigger particle to travel to next stage
        setParticleIdx(current);
        setParticleKey((k) => k + 1);

        const nextStage = current + 1;
        const stage = ciCdPipeline[nextStage];

        // Append 2 fake log lines for the new stage
        addLog(stage.logs[0]);
        addLog(stage.logs[1]);

        // Activate next stage
        setStageStates((prev) => {
          const next = [...prev];
          next[nextStage] = "running";
          return next;
        });

        return nextStage;
      });
    }, STAGE_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
        restartTimerRef.current = undefined;
      }
    };
  }, [inViewport]);

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logEntries]);

  const progress = Math.round(
    (stageStates.filter((s) => s === "completed").length /
      ciCdPipeline.length) *
      100,
  );

  const handleStageClick = (idx: number) => {
    setExpandedStage(expandedStage === idx ? null : idx);
  };

  // Synced info panel — shows the currently active (or last active) stage
  const infoStage = ciCdPipeline[activeStage];

  return (
    <section id="cicd" ref={sectionRef} className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("animate-reveal", isVisible && "is-visible")}
        >
          {/* Section header */}
          <div className="mb-8">
            {/* <span className="font-mono text-sm text-primary">// ci-cd-pipeline</span> */}
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              CI/CD Pipeline
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Jenkins and GitHub Actions pipeline stages — from Git push through
              build, test, security scan, Docker image creation, deployment, and
              health verification.
            </p>
          </div>

          {/* Status indicator + progress */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "relative flex h-2.5 w-2.5",
                  pipelineStatus === "running" && "animate-pulse",
                )}
              >
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full opacity-75",
                    pipelineStatus === "running"
                      ? "bg-primary animate-ping"
                      : "bg-green-500",
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex h-2.5 w-2.5 rounded-full",
                    pipelineStatus === "running"
                      ? "bg-primary"
                      : "bg-green-500",
                  )}
                />
              </span>
              <span className="font-mono text-xs font-medium text-muted-foreground">
                {pipelineStatus === "running"
                  ? "PIPELINE RUNNING"
                  : "PIPELINE COMPLETE"}
              </span>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3 flex-1 max-w-xs">
              <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-xs text-muted-foreground tabular-nums w-9 text-right">
                {progress}%
              </span>
            </div>
          </div>

          {/* Pipeline */}
          <Card className="p-4 sm:p-6 bg-card/50">
            {/* Desktop horizontal layout */}
            <div className="hidden lg:flex flex-row items-stretch gap-0">
              {ciCdPipeline.map((stage, idx) => {
                const Icon = iconMap[stage.icon] || GitBranch;
                const state = stageStates[idx];
                const isRunning = state === "running";
                const isCompleted = state === "completed";
                const isWaiting = state === "waiting";
                const showParticle = particleIdx === idx;

                return (
                  <div key={stage.step} className="flex items-center flex-1">
                    {/* Stage card */}
                    <button
                      onClick={() => handleStageClick(idx)}
                      className={cn(
                        "relative flex flex-col items-center gap-2 px-2 py-4 rounded-lg border transition-all flex-1 min-w-0",
                        isWaiting &&
                          "border-border bg-background/40 hover:border-primary/20",
                        isRunning && "border-primary/50 bg-card/60",
                        isCompleted && "border-primary/20 bg-background/30",
                      )}
                      style={
                        isRunning
                          ? {
                              boxShadow:
                                "0 0 20px -6px hsl(var(--primary) / 0.25)",
                            }
                          : undefined
                      }
                    >
                      {/* Running border glow */}
                      {isRunning && (
                        <div
                          className="absolute inset-0 rounded-lg pointer-events-none pipeline-running-border"
                          style={{ opacity: 0.15 }}
                        />
                      )}

                      <span
                        className={cn(
                          "font-mono text-xs transition-colors",
                          isWaiting && "text-muted-foreground/40",
                          isRunning && "text-primary",
                          isCompleted && "text-primary/50",
                        )}
                      >
                        {stage.step}
                      </span>

                      <div className="relative">
                        <Icon
                          className={cn(
                            "h-5 w-5 transition-colors",
                            isWaiting && "text-muted-foreground/50",
                            isRunning && "text-primary",
                            isCompleted && "text-primary/60",
                            isRunning &&
                              (stage.icon === "HeartPulse"
                                ? "pipeline-stage-heartbeat"
                                : stage.icon === "Box" ||
                                    stage.icon === "Container"
                                  ? "pipeline-stage-breathe"
                                  : "pipeline-stage-running"),
                          )}
                        />
                        {/* Completed check */}
                        {isCompleted && (
                          <div className="absolute -top-1.5 -right-1.5 pipeline-check-pop">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 bg-background rounded-full" />
                          </div>
                        )}
                      </div>

                      <span
                        className={cn(
                          "text-xs font-medium text-center leading-tight transition-colors",
                          isWaiting && "text-muted-foreground/60",
                          isRunning && "text-foreground",
                          isCompleted && "text-muted-foreground",
                        )}
                      >
                        {stage.label}
                      </span>

                      {/* Running text */}
                      {isRunning && (
                        <span className="text-[10px] font-mono text-primary/70 text-center leading-tight animate-fade-in">
                          {stage.runningText}
                        </span>
                      )}
                    </button>

                    {/* Connector */}
                    {idx < ciCdPipeline.length - 1 && (
                      <div className="relative flex items-center justify-center w-8 shrink-0">
                        <div
                          className={cn(
                            "h-[2px] w-full rounded-full transition-colors",
                            isCompleted
                              ? "bg-primary/30"
                              : isRunning
                                ? "bg-primary/20"
                                : "bg-border",
                          )}
                        />
                        {/* Active connector glow */}
                        {isRunning && (
                          <div className="absolute inset-0 h-[2px] w-full rounded-full pipeline-connector-active opacity-60" />
                        )}
                        {/* Particle */}
                        {showParticle && (
                          <div
                            key={particleKey}
                            className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary pipeline-particle-h"
                            style={
                              {
                                "--particle-duration": "600ms",
                                boxShadow: "0 0 8px hsl(var(--primary) / 0.8)",
                              } as React.CSSProperties
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile vertical layout */}
            <div className="lg:hidden flex flex-col gap-0">
              {ciCdPipeline.map((stage, idx) => {
                const Icon = iconMap[stage.icon] || GitBranch;
                const state = stageStates[idx];
                const isRunning = state === "running";
                const isCompleted = state === "completed";
                const isWaiting = state === "waiting";
                const showParticle = particleIdx === idx;

                return (
                  <div key={stage.step} className="flex flex-col">
                    <button
                      onClick={() => handleStageClick(idx)}
                      className={cn(
                        "relative flex items-center gap-3 px-4 py-3 rounded-lg border transition-all w-full text-left",
                        isWaiting && "border-border bg-background/40",
                        isRunning && "border-primary/50 bg-card/60",
                        isCompleted && "border-primary/20 bg-background/30",
                      )}
                      style={
                        isRunning
                          ? {
                              boxShadow:
                                "0 0 20px -6px hsl(var(--primary) / 0.25)",
                            }
                          : undefined
                      }
                    >
                      {isRunning && (
                        <div
                          className="absolute inset-0 rounded-lg pointer-events-none pipeline-running-border"
                          style={{ opacity: 0.15 }}
                        />
                      )}

                      <span
                        className={cn(
                          "font-mono text-xs transition-colors shrink-0",
                          isWaiting && "text-muted-foreground/40",
                          isRunning && "text-primary",
                          isCompleted && "text-primary/50",
                        )}
                      >
                        {stage.step}
                      </span>

                      <div className="relative shrink-0">
                        <Icon
                          className={cn(
                            "h-5 w-5 transition-colors",
                            isWaiting && "text-muted-foreground/50",
                            isRunning && "text-primary",
                            isCompleted && "text-primary/60",
                            isRunning &&
                              (stage.icon === "HeartPulse"
                                ? "pipeline-stage-heartbeat"
                                : stage.icon === "Box" ||
                                    stage.icon === "Container"
                                  ? "pipeline-stage-breathe"
                                  : "pipeline-stage-running"),
                          )}
                        />
                        {isCompleted && (
                          <div className="absolute -top-1.5 -right-1.5 pipeline-check-pop">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 bg-background rounded-full" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span
                          className={cn(
                            "text-xs font-medium transition-colors block",
                            isWaiting && "text-muted-foreground/60",
                            isRunning && "text-foreground",
                            isCompleted && "text-muted-foreground",
                          )}
                        >
                          {stage.label}
                        </span>
                        {isRunning && (
                          <span className="text-[10px] font-mono text-primary/70 animate-fade-in block mt-0.5">
                            {stage.runningText}
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Vertical connector */}
                    {idx < ciCdPipeline.length - 1 && (
                      <div className="relative flex items-center justify-center h-6 w-full">
                        <div
                          className={cn(
                            "w-[2px] h-full rounded-full transition-colors",
                            isCompleted
                              ? "bg-primary/30"
                              : isRunning
                                ? "bg-primary/20"
                                : "bg-border",
                          )}
                        />
                        {isRunning && (
                          <div
                            className="absolute w-[2px] h-full rounded-full pipeline-connector-active opacity-60"
                            style={{ background: undefined }}
                          />
                        )}
                        {showParticle && (
                          <div
                            key={particleKey}
                            className="absolute left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary pipeline-particle-v"
                            style={
                              {
                                "--particle-duration": "600ms",
                                boxShadow: "0 0 8px hsl(var(--primary) / 0.8)",
                              } as React.CSSProperties
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Expanded stage detail */}
            {expandedStage !== null && ciCdPipeline[expandedStage] && (
              <div className="mt-4 p-3 rounded-lg border border-border bg-background/40 animate-fade-in">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-primary">
                      {ciCdPipeline[expandedStage].label}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {ciCdPipeline[expandedStage].detail}
                    </p>
                  </div>
                  <button
                    onClick={() => setExpandedStage(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    <ChevronDown className="h-4 w-4 rotate-180" />
                  </button>
                </div>
              </div>
            )}
          </Card>

          {/* Info panel — synced to active stage */}
          <div className="mt-4 p-4 rounded-lg border border-primary/20 bg-card/30 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
              {(() => {
                const Icon =
                  iconMap[infoStage?.icon || "GitBranch"] || GitBranch;
                return <Icon className="h-4.5 w-4.5 text-primary" />;
              })()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-primary">
                  {infoStage?.label}
                </h4>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {pipelineStatus === "complete" ? "COMPLETED" : "RUNNING"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {infoStage?.runningText}
              </p>
            </div>
          </div>

          {/* Activity log */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-muted-foreground">
                PIPELINE ACTIVITY
              </span>
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <div
              ref={logRef}
              className="p-4 rounded-lg border border-border bg-card/30 font-mono text-xs space-y-1 min-h-[140px] max-h-[180px] overflow-y-auto"
            >
              {logEntries.length === 0 ? (
                <p className="text-muted-foreground/50">
                  $ pipeline status — waiting for trigger...
                </p>
              ) : (
                logEntries.map((entry, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-start gap-2 animate-fade-in",
                      entry.isRestart
                        ? "text-primary font-semibold"
                        : idx === logEntries.length - 1
                          ? "text-foreground"
                          : "text-muted-foreground/70",
                    )}
                  >
                    {entry.isRestart ? (
                      <span className="text-primary shrink-0">
                        {entry.message}
                      </span>
                    ) : (
                      <>
                        <span className="text-primary/60 shrink-0">
                          [{entry.time}]
                        </span>
                        <span className="shrink-0 text-primary/40">$</span>
                        <span>{entry.message}</span>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground/50 font-mono">
              CI/CD workflow visualization — not live production data
            </p>
          </div>

          {/* Stage descriptions */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              {
                label: "Source",
                desc: "Git push triggers the pipeline automatically",
              },
              {
                label: "Build & Test",
                desc: "Dependencies installed, code linted, tests run",
              },
              {
                label: "Quality & Security",
                desc: "SonarQube analysis, Trivy image scan, OWASP ZAP",
              },
              {
                label: "Container",
                desc: "Docker image built, tagged, pushed to registry",
              },
              {
                label: "Deploy & Verify",
                desc: "Kubernetes rollout with health checks",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-3 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors"
              >
                <h4 className="text-xs font-semibold text-primary mb-1">
                  {item.label}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
