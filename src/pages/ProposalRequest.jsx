// src/pages/ProposalRequest.jsx
import { useState } from "react";
import { db, auth } from "../auth/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ProposalRequest = () => {
  const [form, setForm] = useState({
    timeline: "",
    budget: "",
    projectDetails: "",
    targetAudience: "",
    designInspiration: "",
    numberOfPages: "",
    websiteGoal: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      await addDoc(collection(db, "proposals"), {
        ...form,
        userId: user.uid,
        submittedAt: serverTimestamp(),
        status: "pending"
      });

      setMessage("Proposal request submitted successfully.");
      setForm({
        timeline: "",
        budget: "",
        projectDetails: "",
        targetAudience: "",
        designInspiration: "",
        numberOfPages: "",
        websiteGoal: ""
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Request a Project Proposal</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="timeline" type="text" placeholder="Preferred Timeline" className="w-full p-2 bg-gray-800 border border-gray-600 rounded" value={form.timeline} onChange={handleChange} />
        <input name="budget" type="text" placeholder="Estimated Budget" className="w-full p-2 bg-gray-800 border border-gray-600 rounded" value={form.budget} onChange={handleChange} />
        <textarea name="projectDetails" placeholder="Describe your project..." required className="w-full p-2 bg-gray-800 border border-gray-600 rounded h-24" value={form.projectDetails} onChange={handleChange} />
        <textarea name="targetAudience" placeholder="Who is the target audience for this site?" className="w-full p-2 bg-gray-800 border border-gray-600 rounded h-20" value={form.targetAudience} onChange={handleChange} />
        <input name="designInspiration" type="url" placeholder="Link to design inspiration (optional)" className="w-full p-2 bg-gray-800 border border-gray-600 rounded" value={form.designInspiration} onChange={handleChange} />
        <input name="numberOfPages" type="text" placeholder="How many pages do you need?" className="w-full p-2 bg-gray-800 border border-gray-600 rounded" value={form.numberOfPages} onChange={handleChange} />
        <input name="Project Name" type="text" placeholder="Goal of the site (e.g., minimal, corporate, creative) and a name to put behind it." className="w-full p-2 bg-gray-800 border border-gray-600 rounded" value={form.websiteGoal} onChange={handleChange} />
        <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded">Submit Request</button>
        {message && <p className="text-green-400 text-center mt-2">{message}</p>}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ProposalRequest;