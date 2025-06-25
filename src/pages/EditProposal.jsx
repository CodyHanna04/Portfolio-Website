// src/pages/EditProposal.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../auth/firebase";

const EditProposal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const docRef = doc(db, "proposals", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setForm(snapshot.data());
        } else {
          setError("Proposal not found");
        }
      } catch (err) {
        setError("Failed to fetch proposal");
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "proposals", id), form);
      navigate("/project-status");
    } catch (err) {
      console.error("Error updating proposal:", err);
      setError("Update failed. Try again.");
    }
  };

  if (loading) return <div className="p-6 text-white">Loading proposal...</div>;
  if (error) return <div className="p-6 text-red-400">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">✏️ Edit Proposal</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Project Details</label>
          <textarea
            name="projectDetails"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={form.projectDetails || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">Target Audience</label>
          <input
            name="targetAudience"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={form.targetAudience || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">Number of Pages</label>
          <input
            name="numberOfPages"
            type="number"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={form.numberOfPages || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">Timeline</label>
          <input
            name="timeline"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={form.timeline || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">Budget</label>
          <input
            name="budget"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={form.budget || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">Design Inspiration (URL)</label>
          <input
            name="designInspiration"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={form.designInspiration || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1">Website Goal</label>
          <select
            name="websiteGoal"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            value={form.websiteGoal || ""}
            onChange={handleChange}
          >
            <option value="">Select Goal</option>
            <option value="Minimal">Minimal</option>
            <option value="Corporate">Corporate</option>
            <option value="Creative">Creative</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProposal;
