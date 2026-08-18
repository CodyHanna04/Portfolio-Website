import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ---- Icons (small inline set, no external dependency) ----
const iconPaths = {
  laptop: "M4 5h16v10H4V5zm-2 12h20l-1.5 3h-17L2 17z",
  wifi: "M5 13a11 11 0 0114 0M8.5 16.5a6 6 0 017 0M12 20h.01M2 9a16 16 0 0120 0",
  server: "M4 4h16v6H4V4zm0 10h16v6H4v-6zm3 3h.01M7 7h.01",
  wrench: "M14.7 6.3a4 4 0 10-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.83 2.83-2.12-2.12L14.7 6.3z",
  smartphone: "M8 2h8v20H8V2zm4 17h.01",
  shield: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z",
  cloud: "M7 18a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0119 18H7z",
  cap: "M12 3l10 5-10 5L2 8l10-5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5",
  doc: "M6 2h9l3 3v17H6V2zm9 0v3h3",
  headset: "M4 13a8 8 0 0116 0v4a2 2 0 01-2 2h-1v-6h3M4 13v4a2 2 0 002 2h1v-6H4",
  checklist: "M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2",
  lock: "M6 11V8a6 6 0 1112 0v3M5 11h14v10H5V11z",
};

function Icon({ name, className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

const serviceTiers = [
  {
    icon: "laptop",
    title: "Personal Tech Help",
    price: "$50/hr",
    subtitle: "Perfect for homeowners, seniors, and families.",
    items: [
      "Slow computers",
      "Printer setup",
      "Email help",
      "Password assistance",
      "Phone setup",
      "Wi-Fi troubleshooting",
      "Smart TVs & streaming devices",
      "New computer setup",
      "File organization",
      "Virus scans & Windows updates",
      "Technology lessons",
    ],
  },
  {
    icon: "wrench",
    title: "Advanced Home IT",
    price: "$85/hr",
    subtitle: "Projects requiring planning and technical expertise.",
    items: [
      "Custom PC builds & upgrades",
      "NAS setup",
      "Home networking & mesh Wi-Fi",
      "Website creation",
      "Domain registration, DNS & SSL",
      "Microsoft 365 / Google Workspace",
      "Smart home integration",
    ],
    featured: true,
  },
  {
    icon: "server",
    title: "IT Consulting",
    price: "$125/hr",
    subtitle: "Small business infrastructure and consulting.",
    items: [
      "Servers, Linux & Windows Server",
      "Docker & Proxmox",
      "Networking & VPN & DNS",
      "Documentation & monitoring",
      "Infrastructure planning",
      "Security recommendations",
      "Disaster recovery & virtualization",
    ],
  },
];

const additionalServices = [
  {
    icon: "cap",
    title: "Technology Lessons",
    description: "One-on-one personalized lessons at your pace.",
    items: ["Learning Windows", "Learning your iPhone", "Learning email", "Learning Office", "Internet safety"],
  },
  {
    icon: "doc",
    title: "Documentation",
    description: "Easy-to-follow documentation you'll actually use.",
    items: ["Wi-Fi information sheets", "Device inventory", "Step-by-step instructions", "Home tech binder", "Network documentation"],
  },
  {
    icon: "headset",
    title: "Remote Support",
    description: "Some problems don't need a visit.",
    items: ["Follow-up support", "Software installs", "Quick troubleshooting"],
  },
  {
    icon: "checklist",
    title: "Technology Checkups",
    description: "Seasonal maintenance to catch problems early.",
    items: ["Updates & cleanup", "Backup verification", "Password review", "Security review"],
  },
  {
    icon: "lock",
    title: "Cyber Safety",
    description: "Education-focused sessions to keep you safe online.",
    items: ["Scam awareness", "Phishing", "Passwords & 2FA", "Safe browsing"],
  },
];

const processSteps = [
  { title: "Reach Out", description: "Briefly describe your issue." },
  { title: "Free Consultation", description: "We'll determine whether it's something simple or requires a visit." },
  { title: "Schedule", description: "We'll find a convenient time." },
  { title: "Problem Solved", description: "Technology made simple." },
];

const comparison = {
  traditional: [
    "Different technician every visit",
    "Limited explanations",
    "Sales-focused",
    "Generic solutions",
  ],
  personal: [
    "Same trusted person",
    "Patient teaching",
    "Personalized recommendations",
    "Long-term relationship",
  ],
};

const faqs = [
  {
    q: "How much do you charge?",
    a: "Rates depend on the type of work: $50/hr for personal tech help, $85/hr for advanced home IT projects, and $125/hr for business IT consulting. I'll always let you know what to expect before starting.",
  },
  {
    q: "Do you travel?",
    a: "Yes, I come to you for most home and small-business work in the local area. Remote support is also available for issues that don't need an in-person visit.",
  },
  {
    q: "Can you help older adults?",
    a: "Absolutely. Patient, jargon-free help is a big part of what I do, especially for seniors who want things explained clearly and at a comfortable pace.",
  },
  {
    q: "Do you work on Macs?",
    a: "Yes, I support Windows, macOS, and mobile devices.",
  },
  {
    q: "Can you build gaming PCs?",
    a: "Yes, custom PC builds and upgrades are part of the Advanced Home IT tier.",
  },
  {
    q: "Do you make websites?",
    a: "Yes, website creation, domain registration, DNS, and SSL setup are all things I help with.",
  },
  {
    q: "Can you help businesses?",
    a: "Yes, small business infrastructure, networking, servers, and IT consulting are covered under the IT Consulting tier.",
  },
  {
    q: "Can you teach me instead of just fixing it?",
    a: "Of course. I'd rather leave you understanding what happened than just handing back a fixed device; teaching is part of the job, not an upcharge.",
  },
  {
    q: "What if my issue is simple?",
    a: "That's fine. Simple issues are often quick and inexpensive to resolve. The free consultation helps figure out what it'll take before you commit to anything.",
  },
  {
    q: "Do you offer remote support?",
    a: "Yes, for follow-ups, software installs, and quick troubleshooting. I don't offer 24/7 support, but I'm responsive during reasonable hours.",
  },
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-700 rounded-xl bg-gray-800/60 overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-sm sm:text-base">{faq.q}</span>
        <span
          className={`text-sky-400 text-xl leading-none flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed">{faq.a}</div>
      )}
    </div>
  );
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cody's Tech Help",
  serviceType: "IT Consulting & Tech Support",
  provider: {
    "@type": "Person",
    name: "Cody Hanna",
    url: "https://codycodez.com",
  },
  areaServed: {
    "@type": "Place",
    name: "Stevensville, MD and surrounding areas",
  },
  description:
    "Friendly local IT support for homes and small businesses. Computer repair, Wi-Fi troubleshooting, websites, networking, and technology consulting.",
  offers: serviceTiers.map((tier) => ({
    "@type": "Offer",
    name: tier.title,
    description: tier.subtitle,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: tier.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      unitText: "HOUR",
    },
  })),
};

export default function TechHelp() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    });
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16 text-center fade-in">
        <p className="text-sky-400 font-medium tracking-widest uppercase text-sm mb-4">
          Cody's Tech Help
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
          Technology doesn't have to be frustrating.
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Whether you're setting up a new computer, fixing slow Wi-Fi, building a website,
          or planning an office network, I'm here to help.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact?reason=tech-help"
            className="bg-sky-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-500 transition"
          >
            Request Help
          </Link>
          <a
            href="#services"
            className="border border-sky-400 text-sky-400 px-6 py-3 rounded-lg font-medium hover:bg-sky-400 hover:text-white transition"
          >
            View Services
          </a>
        </div>
      </div>

      {/* About */}
      <div className="max-w-3xl mx-auto px-6 pb-20 text-center fade-in">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-gray-300 leading-relaxed">
          I'm Cody, a full-stack software engineer with a background in Computer Information
          Systems and hands-on IT support experience helping businesses and individuals alike.
          Outside of my day job, I run an enterprise-style homelab purely because I enjoy
          learning technology inside and out. That same curiosity is why I like helping people
          understand it too, not just fixing it and moving on. Expect patient explanations and
          honest recommendations, never upselling you on something you don't need.
        </p>
      </div>

      {/* Services */}
      <div id="services" className="max-w-6xl mx-auto px-6 pb-20 fade-in scroll-mt-24">
        <h2 className="text-3xl font-bold text-center mb-2">Services</h2>
        <p className="text-gray-400 text-center mb-12">Pick the level of help that fits the job</p>
        <div className="grid gap-6 lg:grid-cols-3">
          {serviceTiers.map((tier) => (
            <div
              key={tier.title}
              className={`rounded-2xl border p-6 flex flex-col ${
                tier.featured
                  ? "border-sky-400 bg-sky-400/5 lg:-translate-y-2 shadow-lg shadow-sky-900/20"
                  : "border-gray-700 bg-gray-800/60"
              }`}
            >
              <div className="w-11 h-11 rounded-lg bg-gray-700/60 text-sky-400 flex items-center justify-center mb-4">
                <Icon name={tier.icon} />
              </div>
              <h3 className="text-lg font-semibold mb-1">{tier.title}</h3>
              <p className="text-3xl font-bold text-sky-400 mb-2">{tier.price}</p>
              <p className="text-gray-400 text-sm mb-5">{tier.subtitle}</p>
              <ul className="space-y-2 text-sm text-gray-300 flex-1">
                {tier.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Additional services */}
      <div className="max-w-6xl mx-auto px-6 pb-20 fade-in">
        <h2 className="text-3xl font-bold text-center mb-10">Additional Services</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {additionalServices.map((service) => (
            <div key={service.title} className="rounded-xl border border-gray-700 bg-gray-800/60 p-6">
              <div className="w-10 h-10 rounded-lg bg-gray-700/60 text-sky-400 flex items-center justify-center mb-3">
                <Icon name={service.icon} className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-1">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{service.description}</p>
              <ul className="space-y-1 text-sm text-gray-300">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="max-w-4xl mx-auto px-6 pb-20 fade-in">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid sm:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <div key={step.title} className="text-center relative">
              <div className="w-10 h-10 mx-auto rounded-full bg-sky-400 text-gray-900 font-bold flex items-center justify-center mb-4">
                {i + 1}
              </div>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why choose me */}
      <div className="max-w-4xl mx-auto px-6 pb-20 fade-in">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Me</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-6">
            <h3 className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-4">
              Traditional Tech Support
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {comparison.traditional.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gray-600">✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-sky-400 bg-sky-400/5 p-6">
            <h3 className="text-sky-400 font-medium uppercase tracking-widest text-xs mb-4">
              Personal Technology Consultant
            </h3>
            <ul className="space-y-3 text-sm text-gray-200">
              {comparison.personal.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-sky-400">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* What I don't do */}
      <div className="max-w-3xl mx-auto px-6 pb-20 fade-in">
        <div className="rounded-xl border border-gray-800 bg-gray-800/30 p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">What I Don't Do</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            To set clear expectations: I don't perform advanced electronics repair (motherboard-level
            soldering, screen replacements) or data recovery from physically damaged drives. For those,
            I'll gladly point you to a trusted specialist.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 pb-20 fade-in">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-5xl mx-auto px-6 pb-24 fade-in">
        <div className="border border-gray-800 rounded-2xl px-8 py-12 text-center bg-gray-800/30">
          <h2 className="text-2xl font-bold mb-2">Need a hand with technology?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            Whether it's something small or a larger project, let's figure it out together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact?reason=tech-help"
              className="bg-sky-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-500 transition"
            >
              Request Help
            </Link>
            <Link
              to="/contact"
              className="border border-sky-400 text-sky-400 px-6 py-3 rounded-lg font-medium hover:bg-sky-400 hover:text-white transition"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
