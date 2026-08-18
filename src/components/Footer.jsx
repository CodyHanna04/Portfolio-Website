import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-white">Cody Hanna</p>
          <p className="text-gray-500 text-sm mt-1">
            Full-stack software engineer · Maryland
          </p>
        </div>

        <nav className="flex gap-6 text-sm text-gray-400">
          <Link to="/" className="hover:text-sky-400 transition">Home</Link>
          <Link to="/about" className="hover:text-sky-400 transition">About</Link>
          <Link to="/projects" className="hover:text-sky-400 transition">Projects</Link>
          <Link to="/homelab" className="hover:text-sky-400 transition">Homelab</Link>
          <Link to="/tech-help" className="hover:text-sky-400 transition">Tech Help</Link>
          <Link to="/resume" className="hover:text-sky-400 transition">Resume</Link>
          <Link to="/contact" className="hover:text-sky-400 transition">Contact</Link>
        </nav>

        <div className="flex gap-5 text-sm text-gray-400">
          <a
            href="https://github.com/CodyHanna04"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/cody-hanna04"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition"
          >
            LinkedIn
          </a>
          <a href="mailto:codyhanna8@gmail.com" className="hover:text-sky-400 transition">
            Email
          </a>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <p className="max-w-5xl mx-auto px-6 py-4 text-xs text-gray-600 text-center sm:text-left">
          © {new Date().getFullYear()} Cody Hanna · Built with React, Vite & Tailwind CSS ·
          press <kbd className="border border-gray-700 rounded px-1">Ctrl</kbd>+<kbd className="border border-gray-700 rounded px-1">K</kbd> to jump anywhere
        </p>
      </div>
    </footer>
  );
}
