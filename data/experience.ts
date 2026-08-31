export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: 'Backend Developer & DevOps',
    company: profile.company,
    location: profile.location,
    period: '2024 – Present',
    current: true,
    responsibilities: [
      'Backend REST API development using Node.js and Express.js',
      'MongoDB and PostgreSQL database design',
      'Docker containerization of application services',
      'Kubernetes deployment and cluster management',
      'Jenkins CI/CD pipeline configuration',
      'GitHub Actions workflow automation',
      'AWS infrastructure provisioning and management',
      'Linux/Bash automation for operational tasks',
      'Prometheus and Grafana monitoring setup',
      'Production troubleshooting and incident response',
      'Git-based development workflows with branching strategies',
    ],
    highlights: [
      'Application Development',
      'Infrastructure & Delivery',
    ],
  },
];

export interface WorkflowStage {
  step: string;
  label: string;
  icon: string;
}

export const engineeringWorkflow: WorkflowStage[] = [
  { step: '01', label: 'Code', icon: 'Code' },
  { step: '02', label: 'Build', icon: 'Hammer' },
  { step: '03', label: 'Test', icon: 'CheckCircle' },
  { step: '04', label: 'Security Scan', icon: 'ShieldCheck' },
  { step: '05', label: 'Docker Build', icon: 'Box' },
  { step: '06', label: 'Deploy', icon: 'Rocket' },
  { step: '07', label: 'Monitor', icon: 'Activity' },
];
import { profile } from './profile';
