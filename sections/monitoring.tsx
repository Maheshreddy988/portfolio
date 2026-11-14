"use client";

import {
  Cpu,
  MemoryStick,
  Globe,
  Timer,
  HeartPulse,
  Container,
  Database,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useReveal } from "@/hooks/use-reveal";
import { monitoringMetrics } from "@/data/devops";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof Cpu> = {
  Cpu,
  MemoryStick,
  Globe,
  Timer,
  HeartPulse,
  Container,
  Database,
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColors = {
  up: "text-yellow-500",
  down: "text-green-500",
  stable: "text-muted-foreground",
};

export function MonitoringSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="monitoring" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("animate-reveal", isVisible && "is-visible")}
        >
          {/* Section header */}
          <div className="mb-12">
            {/* <span className="font-mono text-sm text-primary">// monitoring</span> */}
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Monitoring &amp; Observability
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Using Prometheus and Grafana to track system health, application
              performance, and infrastructure metrics.
            </p>
          </div>

          {/* Example monitoring dashboard */}
          <Card className="p-6 bg-card/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold">
                  Example Monitoring View
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Illustrative dashboard — not live production data
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-primary/70" />
                <span className="text-xs font-mono text-muted-foreground">
                  prometheus · grafana
                </span>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {monitoringMetrics.map((metric) => {
                const Icon = iconMap[metric.icon] || Cpu;
                const TrendIcon = trendIcons[metric.trend];
                return (
                  <div
                    key={metric.label}
                    className="p-3 rounded-lg border border-border bg-background/40 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <TrendIcon
                        className={cn("h-3 w-3", trendColors[metric.trend])}
                      />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold">{metric.value}</span>
                      {metric.unit && (
                        <span className="text-xs text-muted-foreground">
                          {metric.unit}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {metric.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mock chart bars */}
            <div className="mt-6 p-4 rounded-lg border border-border bg-background/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Illustrative request activity
                </span>
                <span className="text-xs font-mono text-primary">
                  demo trend
                </span>
              </div>
              <div className="flex items-end gap-1 h-20">
                {[
                  40, 55, 48, 62, 70, 58, 75, 65, 80, 72, 85, 78, 90, 82, 88,
                  76, 70, 82, 68, 74,
                ].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-primary/20 to-primary/60 hover:from-primary/40 hover:to-primary transition-colors"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
