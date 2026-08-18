import { Link } from "react-router-dom";

const skills = {
  Frontend: ["React", "Next.js", "Tailwind CSS", "JavaScript", "HTML / CSS"],
  "Backend & Data": ["Node.js", "Java", "Firebase / Firestore", "MongoDB", "REST APIs", "Stripe", "Python", "Relational Databases"],
  Infrastructure: ["Proxmox VE", "Ceph Storage", "Linux", "Docker / LXC", "VLANs & Networking", "Windows Server / AD", "Tailscale", "Authentik SSO"],
  "Tools & Scripting": ["PowerShell", "Bash", "Git / GitHub", "Vite", "Vercel", "Power Automate", "Local LLMs (Ollama)", "Workflow Automation (n8n)", "Data Analytics & Aggregation"],
};

const timeline = [
  {
    role: "Junior Full Stack Software Engineer",
    company: "Interclypse Inc.",
    period: "June 2026 – Present",
    description:
      "Building full-stack software with React, Java, and MongoDB as part of an engineering team, continuing to grow across the stack.",
  },
  {
    role: "IT Intern → Junior Image Technician → Technical Support Developer",
    company: "CyberCore Technologies",
    period: "June 2025 – June 2026",
    description:
      "Promoted twice in a year. Built internal tools like a shipment anomaly tracker and a warehouse clearance app, automated a 3-week FedEx rate task down to about an hour, and imaged/deployed 400+ laptops weekly.",
  },
  {
    role: "Software Developer Intern",
    company: "Automated Mortgage Systems, Inc.",
    period: "January 2025 – June 2025",
    description:
      "Worked on frontend-to-backend integrations with REST APIs and authentication workflows, troubleshooting across production and staging environments.",
  },
  {
    role: "B.S. Computer Information Systems",
    company: "Stevenson University",
    period: "2022 – 2025",
    description:
      "Coursework in Windows Server, Active Directory, network security, relational databases, and systems development.",
  },
];

const certifications = [
  { name: "CompTIA Security+", date: "March 2026" },
  { name: "ISC2 Certified in Cybersecurity (CC)", date: "2025" },
];

const plainEnglish = [
  {
    title: "I build websites and apps",
    text: "Every app has two halves: the part you see and tap, and the machinery behind it that remembers things and gets work done. I build both. That's all \"full-stack\" really means.",
  },
  {
    title: "I run my own mini cloud",
    text: "There's a stack of servers in my home doing what Google Photos, Netflix, and a security camera company would normally do for me, except I built it, my family's data stays private, and when it breaks, I'm the support team.",
  },
  {
    title: "I make boring work disappear",
    text: "If a job means copying and pasting the same thing hundreds of times, I'd rather spend a day teaching a computer to do it forever. One tool I built turned a three-week spreadsheet task into a 40-minute one.",
  },
  {
    title: "AI, without the buzzwords",
    text: "I use AI for practical things, like flagging packages that take a suspicious route in shipping data. Tools that quietly help people make decisions, not chatbots for the sake of chatbots.",
  },
];

export default function About() {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Bio */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            I'm a full-stack software engineer based in Maryland, currently at Interclypse.
            I love building things that solve real problems: rental management platforms,
            logistics tools, apps for friends and family. I also run an enterprise-style
            homelab that keeps me learning infrastructure, networking, and security hands-on.
            If something can be automated, self-hosted, or rebuilt better, I'm probably
            already working on it.
          </p>
          <Link
            to="/resume"
            className="inline-block mt-6 border border-sky-400 text-sky-400 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-sky-400 hover:text-white transition"
          >
            View Resume →
          </Link>
        </div>

        {/* Experience timeline */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Experience</h3>
          <div className="relative border-l border-gray-700 ml-3 space-y-10">
            {timeline.map((item) => (
              <div key={item.period} className="relative pl-8">
                <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-sky-400 border-4 border-gray-900" />
                <p className="text-sky-400 text-xs uppercase tracking-widest mb-1">{item.period}</p>
                <h4 className="text-lg font-semibold">{item.role}</h4>
                <p className="text-gray-400 text-sm mb-2">{item.company}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-3 flex items-center gap-3"
              >
                <span className="text-sky-400 text-lg">✓</span>
                <div>
                  <p className="font-medium text-sm">{cert.name}</p>
                  <p className="text-gray-500 text-xs">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Skills & Technologies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <h4 className="text-sky-400 font-medium mb-4 text-xs uppercase tracking-widest">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {items.map((skill) => (
                    <li key={skill} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* In plain English */}
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-center">Not a Tech Person? Start Here</h3>
          <p className="text-gray-500 text-sm text-center mb-8">
            What I actually do, no jargon required.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {plainEnglish.map((card) => (
              <div key={card.title} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h4 className="font-semibold mb-2">{card.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Beyond the code */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">Beyond the Code</h3>
          <div className="text-gray-300 leading-relaxed max-w-2xl mx-auto space-y-4">
            <p>
              Most of what I build starts with people I know. Pancake Night began because
              family breakfast orders got out of hand, so I built a kitchen display system
              for it. The Christmas List Creator exists because my family kept buying
              duplicate gifts. Hanna Properties runs my family's rental business.
            </p>
            <p>
              The homelab is the hobby that got wonderfully out of hand: what started as
              one server is slowly becoming a private network connecting family houses,
              backing up our photos, watching the cameras, and giving me an excuse to
              learn something new every weekend.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
