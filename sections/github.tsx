"use client";

import { Github, Star, GitFork, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useReveal } from "@/hooks/use-reveal";
import { githubRepos } from "@/data/devops";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  Shell: "#89e051",
  TypeScript: "#3178c6",
  Python: "#3572A5",
};

export function GitHubSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="github" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("animate-reveal", isVisible && "is-visible")}
        >
          {/* Section header */}
          <div className="mb-12">
            {/* <span className="font-mono text-sm text-primary">// open-source</span> */}
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              Open Source &amp; Code
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Selected repositories from my GitHub profile.
            </p>
          </div>

          {/* Repo cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {githubRepos.map((repo) => (
              <Card
                key={repo.name}
                className="p-5 bg-card/50 hover:bg-card/70 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <h3 className="text-sm font-semibold font-mono">
                      {repo.name}
                    </h3>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`View ${repo.name} on GitHub`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 min-h-[3rem]">
                  {repo.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          languageColors[repo.language] || "#888",
                      }}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {repo.updatedAt}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* GitHub CTA */}
          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="lg" asChild>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                View Full GitHub Profile
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
