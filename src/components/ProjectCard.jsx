import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-sky-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-900/30 transition-all duration-200"
    >
      {project.images?.length > 0 ? (
        <img
          src={`/images/${project.images[0]}`}
          alt={project.title}
          loading="lazy"
          className="w-full h-44 object-cover group-hover:brightness-110 transition-all duration-200"
        />
      ) : (
        <div className="w-full h-44 bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 text-xs">No preview</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-base font-semibold text-white group-hover:text-sky-400 transition-colors mb-1 leading-snug">
          {project.title}
        </h3>
        {project.tagline && (
          <p className="text-gray-400 text-sm mb-3">{project.tagline}</p>
        )}
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs bg-gray-700/80 text-sky-400 px-2 py-0.5 rounded-full border border-gray-600"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs text-gray-500 self-center">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
