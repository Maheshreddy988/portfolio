import type { LucideIcon } from "lucide-react";
import {
  GitBranch,
  GitPullRequest,
  ShieldCheck,
  ScanSearch,
  Container,
  Cloud,
  Activity,
  Stethoscope,
} from "lucide-react";
import { profile } from "./profile";

export interface PipelineStage {
  step: string;
  label: string;
  technology: string;
  description: string;
  icon: LucideIcon;
}

export const devOpsPipeline: PipelineStage[] = [
  {
    step: "01",
    label: "Code",
    technology: "Git / GitHub",
    description:
      "Version-controlled development with branching strategies and pull request reviews.",
    icon: GitBranch,
  },
  {
    step: "02",
    label: "CI",
    technology: "Jenkins / GitHub Actions",
    description:
      "Automated builds triggered on code push, running install, lint, and test stages.",
    icon: GitPullRequest,
  },
  {
    step: "03",
    label: "Quality",
    technology: "Tests / SonarQube",
    description:
      "Unit tests, code quality gates, and static analysis to catch issues early.",
    icon: ScanSearch,
  },
  {
    step: "04",
    label: "Security",
    technology: "Trivy / OWASP ZAP",
    description:
      "Container image scanning and web application vulnerability detection.",
    icon: ShieldCheck,
  },
  {
    step: "05",
    label: "Container",
    technology: "Docker",
    description:
      "Reproducible container images built, tagged, and pushed to a registry.",
    icon: Container,
  },
  {
    step: "06",
    label: "Deploy",
    technology: "Kubernetes / AWS",
    description:
      "Kubernetes application deployments on AWS with health checks.",
    icon: Cloud,
  },
  {
    step: "07",
    label: "Observe",
    technology: "Prometheus / Grafana",
    description:
      "Metrics collection, dashboards, and alerting on application and infra health.",
    icon: Activity,
  },
  {
    step: "08",
    label: "Troubleshoot",
    technology: "Logs / Linux / Metrics",
    description:
      "Log analysis, Linux diagnostics, and application metrics for troubleshooting.",
    icon: Stethoscope,
  },
];

export interface TroubleshootingCategory {
  title: string;
  icon: string;
  items: string[];
}

export const troubleshootingCategories: TroubleshootingCategory[] = [
  {
    title: "Container Issues",
    icon: "Container",
    items: [
      "Container crashes and restart loops",
      "Application log analysis",
      "Environment variable misconfiguration",
      "Port conflicts in containerized services",
      "Docker networking and bridge connectivity",
    ],
  },
  {
    title: "CI/CD Issues",
    icon: "GitPullRequest",
    items: [
      "Failed builds and pipeline errors",
      "Dependency resolution failures",
      "Docker build failures and cache issues",
      "Deployment failures and rollback",
    ],
  },
  {
    title: "Kubernetes Issues",
    icon: "Ship",
    items: [
      "Pod failures and CrashLoopBackOff",
      "Readiness and liveness probe problems",
      "Service connectivity and DNS resolution",
      "Image pull failures and registry auth",
    ],
  },
  {
    title: "Linux Issues",
    icon: "Terminal",
    items: [
      "Disk usage and inode exhaustion",
      "CPU and memory bottlenecks",
      "File permissions and ownership",
      "Process management and zombie processes",
      "Network configuration and firewall rules",
    ],
  },
  {
    title: "Application Issues",
    icon: "Server",
    items: [
      "API failures and timeout errors",
      "Database connectivity and pool exhaustion",
      "CORS configuration issues",
      "Reverse proxy and load balancer misconfiguration",
    ],
  },
];

export interface MonitoringMetric {
  label: string;
  value: string;
  unit: string;
  trend: "up" | "down" | "stable";
  icon: string;
}

export const monitoringMetrics: MonitoringMetric[] = [
  { label: "CPU Usage", value: "Example", unit: "", trend: "stable", icon: "Cpu" },
  {
    label: "Memory Usage",
    value: "Example",
    unit: "",
    trend: "up",
    icon: "MemoryStick",
  },
  {
    label: "HTTP Requests",
    value: "Example",
    unit: "",
    trend: "up",
    icon: "Globe",
  },
  {
    label: "Response Time",
    value: "Example",
    unit: "",
    trend: "down",
    icon: "Timer",
  },
  {
    label: "App Health",
    value: "Example",
    unit: "",
    trend: "stable",
    icon: "HeartPulse",
  },
  {
    label: "Container Health",
    value: "Example",
    unit: "",
    trend: "stable",
    icon: "Container",
  },
  {
    label: "Database Health",
    value: "Example",
    unit: "",
    trend: "stable",
    icon: "Database",
  },
];

export interface AwsService {
  name: string;
  description: string;
  icon: string;
}

export const awsServices: AwsService[] = [
  {
    name: "EC2",
    description: "Virtual servers for compute workloads",
    icon: "Server",
  },
  {
    name: "S3",
    description: "Object storage for files and artifacts",
    icon: "Archive",
  },
  {
    name: "RDS",
    description: "Managed relational database service",
    icon: "Database",
  },
  {
    name: "VPC",
    description: "Isolated network topology for resources",
    icon: "Network",
  },
  {
    name: "IAM",
    description: "Access control and permissions management",
    icon: "ShieldCheck",
  },
  {
    name: "EBS",
    description: "Block storage for EC2 instances",
    icon: "HardDrive",
  },
  // { name: 'EFS', description: 'Shared file storage across instances', icon: 'FolderOpen' },
  // { name: 'Auto Scaling', description: 'Automatic capacity adjustment', icon: 'TrendingUp' },
];

export const awsArchitecture = [
  { label: "Internet", icon: "Globe" },
  { label: "Load Balancer / Nginx", icon: "Network" },
  { label: "Application", icon: "Server" },
  { label: "Docker / Kubernetes", icon: "Container" },
  { label: "Database", icon: "Database" },
  { label: "Monitoring", icon: "Activity" },
];

export interface CiCdStage {
  step: string;
  label: string;
  icon: string;
  runningText: string;
  detail: string;
  duration: number;
  logs: string[];
}

export const ciCdPipeline: CiCdStage[] = [
  {
    step: "01",
    label: "Git Push",
    icon: "GitBranch",
    runningText: "Triggering pipeline...",
    detail: "A Git push event triggers the CI/CD pipeline automatically.",
    duration: 2000,
    logs: ["Example pipeline event", "Illustrative source update received"],
  },
  {
    step: "02",
    label: "Checkout",
    icon: "GitPullRequest",
    runningText: "Fetching source code...",
    detail: "Source code is checked out from the repository branch.",
    duration: 2000,
    logs: ["Example checkout step", "Illustrative workspace prepared"],
  },
  {
    step: "03",
    label: "Install Dependencies",
    icon: "Package",
    runningText: "Installing packages...",
    detail: "Project dependencies are installed and cached for reuse.",
    duration: 2000,
    logs: ["Example dependency install", "Illustrative install complete"],
  },
  {
    step: "04",
    label: "Lint / Test",
    icon: "CheckCircle",
    runningText: "Running automated tests...",
    detail: "Code is linted and unit tests are executed against the build.",
    duration: 2000,
    logs: ["Example test step", "Illustrative test result"],
  },
  {
    step: "05",
    label: "Code Quality",
    icon: "ScanSearch",
    runningText: "Analyzing source quality...",
    detail: "Static analysis and code quality gates are evaluated.",
    duration: 2000,
    logs: ["Example quality scan", "Illustrative quality result"],
  },
  {
    step: "06",
    label: "Security Scan",
    icon: "ShieldCheck",
    runningText: "Scanning dependencies and image...",
    detail: "Vulnerability scanning with Trivy and OWASP ZAP.",
    duration: 2000,
    logs: ["Example security scan", "Illustrative scan result"],
  },
  {
    step: "07",
    label: "Docker Build",
    icon: "Box",
    runningText: "Building container image...",
    detail: "The application is packaged into a reproducible Docker image.",
    duration: 2000,
    logs: ["Example image build", "Illustrative image created"],
  },
  {
    step: "08",
    label: "Docker Image",
    icon: "Container",
    runningText: "Tagging / pushing image...",
    detail: "The image is tagged and pushed to the container registry.",
    duration: 2000,
    logs: ["Example image tag", "Illustrative registry push"],
  },
  {
    step: "09",
    label: "Deploy",
    icon: "Rocket",
    runningText: "Rolling out deployment...",
    detail: "A rolling update is applied to the Kubernetes cluster on AWS.",
    duration: 2000,
    logs: ["Example deployment step", "Illustrative rollout complete"],
  },
  {
    step: "10",
    label: "Health Check",
    icon: "HeartPulse",
    runningText: "Verifying application health...",
    detail: "Liveness and readiness probes confirm the deployment is healthy.",
    duration: 2000,
    logs: ["Example health check", "Illustrative health result"],
  },
];

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  updatedAt: string;
  url: string;
}

export const githubRepos: GitHubRepo[] = [
  {
    name: "project-management-system",
    description:
      "Role-based project management platform with approval workflows and plant-based access control.",
    language: "JavaScript",
    stars: 0,
    updatedAt: "2024",
    url: profile.github,
  },
  {
    name: "energy-management",
    description:
      "Electricity cost savings calculator with Open Access pricing and rooftop solar generation.",
    language: "JavaScript",
    stars: 0,
    updatedAt: "2025",
    url: profile.github,
  },
  {
    name: "devops-pipeline-configs",
    description:
      "Docker, Kubernetes, Jenkins, and GitHub Actions configurations for CI/CD pipelines.",
    language: "Shell",
    stars: 0,
    updatedAt: "2025",
    url: profile.github,
  },
];
