// src/components/Header.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/homelab', label: 'Homelab' },
  { to: '/tech-help', label: 'Tech Help' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `transition ${isActive ? 'text-sky-400' : 'text-gray-300 hover:text-sky-400'}`;

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-700">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white" onClick={() => setOpen(false)}>
          Cody Hanna
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <ul className="flex gap-6 text-sm">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={linkClass} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-700 rounded-md px-2 py-1 hover:border-sky-400 hover:text-sky-400 transition"
            aria-label="Open command palette"
          >
            <kbd className="font-sans">Ctrl</kbd>
            <kbd className="font-sans">K</kbd>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span
            className={`block w-5 h-0.5 bg-gray-300 transition-transform duration-200 ${
              open ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-300 transition-opacity duration-200 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-300 transition-transform duration-200 ${
              open ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="sm:hidden border-t border-gray-800 px-6 py-4 space-y-4 text-sm bg-gray-900">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={linkClass}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
