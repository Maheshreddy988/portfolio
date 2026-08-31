import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Container,
  Server,
  Database,
  Activity,
  Terminal,
  ShieldCheck,
  GitBranch,
  Settings,
} from "lucide-react";

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Cloud",
    icon: Cloud,
    description: "AWS infrastructure provisioning and management",
    skills: ["EC2", "S3", "VPC", "IAM", "RDS", "EBS", "Auto Scaling", "AMI"],
  },
  {
    title: "DevOps",
    icon: GitBranch,
    description: "CI/CD pipelines and container orchestration",
    skills: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions"],
  },
  {
    title: "Infrastructure",
    icon: Settings,
    description: "Infrastructure as code and configuration management",
    skills: ["Terraform", "Ansible"],
  },
  {
    title: "Backend",
    icon: Server,
    description: "REST API development and server-side logic",
    skills: ["Node.js", "Express.js", "JavaScript", "REST APIs"],
  },
  {
    title: "Databases",
    icon: Database,
    description: "Relational and document database design",
    skills: ["PostgreSQL", "MongoDB"],
  },
  {
    title: "Monitoring",
    icon: Activity,
    description: "Metrics collection and visualization",
    skills: ["Prometheus", "Grafana"],
  },
  {
    title: "Operating Systems",
    icon: Terminal,
    description: "Server administration and scripting",
    skills: ["Linux-(Ubuntu)", "Windows"],
  },
  {
    title: "Automation",
    icon: Container,
    description: "Shell scripting for operational tasks",
    skills: ["Bash", "Shell Scripting"],
  },
  {
    title: "Security / DevSecOps",
    icon: ShieldCheck,
    description: "Code quality and vulnerability scanning",
    skills: ["SonarQube", "Trivy", "OWASP ZAP"],
  },
];
