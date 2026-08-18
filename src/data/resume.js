// Single source of truth for the resume. Used by the /resume page and by
// scripts/generate-resume-pdf.mjs (run `npm run resume:pdf` after editing).
const resume = {
  name: "Cody Hanna",
  title: "Full-Stack Software Engineer",
  contact: {
    location: "Stevensville, MD",
    phone: "(410) 490-9074",
    email: "codyhanna8@gmail.com",
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
        "Develop and maintain full-stack software solutions using React, Java, and MongoDB as part of an engineering team.",
      ],
    },
    {
      company: "CyberCore Technologies, Elkridge, MD",
      role: "Technical Support Developer (prior: Junior Image Technician, IT Intern)",
      period: "June 2025 – June 2026",
      bullets: [
        "Promoted twice in twelve months, from IT Intern to Technical Support Developer.",
        "Developed and maintained internal operational tools including a shipment tracking / anomaly detection system and a warehouse workflow application.",
        "Built automation that reduced FedEx contract rate updates from a three-week manual task to under an hour.",
        "Automated processes using custom scripts and platforms such as Microsoft Power Automate.",
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
        "VLAN-segmented networking, internal DNS/DHCP, PXE deployment, centralized authentication (Authentik), and multi-site VPN connectivity (Tailscale).",
        "Self-hosted local LLMs (Ollama) and n8n automation pipelines for workflow automation and data fetching/analytics, with Grafana dashboards for cluster-wide monitoring.",
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
    "React, JavaScript, Java, Node.js, Python, PowerShell, Bash, REST APIs, Firebase, MongoDB, Stripe, Proxmox VE, Ceph, Linux, Docker, Windows Server, Active Directory, DNS/DHCP, VLANs, Firewall Configuration, VPN, PXE Boot, Nmap, Wireshark, n8n, Local LLMs (Ollama)",
  education: {
    school: "Stevenson University",
    degree: "B.S. Computer Information Systems",
    period: "2022 – 2025",
  },
  certifications: [
    "CompTIA Security+ (March 2026)",
    "ISC2 Certified in Cybersecurity (CC)",
  ],
};

export default resume;
