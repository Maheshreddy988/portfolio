'use client';

import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useReveal } from '@/hooks/use-reveal';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

export function ResumeSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="resume" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div ref={ref} className={cn('animate-reveal', isVisible && 'is-visible')}>
          <Card className="p-8 sm:p-12 bg-card/50 text-center border-primary/20 glow-accent">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-6">
              <FileText className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Want the complete technical profile?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Download my resume for the full breakdown of my experience, skills,
              and project details.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <a href={profile.resumeUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
