const cyberCoreTech = {
  title: "CyberCore Technologies Website",
  description:
    "Rebuilt and migrated the public-facing website for CyberCore Technologies — a secure supply chain risk management firm and HP subsidiary — from a vulnerable WordPress/SiteGround environment to a modern Next.js application hosted on Azure/IIS, specifically to address security findings from HP's cybersecurity team.",
  tech: ["Next.js", "React", "CSS Modules", "Azure", "IIS", "Git / GitHub"],
  github: null,
  live: "https://cybercoretech.com",
  images: [],
  problem:
    "HP's cybersecurity team flagged the existing WordPress/SiteGround site during a vulnerability assessment: an open FTP port (SiteGround blocked logins but not the port itself), outdated plugins, PHP exploit surfaces, XML-RPC abuse vectors, and admin brute-force attack surfaces all posed unacceptable risk for a company handling secure federal supply chains.",
  solution:
    "Rebuilt the site from scratch as a Next.js static export — eliminating the entire WordPress/PHP/plugin attack surface — and migrated hosting from Vercel to the company's Azure tenant running IIS on Windows Server. Security headers were configured at the IIS level to pass automated vulnerability scans.",
  features: [
    "Full rebuild from WordPress to Next.js (React, JavaScript, CSS Modules)",
    "Security headers configured at IIS level: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy",
    "Port exposure reduced to HTTP (80) and HTTPS (443) only — FTP port issue resolved",
    "Static export build eliminates server-side PHP, plugin, and XML-RPC vulnerabilities",
    "Migrated from Vercel to CyberCore's Azure tenant for enterprise infrastructure alignment",
    "Pages: Home, About, Team, Culture, Services, Careers, Contact, Client Portal, Employee Portal, Virtual Tour",
    "Responsive layout built with Flexbox/Grid and CSS Modules",
    "Passed automated security header checks from HP Cybersecurity team scans",
    "Documented and handed off to company GitHub (managed by IT/Brett) for ongoing maintenance",
  ],
  impact:
    "The rebuilt site passed HP's cybersecurity vulnerability assessments after migration. Eliminated all legacy WordPress attack surfaces, resolved the flagged FTP port exposure, and moved the company onto a controlled Azure-hosted infrastructure. CyberCore — an ISO 28000:2022 and ISO 20243:2018 certified firm with 140+ cleared professionals — now has a modern, maintainable, and security-hardened web presence.",
};

export default cyberCoreTech;
