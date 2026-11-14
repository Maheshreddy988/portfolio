const configuredGithub = process.env.NEXT_PUBLIC_GITHUB_URL ?? "";

export const profile = {
  name: "Obulapuram Maheswara Reddy",
  role: "Backend Developer | DevOps Engineer",
  tagline:
    "2+ years building backend APIs and automating application delivery with Docker, Kubernetes, AWS and CI/CD.",
  summary: "Node.js • Express.js • Linux • Git • Docker • Kubernetes • AWS • CI/CD",
  email: process.env.NEXT_PUBLIC_PROFILE_EMAIL ?? "",
  phone: process.env.NEXT_PUBLIC_PROFILE_PHONE ?? "",
  location: "Bengaluru, Karnataka, India",
  github: configuredGithub,
  githubHandle:
    process.env.NEXT_PUBLIC_GITHUB_HANDLE ??
    configuredGithub.split("/").filter(Boolean).pop() ??
    "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  experience: "2+ Years",
  currentRole: "Backend Developer | DevOps Engineer",
  company: "Exceleed Consulting and Technologies",
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL ?? "/resume.pdf",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maheshreddy.online",
};

export const stats = [
  { label: "Years Experience", value: "2+", sub: "Backend + DevOps" },
  { label: "Real Projects", value: "2", sub: "Backend + delivery work" },
  { label: "Cloud", value: "AWS", sub: "Compute · storage · database" },
  { label: "CI/CD", value: "Pipelines", sub: "Jenkins · GitHub Actions" },
  { label: "Containers", value: "Docker + K8s", sub: "Application deployment" },
];

export const heroWorkflow = [
  { label: "Application", icon: "Code" },
  { label: "Git", icon: "GitBranch" },
  { label: "CI/CD", icon: "GitPullRequest" },
  { label: "Docker", icon: "Box" },
  { label: "Kubernetes", icon: "Ship" },
  { label: "AWS", icon: "Cloud" },
  { label: "Monitoring", icon: "Activity" },
];
