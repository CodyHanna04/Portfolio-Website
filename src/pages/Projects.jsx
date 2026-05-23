import { Link } from "react-router-dom";
import internshipHub from "../projects/internshipHub";
import pancakeNight from "../projects/pancakeNight";
import hannaProperties from "../projects/hannaProperties";
import warehouseApp from "../projects/warehouseApp";

const projects = [
  { data: hannaProperties, route: "/project3" },
  { data: internshipHub, route: "/project1" },
  { data: pancakeNight, route: "/project2" },
  { data: warehouseApp, route: "/project4" },
];

export default function Projects() {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real-world applications built to solve real problems — from property management to kitchen logistics.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map(({ data, route }, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-sky-900/30 hover:-translate-y-1 transition-all duration-200 flex flex-col"
            >
              <img
                src={`/images/${data.images[0]}`}
                alt={data.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{data.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                  {data.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {data.tech.map((t, i) => (
                    <span
                      key={i}
                      className="bg-gray-700 text-sky-400 text-xs px-2.5 py-1 rounded-full border border-gray-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <Link
                    to={route}
                    className="text-sky-400 font-medium hover:underline text-sm"
                  >
                    View Details →
                  </Link>
                  <div className="flex gap-4">
                    <a
                      href={data.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white text-sm transition"
                    >
                      GitHub
                    </a>
                    {data.live && (
                      <a
                        href={data.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-sm transition"
                      >
                        Live Site
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
