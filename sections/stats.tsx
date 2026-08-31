'use client';

import { useReveal } from '@/hooks/use-reveal';
import { stats } from '@/data/profile';
import { cn } from '@/lib/utils';

export function StatsSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="py-12 border-y border-border bg-card/20">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={cn('grid grid-cols-2 md:grid-cols-5 gap-4 animate-reveal', isVisible && 'is-visible')}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-card/40 transition-colors"
            >
              <span className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                {stat.value}
              </span>
              <span className="mt-1 text-sm font-medium">{stat.label}</span>
              <span className="mt-0.5 text-xs text-muted-foreground">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
