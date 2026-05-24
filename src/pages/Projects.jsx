import { useState } from "react";
import { Link } from "react-router-dom";
import projects from "../projects/index";

const CARD_W = 280;
const CARD_GAP = 20;
const CARD_TOTAL = CARD_W + CARD_GAP;
const SCROLL_SPEED = 45; // px per second

const allTech = ["All", ...new Set(projects.flatMap((p) => p.tech))];

function buildTrack(filtered) {
  // Ensure at least ~1600px worth of cards per set so the strip always looks full
  const minCards = Math.max(filtered.length, Math.ceil(1600 / CARD_TOTAL));
  const copies = Math.ceil(minCards / filtered.length);
  const set = Array(copies).fill(filtered).flat();
  return [...set, ...set]; // doubled — animate by -50% for seamless loop
}

function MarqueeRow({ track, direction, duration }) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="overflow-hidden py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex"
        style={{
          gap: `${CARD_GAP}px`,
          width: `${track.length * CARD_TOTAL}px`,
          animation: `${direction === "right" ? "marquee-right" : "marquee-left"} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {track.map((project, i) => (
          <Link
            key={i}
            to={`/projects/${project.slug}`}
            className="group flex-shrink-0 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-sky-400/50 hover:-translate-y-1 transition-all duration-200"
            style={{ width: `${CARD_W}px` }}
          >
            {project.images?.length > 0 ? (
              <img
                src={`/images/${project.images[0]}`}
                alt={project.title}
                className="w-full h-44 object-cover group-hover:brightness-110 transition-all duration-200"
              />
            ) : (
              <div className="w-full h-44 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 text-xs">No preview</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors mb-2 leading-snug line-clamp-2">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-1">
                {project.tech.slice(0, 3).map((t, ti) => (
                  <span
                    key={ti}
                    className="text-xs bg-gray-700/80 text-sky-400 px-2 py-0.5 rounded-full border border-gray-600"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs text-gray-500 self-center">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tech.includes(activeFilter));

  const track = filtered.length > 0 ? buildTrack(filtered) : [];
  const singleSetCount = track.length / 2;
  const duration = (singleSetCount * CARD_TOTAL) / SCROLL_SPEED;

  return (
    <div className="bg-gray-900 text-white min-h-screen py-20">
      {/* Header + filters */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real-world applications built to solve real problems — from rental management to AI-powered logistics.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {allTech.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                activeFilter === tech
                  ? "bg-sky-400 border-sky-400 text-white"
                  : "border-gray-600 text-gray-400 hover:border-sky-400 hover:text-sky-400"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Marquee rows */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No projects match this filter.</p>
      ) : (
        <>
          <MarqueeRow track={track} direction="left" duration={duration} />
          <MarqueeRow track={track} direction="right" duration={duration} />
          <p className="text-center text-gray-600 text-xs mt-4">
            Hover to pause · Click any card to view details
          </p>
        </>
      )}
    </div>
  );
}
