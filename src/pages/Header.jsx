// src/components/Header.jsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Cody Hanna</h1>
        <ul className="flex gap-6 text-sm text-gray-300">
          <li><Link to="/" className="hover:text-sky-400">Home</Link></li>
          <li><Link to="/about" className="hover:text-sky-400">About</Link></li>
          <li><Link to="/projects" className="hover:text-sky-400">Projects</Link></li>
          <li><Link to="/contact" className="hover:text-sky-400">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
