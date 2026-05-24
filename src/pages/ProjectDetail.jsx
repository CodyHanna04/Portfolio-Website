import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../projects/index";

function ImageGallery({ images, title }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  if (images.length === 0) return null;

  return (
    <div className="fade-in space-y-3">
      {/* Main viewer */}
      <div className="relative rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center min-h-[280px]">
        <img
          src={`/images/${images[current]}`}
          alt={`${title} screenshot ${current + 1}`}
          className="w-full max-h-[520px] object-contain"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center transition select-none"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white text-2xl w-10 h-10 rounded-full flex items-center justify-center transition select-none"
              aria-label="Next image"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full select-none">
              {current + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === current
                  ? "border-sky-400 opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
              aria-label={`Go to screenshot ${i + 1}`}
            >
              <img
                src={`/images/${img}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

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
  }, [slug]);

  if (!project) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Project not found</h1>
          <Link to="/projects" className="text-sky-400 hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/projects" className="text-sky-400 hover:underline text-sm fade-in inline-block">
          ← Back to Projects
        </Link>

        <h1 className="text-4xl font-bold fade-in">{project.title}</h1>
        <p className="text-lg text-gray-300 fade-in">{project.description}</p>

        <ImageGallery images={project.images} title={project.title} />

        <div className="section-divider fade-in" />

        <div className="fade-in">
          <h2 className="text-2xl font-semibold">The Problem</h2>
          <p className="text-gray-300 mt-2">{project.problem}</p>
        </div>

        <div className="fade-in">
          <h2 className="text-2xl font-semibold mt-4">The Solution</h2>
          <p className="text-gray-300 mt-2">{project.solution}</p>
        </div>

        <div className="fade-in">
          <h2 className="text-2xl font-semibold mt-6">Key Features</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="fade-in">
          <h2 className="text-2xl font-semibold mt-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="bg-gray-700 text-sky-400 text-sm px-3 py-1 rounded-full border border-gray-600"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="fade-in">
          <h2 className="text-2xl font-semibold mt-6">Impact</h2>
          <p className="text-gray-300 mt-2">{project.impact}</p>
        </div>

        <div className="project-links fade-in mt-6">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              GitHub →
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              {project.slug === "homelab" ? "LinkedIn Documentation →" : "Live Site →"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
