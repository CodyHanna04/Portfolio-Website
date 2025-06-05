import { Link } from "react-router-dom";

const projects = [
  {
    title: "Internship Hub",
    description: "A full-stack platform for students to find local internships.",
    route: "/project1",
  },
  {
    title: "Kitchen Display System",
    description: "Order management system for pancake nights.",
    route: "/project2",
  },
];

export default function Projects() {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
    <section id="projects" className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
      <div className="grid gap-8 sm:grid-cols-2">
        {projects.map((proj, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-white">{proj.title}</h3>
            <p className="text-gray-300 mt-2">{proj.description}</p>
            <Link
              to={proj.route}
              className="inline-block mt-4 text-sky-400 hover:underline"
            >
              View Project →
            </Link>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
