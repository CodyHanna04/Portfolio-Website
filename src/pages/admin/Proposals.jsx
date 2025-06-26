import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { Link } from "react-router-dom";

const statusOptions = ["pending", "planning", "in_progress", "review", "completed"];
const statusColors = {
  pending: "bg-gray-500",
  planning: "bg-yellow-500",
  in_progress: "bg-blue-500",
  review: "bg-purple-500",
  completed: "bg-green-500",
};

export default function AdminProposals() {
  const [proposals, setProposals] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [proposalSnap, userSnap] = await Promise.all([
        getDocs(collection(db, "proposals")),
        getDocs(collection(db, "users")),
      ]);

      const users = {};
      userSnap.forEach(doc => {
        users[doc.id] = doc.data();
      });

      const formattedProposals = proposalSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setUsersMap(users);
      setProposals(formattedProposals);
      setLoading(false);
    };

    fetchAll();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateDoc(doc(db, "proposals", id), { status: newStatus });
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  if (loading) return <div className="p-6">Loading proposals...</div>;

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📄 All Project Proposals</h1>
      <div className="space-y-6">
        {proposals.map((project) => {
          const client = usersMap[project.userId];

          return (
            <div
              key={project.id}
              className="p-4 rounded-lg border border-gray-700 bg-gray-900 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3 flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-semibold">
                    {project.websiteGoal || "General"} — {client?.businessName || "Unknown Business"}
                  </h2>
                  <p className="text-sm text-gray-400">{client?.email || "No email"}</p>
                  <p className="text-sm text-gray-400">{client?.phone}</p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-300">Status:</label>
                  <select
                    className={`rounded px-3 py-1 font-semibold text-white ${statusColors[project.status] || "bg-gray-600"}`}
                    value={project.status}
                    onChange={(e) => handleStatusChange(project.id, e.target.value)}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status.replace("_", " ").toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-gray-300 mb-2">
                <strong>Details:</strong> {project.projectDetails}
              </p>

              <div className="flex flex-wrap gap-4 mt-3">
                <Link
                  to={`/admin/generate-invoice/${project.id}`}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-1 px-3 rounded"
                >
                  Generate Invoice
                </Link>

                {project.invoiceId && (
                  <Link
                    to={`/admin/invoices/edit/${project.invoiceId}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-1 px-3 rounded"
                  >
                    Edit Invoice
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
