import project from "../projects/internshipHub";

export default function Project1() {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        <p className="text-lg text-gray-300 mb-4">{project.description}</p>
        <p className="text-gray-400 mb-4">
          Built with: {project.tech.join(", ")}
        </p>
        <div className="flex gap-4">
          <a href={project.github} className="text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">
            GitHub →
          </a>
          {project.live && (
            <a href={project.live} className="text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Live Site →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
