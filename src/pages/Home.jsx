import { useEffect } from "react";
import { Link } from "react-router-dom";
import { featuredProjects } from "../projects/index";
import ProjectCard from "../components/ProjectCard";
import "../index.css";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-900 text-white font-sans pb-16 w-full min-h-screen">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20 text-center fade-in">
        <p className="text-sky-400 font-medium tracking-widest uppercase text-sm mb-4">
          Hi, I'm
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-3">
          Cody Hanna
        </h1>
        <p className="text-2xl text-gray-400 font-light mb-6">
          Full-Stack Software Engineer
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Building real-world tools that solve real problems, from full-stack apps
          to enterprise-style infrastructure.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/projects"
            className="bg-sky-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-500 transition"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="border border-sky-400 text-sky-400 px-6 py-3 rounded-lg font-medium hover:bg-sky-400 hover:text-white transition"
          >
            Contact Me
          </Link>
        </div>
      </div>

      {/* Tech Help promo */}
      <div className="max-w-5xl mx-auto px-6 mb-20 fade-in">
        <div className="border border-sky-400/30 bg-sky-400/5 rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3">Need Help With Technology?</h2>
            <p className="text-gray-300 mb-1">
              Computers. Wi-Fi. Phones. Printers. Websites.
            </p>
            <p className="text-gray-400 text-sm">
              Friendly local IT support for homes and small businesses.
            </p>
          </div>
          <Link
            to="/tech-help"
            className="flex-shrink-0 bg-sky-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-500 transition"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="max-w-5xl mx-auto px-6 fade-in">
        <h2 className="text-3xl font-bold mb-2 text-center">Featured Projects</h2>
        <p className="text-gray-400 text-center mb-10">A few things I've built recently</p>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/projects" className="text-sky-400 hover:underline text-sm">
            See all projects →
          </Link>
        </div>
      </div>

      {/* Quiet CTA */}
      <div className="max-w-5xl mx-auto px-6 mt-24 fade-in">
        <div className="border border-gray-800 rounded-2xl px-8 py-10 text-center bg-gray-800/30">
          <h2 className="text-2xl font-bold mb-2">Need something built?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            Most of these projects started as someone saying "I wish there was a tool
            for this." If you have one of those, I'd love to hear about it.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-sky-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-500 transition"
          >
            Let's talk
          </Link>
        </div>
      </div>
    </div>
  );
}
