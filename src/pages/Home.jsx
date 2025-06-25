import { useEffect } from "react";
import { Link } from "react-router-dom";
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
  }, []);

  return (
    <div className="bg-gray-900 text-white font-sans pt-24 pb-16 w-full min-h-screen">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
        {/* Hero */}
        <div className="fade-in">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">Cody Hanna</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Full-stack developer creating real-world tools that solve real-world problems — from rental management systems to kitchen dashboards.
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
              Contact
            </Link>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="fade-in">
          <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 px-4">
            <Link to="/project3" className="group bg-gray-800 p-4 rounded-lg hover:shadow-md transition">
              <img
                src="/images/hanna1.png"
                alt="Hanna Properties"
                className="rounded mb-3 h-40 w-full object-cover"
              />
              <h3 className="text-lg font-semibold group-hover:text-sky-400">Hanna Properties</h3>
              <p className="text-gray-400 text-sm">Rental management system</p>
            </Link>
            <Link to="/project1" className="group bg-gray-800 p-4 rounded-lg hover:shadow-md transition">
              <img
                src="/images/internshiphub1.png"
                alt="Internship Hub"
                className="rounded mb-3 h-40 w-full object-cover"
              />
              <h3 className="text-lg font-semibold group-hover:text-sky-400">Internship Hub</h3>
              <p className="text-gray-400 text-sm">Student internship platform</p>
            </Link>
            <Link to="/project2" className="group bg-gray-800 p-4 rounded-lg hover:shadow-md transition">
              <img
                src="/images/pancake1.png"
                alt="Pancake Night"
                className="rounded mb-3 h-40 w-full object-cover"
              />
              <h3 className="text-lg font-semibold group-hover:text-sky-400">Pancake Night</h3>
              <p className="text-gray-400 text-sm">Kitchen display system</p>
            </Link>
          </div>
          <div className="mt-6">
            <Link to="/projects" className="text-sky-400 hover:underline">
              See all projects →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
