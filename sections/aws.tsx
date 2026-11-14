"use client";

import {
  Globe,
  Network,
  Server,
  Container,
  Database,
  Activity,
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useReveal } from "@/hooks/use-reveal";
import { awsServices, awsArchitecture } from "@/data/devops";
import { cn } from "@/lib/utils";

const archIcons: Record<string, typeof Globe> = {
  Globe,
  Network,
  Server,
  Container,
  Database,
  Activity,
};

export function AwsSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="aws" className="py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={cn("animate-reveal", isVisible && "is-visible")}
        >
          {/* Section header */}
          <div className="mb-12">
            {/* <span className="font-mono text-sm text-primary">// aws-architecture</span> */}
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              AWS application infrastructure
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <p className="mt-4 text-muted-foreground max-w-2xl">
              An example application delivery path using the AWS services I have
              worked with — compute, storage, database, networking, and access
              configuration.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Architecture flow */}
            <Card className="p-6 bg-card/50">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                Request Flow
              </h3>
              <div className="flex flex-col gap-1">
                {awsArchitecture.map((layer, idx) => {
                  const Icon = archIcons[layer.icon] || Globe;
                  return (
                    <div key={layer.label}>
                      <div className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">
                          {layer.label}
                        </span>
                      </div>
                      {idx < awsArchitecture.length - 1 && (
                        <div className="ml-5 h-4 w-[1px] bg-gradient-to-b from-primary/40 to-transparent" />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Right: AWS service cards */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                AWS services used in application delivery
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {awsServices.map((service) => {
                  const Icon = archIcons[service.icon] || Server;
                  return (
                    <div
                      key={service.name}
                      className="p-4 rounded-lg border border-border bg-card/40 hover:bg-card/60 hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">
                          {service.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
