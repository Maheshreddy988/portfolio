export interface Project {
  id: string;
  title: string;
  year: string;
  role: string;
  problem: string;
  solution: string;
  description: string;
  backend: string[];
  devops: string[];
  infrastructure: string[];
  technologies: string[];
  responsibilities: string[];
  features: string[];
  architecture: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'project-management-system',
    title: 'Project Management System',
    year: '2024',
    role: 'Backend Developer & DevOps',
    problem:
      'Manual paperwork and fragmented tracking across plants and departments created bottlenecks in project workflows and approvals.',
    solution:
      'A role-based project management platform with structured approval workflows, plant-based access control, and centralized project lifecycle management.',
    description:
      'A role-based project management platform designed to eliminate manual paperwork and manage project workflows across plants and departments.',
    backend: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Role-based Access Control'],
    devops: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'AWS', 'Prometheus', 'Grafana'],
    infrastructure: ['AWS EC2', 'AWS S3', 'Docker Registry', 'Kubernetes Cluster'],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Prometheus', 'Grafana'],
    responsibilities: [
      'Designed and developed REST APIs for project lifecycle management',
      'Implemented role-based access control across 7 user roles',
      'Built Docker images and deployed to Kubernetes clusters',
      'Configured Jenkins CI/CD pipelines for automated builds and deployments',
      'Set up Prometheus and Grafana for application monitoring',
      'Managed AWS infrastructure for staging and production environments',
    ],
    features: [
      'Project creation and lifecycle management',
      'Bulk upload for project data',
      'Role-based workflows with 7 distinct roles',
      'Finance tracking and approval workflows',
      'Plant-based access control',
    ],
    architecture: [
      'Developer Push',
      'Git',
      'Jenkins',
      'Build & Test',
      'Docker Image',
      'Kubernetes Deployment',
      'AWS',
      'Monitoring',
    ],
  },
  {
    id: 'energy-management-project',
    title: 'Energy Management Project',
    year: '2025 – Present',
    role: 'Backend Developer & DevOps',
    problem:
      'Organizations lacked visibility into electricity cost savings achievable through Open Access power and rooftop solar generation.',
    solution:
      'A platform that calculates and visualizes electricity cost savings by comparing Open Access pricing, government grid tariffs, and rooftop solar generation.',
    description:
      'A platform for calculating and visualizing electricity cost savings using Open Access power and rooftop solar generation.',
    backend: ['Node.js', 'Express.js', 'PostgreSQL', 'REST APIs'],
    devops: ['Docker', 'Jenkins', 'GitHub Actions', 'AWS', 'Bash'],
    infrastructure: ['AWS EC2', 'AWS RDS', 'Docker Containers'],
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'Docker', 'Jenkins', 'GitHub Actions', 'AWS', 'Bash'],
    responsibilities: [
      'Developed backend APIs for energy consumption tracking',
      'Implemented Open Access pricing and grid tariff comparison logic',
      'Built monthly savings calculation engine with solar generation data',
      'Containerized services with Docker for consistent deployments',
      'Configured Jenkins and GitHub Actions CI/CD pipelines',
      'Automated operational tasks with Bash scripting',
    ],
    features: [
      'Energy consumption tracking',
      'Open Access pricing comparison',
      'Government grid tariff comparison',
      'Rooftop solar generation tracking',
      'Monthly savings calculation',
      'Site-level energy data management',
    ],
    architecture: [
      'Energy Consumption',
      'Open Access Cost',
      'Grid Tariff',
      'Solar Generation',
      'Monthly Cost Comparison',
      'Savings',
    ],
  },
];
