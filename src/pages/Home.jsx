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
    <div className="bg-gray-900 text-white font-sans pb-16 w-full min-h-screen">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20 text-center fade-in">
        <p className="text-sky-400 font-medium tracking-widest uppercase text-sm mb-4">
          Hi, I'm
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-3">
          Cody Hanna
        </h1>
        <p className="text-2xl text-gray-400 font-light mb-6">Full-Stack Developer</p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Building real-world tools that solve real problems — from rental management systems to kitchen dashboards.
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

      {/* Featured Projects */}
      <div className="max-w-5xl mx-auto px-6 fade-in">
        <h2 className="text-3xl font-bold mb-2 text-center">Featured Projects</h2>
        <p className="text-gray-400 text-center mb-10">A few things I've built recently</p>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <Link
            to="/project3"
            className="group bg-gray-800 rounded-xl overflow-hidden hover:shadow-sky-900/30 hover:-translate-y-1 transition-all duration-200"
          >
            <img
              src="/images/hanna1.png"
              alt="Hanna Properties"
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h3 className="text-base font-semibold group-hover:text-sky-400 transition-colors">
                Hanna Properties
              </h3>
              <p className="text-gray-400 text-sm mt-1">Rental management system</p>
            </div>
          </Link>

          <Link
            to="/project1"
            className="group bg-gray-800 rounded-xl overflow-hidden hover:shadow-sky-900/30 hover:-translate-y-1 transition-all duration-200"
          >
            <img
              src="/images/internshiphub1.png"
              alt="Internship Hub"
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h3 className="text-base font-semibold group-hover:text-sky-400 transition-colors">
                Internship Hub
              </h3>
              <p className="text-gray-400 text-sm mt-1">Student internship platform</p>
            </div>
          </Link>

          <Link
            to="/project2"
            className="group bg-gray-800 rounded-xl overflow-hidden hover:shadow-sky-900/30 hover:-translate-y-1 transition-all duration-200"
          >
            <img
              src="/images/pancake1.png"
              alt="Pancake Night"
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h3 className="text-base font-semibold group-hover:text-sky-400 transition-colors">
                Pancake Night KDS
              </h3>
              <p className="text-gray-400 text-sm mt-1">Kitchen display system</p>
            </div>
          </Link>
        </div>
        <div className="mt-8 text-center">
          <Link to="/projects" className="text-sky-400 hover:underline text-sm">
            See all projects →
          </Link>
        </div>
      </div>
    </div>
  );
}
