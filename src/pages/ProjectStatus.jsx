import { useEffect, useState } from "react";
import { auth, db } from "../auth/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const statusColors = {
  planning: "bg-yellow-500",
  in_progress: "bg-blue-500",
  review: "bg-purple-500",
  completed: "bg-green-500",
  pending: "bg-gray-500",
  submitted: "bg-indigo-500",
};

const ProjectStatus = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [revisionInputs, setRevisionInputs] = useState({});
  const [clientEmail, setClientEmail] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const user = auth.currentUser;
      if (!user) return;

      setClientEmail(user.email);

      const q1 = query(collection(db, "proposals"), where("userId", "==", user.uid));
      const q2 = query(collection(db, "proposals"), where("clientEmail", "==", user.email), where("submittedBy", "==", "ambassador"));

      const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

      const direct = snap1.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const ambassador = snap2.docs.map(doc => ({ id: doc.id, ...doc.data(), isAmbassador: true }));

      const combined = [...direct, ...ambassador];
      setProjects(combined);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this proposal?")) {
      await deleteDoc(doc(db, "proposals", id));
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleRevisionSubmit = async (projectId) => {
    const revision = revisionInputs[projectId]?.trim();
    if (!revision) return;

    await updateDoc(doc(db, "proposals", projectId), {
      clientRevisionComment: revision,
    });
    alert("Revisions submitted.");
  };

  const filteredProjects = showCompleted
    ? projects
    : projects.filter((p) => p.status !== "completed");

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">🚀 Project Status</h1>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-300">Show Completed Projects</span>
        </label>
      </div>

      {loading ? (
        <p>Loading your project updates...</p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-gray-400">You currently have no active projects.</p>
      ) : (
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-lg border border-gray-700 bg-gray-900 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                <div>
                  <h2 className="text-xl font-semibold">
                    {project.projectName || project.websiteGoal || "General Website"}{" "}
                    {project.isAmbassador && (
                      <span className="ml-2 text-sm text-purple-400">(via Ambassador)</span>
                    )}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end items-center">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full text-white ${statusColors[project.status] || "bg-gray-500"}`}>
                    {project.status?.replace("_", " ").toUpperCase() || "PENDING"}
                  </span>

                  {project.status === "pending" && !project.isAmbassador && (
                    <>
                      <a
                        href={`/edit-proposal/${project.id}`}
                        className="text-sm px-3 py-1 rounded bg-sky-600 hover:bg-sky-700 transition text-white"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition text-white"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              <p className="text-gray-300 mb-2">
                <strong>Details:</strong> {project.projectDetails}
              </p>
              {project.targetAudience && (
                <p className="text-gray-300 mb-2">
                  <strong>Target Audience:</strong> {project.targetAudience}
                </p>
              )}
              {project.numberOfPages && (
                <p className="text-gray-300 mb-2">
                  <strong>Pages Needed:</strong> {project.numberOfPages}
                </p>
              )}
              <p className="text-gray-300 mb-2">
                <strong>Timeline:</strong> {project.timeline || "N/A"} | <strong>Budget:</strong> ${project.budget || "?"}
              </p>
              {project.designInspiration && (
                <p className="text-gray-300 mb-2">
                  <strong>Inspiration:</strong>{" "}
                  <a
                    href={project.designInspiration}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 underline"
                  >
                    View Design
                  </a>
                </p>
              )}
              {project.invoiceUrl && (
                <p className="text-gray-300 mb-2">
                  <strong>Invoice:</strong>{" "}
                  <a
                    href={project.invoiceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 underline"
                  >
                    View Invoice
                  </a>
                </p>
              )}
              {project.submittedAt && (
                <p className="text-sm text-gray-500 italic">
                  Submitted: {new Date(project.submittedAt?.toDate?.() || project.createdAt).toLocaleDateString()}
                </p>
              )}

              {project.status === "review" && (
                <div className="mt-4">
                  <textarea
                    className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600"
                    rows="3"
                    placeholder="Enter your revision comments or feedback here..."
                    value={revisionInputs[project.id] || ""}
                    onChange={(e) => setRevisionInputs({ ...revisionInputs, [project.id]: e.target.value })}
                  />
                  <button
                    onClick={() => handleRevisionSubmit(project.id)}
                    className="mt-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
                  >
                    Submit Revisions
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectStatus;
