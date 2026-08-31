'use client';

import { useReveal } from '@/hooks/use-reveal';
import { Card } from '@/components/ui/card';
import { devOpsPipeline } from '@/data/devops';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export function DevOpsSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="devops" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={ref} className={cn('animate-reveal', isVisible && 'is-visible')}>
          {/* Section header */}
          <div className="mb-12">
            <span className="font-mono text-sm text-primary">// devops</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              How I Ship Software
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <p className="mt-4 text-muted-foreground max-w-2xl">
              The pipeline I use to take code from a developer&apos;s laptop to
              production — with quality gates, security scanning, and monitoring
              at every stage.
            </p>
          </div>

          {/* Pipeline stages */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {devOpsPipeline.map((stage) => {
              const Icon = stage.icon;
              return (
                <Card
                  key={stage.step}
                  className="p-5 bg-card/50 hover:bg-card/70 hover:border-primary/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-3 right-3 font-mono text-2xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                    {stage.step}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{stage.label}</h3>
                  <p className="text-xs font-mono text-primary mb-2">{stage.technology}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>
                </Card>
              );
            })}
          </div>

          {/* Flow connector visual */}
          <div className="mt-8 flex items-center justify-center flex-wrap gap-1">
            {devOpsPipeline.map((stage, idx) => (
              <div key={stage.step} className="flex items-center">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-card/40 border border-border">
                  <span className="font-mono text-xs text-primary/60">{stage.step}</span>
                  <span className="text-xs font-medium">{stage.label}</span>
                </div>
                {idx < devOpsPipeline.length - 1 && (
                  <ChevronRight className="h-3 w-3 text-muted-foreground/40 mx-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
