import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Container,
  Server,
  Activity,
  ShieldCheck,
} from "lucide-react";

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend Development",
    icon: Server,
    description: "API development and data access for application features",
    skills: ["Node.js", "Express.js", "JavaScript", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Delivery & Containers",
    icon: Container,
    description: "Source control, CI/CD, and containerized application delivery",
    skills: ["Git", "Docker", "Kubernetes", "Jenkins", "GitHub Actions"],
  },
  {
    title: "AWS & Infrastructure",
    icon: Cloud,
    description: "Application infrastructure across compute, storage, databases, networking, and access",
    skills: ["EC2", "S3", "RDS", "VPC", "IAM", "Terraform"],
  },
  {
    title: "Operations & Monitoring",
    icon: Activity,
    description: "Linux diagnostics, logs, dashboards, and application health checks",
    skills: ["Linux", "Bash", "Prometheus", "Grafana"],
  },
  {
    title: "Working Knowledge",
    icon: ShieldCheck,
    description: "Tools used alongside delivery workflows",
    skills: ["Ansible", "SonarQube", "Trivy", "OWASP ZAP"],
  },
];
