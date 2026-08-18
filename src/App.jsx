// App.jsx
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Header from './pages/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectDetail from "./pages/ProjectDetail";
import HomelabStatus from "./pages/HomelabStatus";
import TechHelp from "./pages/TechHelp";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";
import CommandPalette from "./components/CommandPalette";
import PageTransition from "./components/PageTransition";
import projects from "./projects/index";

const SITE = "https://codycodez.com";
const DEFAULT_TITLE = "Cody Hanna | Full-Stack Developer & Systems Engineer";
const DEFAULT_DESCRIPTION =
  "Portfolio of Cody Hanna, a full-stack software engineer and systems enthusiast in Maryland. Real-world projects: rental management platforms, AI-powered logistics tools, and an enterprise-style homelab.";

const routeMeta = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/about": {
    title: "About | Cody Hanna",
    description:
      "Background, career timeline, certifications, and skills for Cody Hanna, from React and Node.js development to Proxmox, Ceph, and enterprise-style homelab infrastructure.",
  },
  "/projects": {
    title: "Projects | Cody Hanna",
    description:
      "Real-world software projects: rental management platforms, AI-powered logistics dashboards, internal automation tools, and enterprise-style infrastructure.",
  },
  "/homelab": {
    title: "Homelab Status | Cody Hanna",
    description:
      "Live status and uptime for the services running on Cody Hanna's enterprise-style homelab: Proxmox, Ceph storage, Authentik SSO, and more.",
  },
  "/tech-help": {
    title: "Tech Help & IT Consulting | Cody Hanna",
    description:
      "Friendly local IT support for homes and small businesses. Computer repair, Wi-Fi troubleshooting, websites, networking, and technology consulting.",
  },
  "/resume": {
    title: "Resume | Cody Hanna",
    description:
      "Resume for Cody Hanna, a full-stack software engineer with experience in React, Node.js, systems administration, and enterprise-style infrastructure.",
  },
  "/contact": {
    title: "Contact | Cody Hanna",
    description:
      "Get in touch with Cody Hanna for software development projects, tech help and IT consulting, or general inquiries.",
  },
};

function getRouteMeta(pathname) {
  if (routeMeta[pathname]) return { ...routeMeta[pathname], indexable: true };

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const project = projects.find((p) => p.slug === projectMatch[1]);
    if (project) {
      return {
        title: `${project.title} | Cody Hanna`,
        description: project.tagline || project.description || DEFAULT_DESCRIPTION,
        indexable: true,
      };
    }
  }

  return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, indexable: false };
}

function setMetaContent(selector, content) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute("content", content);
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const { title, description, indexable } = getRouteMeta(location.pathname);
    const canonicalUrl = `${SITE}${location.pathname === "/" ? "" : location.pathname}`;

    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute("href", canonicalUrl);

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!indexable) {
      if (!robotsMeta) {
        robotsMeta = document.createElement("meta");
        robotsMeta.setAttribute("name", "robots");
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute("content", "noindex, follow");
    } else if (robotsMeta) {
      robotsMeta.remove();
    }

    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-gray-900 text-white font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/projects/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
          <Route path="/homelab" element={<PageTransition><HomelabStatus /></PageTransition>} />
          <Route path="/tech-help" element={<PageTransition><TechHelp /></PageTransition>} />
          <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
        <CommandPalette />
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
