// src/pages/ProjectStatus.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../auth/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const statusColors = {
  planning: "bg-yellow-500",
  in_progress: "bg-blue-500",
  review: "bg-purple-500",
  completed: "bg-green-500",
  pending: "bg-gray-500",
};

const ProjectStatus = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "proposals"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const projectData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setProjects(projectData);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this proposal?")) {
      await deleteDoc(doc(db, "proposals", id));
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">🚀 Project Status</h1>
      {loading ? (
        <p>Loading your project updates...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400">You currently have no active projects.</p>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-lg border border-gray-700 bg-gray-900 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                <div>
                  <h2 className="text-xl font-semibold">
                    Website Proposal ({project.websiteGoal || "General"})
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end items-center">
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full text-white ${statusColors[project.status] || "bg-gray-500"}`}
                  >
                    {project.status?.replace("_", " ").toUpperCase() || "PENDING"}
                  </span>

                  {project.status === "pending" && (
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
              <p className="text-gray-300 mb-2">
                <strong>Target Audience:</strong> {project.targetAudience}
              </p>
              <p className="text-gray-300 mb-2">
                <strong>Pages Needed:</strong> {project.numberOfPages}
              </p>
              <p className="text-gray-300 mb-2">
                <strong>Timeline:</strong> {project.timeline} | <strong>Budget:</strong> {project.budget}
              </p>
              {project.designInspiration && (
                <p className="text-gray-300 mb-2">
                  <strong>Inspiration:</strong>{" "}
                  <a href={project.designInspiration} target="_blank" rel="noreferrer" className="text-sky-400 underline">
                    View Design
                  </a>
                </p>
              )}
              {project.submittedAt && (
                <p className="text-sm text-gray-500 italic">
                  Submitted: {new Date(project.submittedAt.toDate()).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectStatus;
