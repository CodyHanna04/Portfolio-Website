import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import projects from "../projects/index";

const pageItems = [
  { label: "Home", hint: "Page", to: "/", keywords: "start landing" },
  { label: "About", hint: "Page", to: "/about", keywords: "bio experience skills certifications resume" },
  { label: "Projects", hint: "Page", to: "/projects", keywords: "portfolio work apps" },
  { label: "Homelab Status", hint: "Page", to: "/homelab", keywords: "uptime lab servers proxmox monitoring" },
  { label: "Tech Help", hint: "Page", to: "/tech-help", keywords: "it consulting support services pricing" },
  { label: "Resume", hint: "Page", to: "/resume", keywords: "cv pdf download experience hire" },
  { label: "Contact", hint: "Page", to: "/contact", keywords: "email message hire" },
];

const externalItems = [
  { label: "GitHub", hint: "Link", href: "https://github.com/CodyHanna04", keywords: "code repos source" },
  { label: "LinkedIn", hint: "Link", href: "https://linkedin.com/in/cody-hanna04", keywords: "profile career network" },
  { label: "Email Me", hint: "Link", href: "mailto:codyhanna8@gmail.com", keywords: "contact mail" },
];

const projectItems = projects.map((p) => ({
  label: p.title,
  hint: "Project",
  to: `/projects/${p.slug}`,
  keywords: `${p.tagline || ""} ${p.tech.join(" ")}`,
}));

const allItems = [...pageItems, ...projectItems, ...externalItems];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((item) =>
      `${item.label} ${item.hint} ${item.keywords}`.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      // Focus after the dialog renders
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  const runItem = (item) => {
    setOpen(false);
    if (item.to) navigate(item.to);
    else if (item.href) window.open(item.href, "_blank", "noopener,noreferrer");
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      runItem(results[selected]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-lg bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-gray-700">
          <span className="text-gray-500 text-sm font-mono">&gt;</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search pages, projects, links..."
            className="w-full bg-transparent py-4 text-sm text-white placeholder-gray-500 focus:outline-none"
            aria-label="Search"
          />
          <kbd className="text-[10px] text-gray-500 border border-gray-600 rounded px-1.5 py-0.5 flex-shrink-0">
            ESC
          </kbd>
        </div>

        <ul className="max-h-72 overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-gray-500 text-sm">No results</li>
          )}
          {results.map((item, i) => (
            <li key={`${item.hint}-${item.label}`}>
              <button
                onClick={() => runItem(item)}
                onMouseEnter={() => setSelected(i)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                  i === selected ? "bg-sky-400/10 text-sky-400" : "text-gray-300"
                }`}
              >
                <span className="truncate">{item.label}</span>
                <span
                  className={`text-[10px] uppercase tracking-wider flex-shrink-0 ml-4 ${
                    i === selected ? "text-sky-400/70" : "text-gray-600"
                  }`}
                >
                  {item.hint}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-700 px-4 py-2 flex gap-4 text-[10px] text-gray-500">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
