"use client";

import { Card } from "@/components/ui/card";
import { useReveal } from "@/hooks/use-reveal";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("animate-reveal", isVisible && "is-visible")}
        >
          {/* Section header */}
          <div className="mb-12">
            {/* <span className="font-mono text-sm text-primary">// skills</span> */}
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Technologies I work with
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Categorized by domain. Each technology listed here is one I can
              explain, implement, and troubleshoot in an interview setting.
            </p>
          </div>

          {/* Skill cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.title}
                  className="p-5 bg-card/50 hover:bg-card/70 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">
                        {category.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary/60 text-secondary-foreground border border-border/50 hover:border-primary/30 hover:text-primary transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
