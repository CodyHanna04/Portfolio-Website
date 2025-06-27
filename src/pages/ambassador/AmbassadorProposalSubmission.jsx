// src/pages/SubmitProposal.jsx
import { useState } from "react";
import { db, auth } from "../../auth/firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AmbassadorProposalSubmission = () => {
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    projectName: "",
    projectDetails: "",
    budget: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("You must be logged in.");

        // 🔍 Fetch ambassador’s referralCode
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const userData = userDoc.data();
        const referralCode = userData?.referralCode;

        if (!referralCode) {
        throw new Error("Your referral link ID is missing.");
        }

        // 💾 Store proposal with referralCode as referrerId
        await addDoc(collection(db, "proposals"), {
        ...form,
        referrerId: referralCode,
        submittedBy: "ambassador",
        status: "submitted",
        createdAt: new Date().toISOString(),
        commissionPaid: false,
        clientApproved: false
        });

        setSuccess("Proposal submitted successfully!");
        setForm({
        clientName: "",
        clientEmail: "",
        projectName: "",
        projectDetails: "",
        budget: "",
        });

        setTimeout(() => navigate("/ambassador/dashboard"), 1500);
    } catch (err) {
        setError(err.message);
    }
    };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submit Proposal for a Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="clientName"
          placeholder="Client Name"
          value={form.clientName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="clientEmail"
          placeholder="Client Email"
          type="email"
          value={form.clientEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="projectName"
          placeholder="Project Name"
          value={form.projectName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="projectDetails"
          placeholder="Project Details"
          value={form.projectDetails}
          onChange={handleChange}
          className="w-full p-2 border rounded h-32"
          required
        />
        <input
          name="budget"
          placeholder="Estimated Budget"
          value={form.budget}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-500">
          Submit Proposal
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default AmbassadorProposalSubmission;
