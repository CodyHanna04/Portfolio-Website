import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="font-mono text-sky-400 text-sm mb-4">
          $ curl codycodez.com{typeof window !== "undefined" ? window.location.pathname : ""}
        </p>
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <p className="font-mono text-gray-500 text-sm mb-6">
          HTTP/1.1 404 Not Found: this route isn't in the router.
        </p>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist, was moved, or is quietly
          running as an LXC somewhere in the homelab.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="bg-sky-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-500 transition"
          >
            Back Home
          </Link>
          <Link
            to="/projects"
            className="border border-sky-400 text-sky-400 px-6 py-3 rounded-lg font-medium hover:bg-sky-400 hover:text-white transition"
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
