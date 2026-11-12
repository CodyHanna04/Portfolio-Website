const certPrep = {
  title: "CertPrep: Certification Study Platform",
  description:
    "A self-hosted study platform for IT certification exams such as AWS Cloud Practitioner (CLF-C02) and Developer Associate (DVA-C03). It offers question practice, timed mock exams, and dashboards that show progress on every exam domain and whether you're ready to sit the test. It runs on my homelab and signs in with passkeys.",
  tech: ["Next.js", "React", "PostgreSQL", "Better Auth", "Passkeys", "Tailwind CSS", "Docker", "Vitest", "GitHub Actions"],
  github: "https://github.com/CodyHanna04/cert-prep",
  live: "https://study.codycodez.com",
  images: [],
  stats: [
    { value: "540+", label: "reviewed practice questions" },
    { value: "140+", label: "automated tests" },
    { value: "2", label: "AWS exams supported" },
  ],
  problem:
    "Most certification prep is either a pile of random question dumps or a paid course that doesn't tell you where you actually stand. I wanted to study against each vendor's published exam blueprint and see, domain by domain, what I'd covered, what was left, and whether I was ready.",
  solution:
    "Built a Next.js app backed by PostgreSQL with row-level security, so each user's data is isolated at the database layer. Exams are defined as 'exam packs' built from the vendor's official guide, with a validator and content pipeline: AI-drafted questions are linted, blind-answered by a separate model, checked against cited AWS docs, and approved by a person before they enter the shared bank. It runs in Docker on a Proxmox container in my homelab, with a separate admin site reachable only over Tailscale.",
  features: [
    "Practice sessions and timed mock exams with keyboard shortcuts, flags, bookmarks, and confidence ratings",
    "Dashboards and an interactive blueprint map showing progress and readiness per exam domain",
    "Score history chart, mistakes review, and per-question attempt history",
    "Passwordless sign-in with passkeys (Better Auth); invite-only accounts",
    "Per-user data isolation enforced by Postgres row-level security, with a dedicated test suite",
    "Exam-pack framework: blueprint template, validator, and onboarding process for adding any certification",
    "Content pipeline: lint CLI, blind verification against a second model, source checks, and human review",
    "Separate admin site reachable only over Tailscale, with an audit log and no access to study data",
    "Personal data export, import, and account deletion",
    "Docker Compose deployment on the homelab, a scripted deploy, and CI running lint, pack validation, and tests on every push",
  ],
  impact:
    "This is the tool I use to study for my own AWS certifications. It also pulls together most of what I've learned: full-stack development, database security, modern authentication, testing, CI, and running a real service on my own infrastructure. Its exam-pack framework means a new certification is a content task, not a code change.",
};

export default certPrep;
