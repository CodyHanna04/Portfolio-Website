import { useState } from "react";
import projects from "../projects/index";
import ProjectCard from "../components/ProjectCard";

const allTech = ["All", ...new Set(projects.flatMap((p) => p.tech))];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tech.includes(activeFilter));

  return (
    <div className="bg-gray-900 text-white min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header + filters */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real-world applications built to solve real problems, from rental management to AI-powered logistics.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
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

        {/* Project grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No projects match this filter.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
