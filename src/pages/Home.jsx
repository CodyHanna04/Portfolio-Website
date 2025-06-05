import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white font-sans pt-24 pb-8 w-full min-h-screen">
      <div className="max-w-4xl mx-auto px-10 text-center">
        <h1 className="text-5xl font-extrabold mb-8 leading-tight">Welcome to My Portfolio</h1>
        <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
          Explore my world of development — from building intuitive interfaces to automating systems and creating tools that solve real problems.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/about"
            className="bg-sky-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-500 transition"
          >
            About Me
          </Link>
          <Link
            to="/projects"
            className="bg-sky-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-500 transition"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="bg-sky-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-500 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
