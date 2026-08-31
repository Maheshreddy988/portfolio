import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/sections/hero';
import { StatsSection } from '@/sections/stats';
import { AboutSection } from '@/sections/about';
import { ExperienceSection } from '@/sections/experience';
import { SkillsSection } from '@/sections/skills';
import { ProjectsSection } from '@/sections/projects';
import { DevOpsSection } from '@/sections/devops';
import { AwsSection } from '@/sections/aws';
import { TroubleshootingSection } from '@/sections/troubleshooting';
import { MonitoringSection } from '@/sections/monitoring';
import { CiCdSection } from '@/sections/cicd';
import { GitHubSection } from '@/sections/github';
import { ResumeSection } from '@/sections/resume';
import { ContactSection } from '@/sections/contact';
import { FooterSection } from '@/sections/footer';
import { profile } from '@/data/profile';

const siteUrl = profile.siteUrl;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.location,
  },
  url: siteUrl,
    sameAs: [profile.github, profile.linkedin].filter(Boolean),
  worksFor: {
    '@type': 'Organization',
    name: profile.company,
  },
  knowsAbout: [
    'Node.js',
    'AWS',
    'Docker',
    'Kubernetes',
    'Jenkins',
    'GitHub Actions',
    'CI/CD',
    'PostgreSQL',
    'MongoDB',
    'Prometheus',
    'Grafana',
    'Terraform',
    'Ansible',
    'Linux',
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <DevOpsSection />
        <AwsSection />
        <TroubleshootingSection />
        <MonitoringSection />
        <CiCdSection />
        <GitHubSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
