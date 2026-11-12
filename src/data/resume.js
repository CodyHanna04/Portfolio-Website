// Single source of truth for the resume. Used by the /resume page and by
// scripts/generate-resume-pdf.mjs (run `npm run resume:pdf` after editing).
const resume = {
  name: "Cody Hanna",
  title: "Full-Stack Software Engineer",
  contact: {
    location: "Stevensville, MD",
    phone: "(410) 490-9074",
    email: "cody@codycodez.com",
    website: "codycodez.com",
    github: "github.com/CodyHanna04",
    linkedin: "linkedin.com/in/cody-hanna04",
  },
  summary:
    "Full-stack software engineer with experience building internal automation tools, operational business platforms, and enterprise systems support. Skilled across React and Node.js development, scripting, system administration, and virtualized infrastructure, from production platforms serving real businesses to a multi-node homelab environment.",
  experience: [
    {
      company: "Interclypse Inc.",
      role: "Junior Full Stack Software Engineer",
      period: "June 2026 – Present",
      bullets: [
        "Write and review code for full-stack features in React, Java, and MongoDB, including REST API integrations.",
        "Deploy containerized services to production on AWS EKS (Kubernetes), monitoring them with CloudWatch and Elastic.",
        "Support customers on production issues and work in an Agile team using Jira, with documentation in Confluence.",
      ],
    },
    {
      company: "CyberCore Technologies, Elkridge, MD",
      role: "Technical Support Developer (prior: Junior Image Technician, IT Intern)",
      period: "June 2025 – June 2026",
      bullets: [
        "Promoted twice in twelve months, from IT Intern to Technical Support Developer.",
        "Rebuilt the company website from WordPress to a hardened Next.js site on Azure/IIS, clearing HP security findings.",
        "Developed internal tools including a shipment tracking / anomaly detection system and a warehouse workflow app.",
        "Automated FedEx contract rate updates (scripts, Power Automate) from a three-week manual task to under an hour.",
        "Imaged and deployed 400+ laptops weekly, improving deployment throughput by 50%.",
        "Troubleshot infrastructure, networking, and system issues in collaboration with IT.",
      ],
    },
    {
      company: "Automated Mortgage Systems, Inc.",
      role: "Software Developer Intern",
      period: "January 2025 – June 2025",
      bullets: [
        "Assisted with integrations between frontend tools and backend services using REST APIs and authentication workflows.",
        "Participated in troubleshooting cycles across production and staging environments.",
        "Collaborated with senior engineers to resolve performance, reliability, and system behavior issues.",
      ],
    },
  ],
  projects: [
    {
      name: "Homelab: Systems Engineering Environment",
      bullets: [
        "Multi-node Proxmox VE cluster on enterprise Dell PowerEdge servers with Ceph distributed storage.",
        "VLAN-segmented networking, DNS/DHCP, PXE deployment, Authentik SSO, and multi-site Tailscale VPN.",
        "Local LLMs (Ollama), n8n automation pipelines, and Uptime Kuma monitoring across every service.",
      ],
    },
    {
      name: "CertPrep: Certification Study Platform",
      bullets: [
        "Self-hosted Next.js + PostgreSQL study platform with passkey auth, row-level-security data isolation, timed mock exams, and readiness dashboards; Dockerized on the homelab with GitHub Actions CI running 140+ tests.",
      ],
    },
    {
      name: "Hanna Properties: Rental Management Platform",
      bullets: [
        "Full-stack portal managing 75+ tenants: role-based access, Stripe rent tracking, maintenance workflows, and analytics dashboards.",
      ],
    },
  ],
  skills:
    "React, Next.js, JavaScript, Java, Node.js, Python, PowerShell, Bash, REST APIs, PostgreSQL, MongoDB, Firebase, Stripe, AWS (EKS, EC2, S3, IAM, CloudWatch), Elastic, Kubernetes, Docker, CI/CD (GitHub Actions), Git / GitHub, Code Review, Jira, Confluence, Technical Documentation, Automated Testing, Passkeys / OAuth / SSO, Linux, macOS, Windows Server, Active Directory, Proxmox VE, Ceph, DNS/DHCP, VLANs, Firewalls, VPN, Nmap, Wireshark, n8n, Local LLMs",
  education: [
    {
      school: "University of Maryland, College Park",
      degree: "Master of Information Management (in progress)",
      period: "Aug 2026 – May 2028 (expected)",
    },
    {
      school: "Stevenson University",
      degree: "B.S. Computer Information Systems",
      period: "2022 – 2025",
    },
  ],
  certifications: [
    "AWS Certified Cloud Practitioner (Nov 2026)",
    "CompTIA Security+ (Mar 2026)",
    "ISC2 Certified in Cybersecurity (CC)",
  ],
};

export default resume;
