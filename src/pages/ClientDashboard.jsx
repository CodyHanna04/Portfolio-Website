// src/pages/ClientDashboard.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../auth/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [meetingForm, setMeetingForm] = useState({ date: "", time: "", notes: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserData(userData);

        const proposalQuery = query(
          collection(db, "proposals"),
          where("clientEmail", "==", userData.email),
          where("submittedBy", "==", "ambassador")
        );
        const proposalSnap = await getDocs(proposalQuery);
        const proposalData = proposalSnap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((p) => p.status === "pending");
        setProposals(proposalData);

        const meetingQuery = query(collection(db, "meetings"), where("userId", "==", user.uid));
        const mSnap = await getDocs(meetingQuery);
        const meetingData = mSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMeetings(meetingData);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleMeetingChange = (e) => {
    setMeetingForm({ ...meetingForm, [e.target.name]: e.target.value });
  };

  const handleMeetingSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "meetings"), {
      ...meetingForm,
      userId: user.uid,
      createdAt: serverTimestamp(),
      status: "pending",
    });

    setMeetingForm({ date: "", time: "", notes: "" });
    window.location.reload();
  };

  const handleApproveProposal = async (proposalId) => {
    await updateDoc(doc(db, "proposals", proposalId), {
      clientApproved: true,
      clientApprovedAt: new Date().toISOString(),
    });

    setProposals((prev) =>
      prev.map((p) =>
        p.id === proposalId ? { ...p, clientApproved: true } : p
      )
    );
  };

  if (!userData) return <div className="p-6 text-white">Loading dashboard...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {userData.businessName || userData.email}</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Your Information</h2>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          {userData.website && (
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={userData.website}
                className="text-sky-400 underline"
                target="_blank"
                rel="noreferrer"
              >
                {userData.website}
              </a>
            </p>
          )}
        </div>

        <div className="bg-gray-900 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Schedule a Meeting</h2>
          <form onSubmit={handleMeetingSubmit} className="space-y-3">
            <input
              type="date"
              name="date"
              required
              value={meetingForm.date}
              onChange={handleMeetingChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
            <input
              type="time"
              name="time"
              required
              value={meetingForm.time}
              onChange={handleMeetingChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
            <textarea
              name="notes"
              placeholder="Meeting Notes (Include location of meeting)"
              value={meetingForm.notes}
              onChange={handleMeetingChange}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            />
            <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded w-full">
              Schedule
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-900 p-4 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Proposals Sent by Ambassadors</h2>
        {proposals.length === 0 ? (
          <p className="text-gray-400">No ambassador-submitted proposals yet.</p>
        ) : (
          <ul className="space-y-4">
            {proposals.map((p) => (
              <li key={p.id} className="border border-gray-700 rounded p-3">
                <div className="flex justify-between items-center mb-1">
                  <strong>{p.projectName || "Untitled Project"}</strong>
                  <span className="px-2 py-1 rounded text-sm text-white bg-gray-700">
                    {p.status?.toUpperCase() || "PENDING"}
                  </span>
                </div>
                <p className="text-gray-300">{p.projectDetails}</p>
                <div className="mt-2">
                  {p.clientApproved ? (
                    <span className="text-green-500 font-semibold text-sm">✅ You approved this proposal</span>
                  ) : (
                    <button
                      onClick={() => handleApproveProposal(p.id)}
                      className="mt-2 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Approve Proposal
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-900 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
        {meetings.length === 0 ? (
          <p className="text-gray-400">No meetings scheduled.</p>
        ) : (
          <ul className="space-y-3">
            {meetings.map((m) => (
              <li key={m.id} className="border border-gray-700 rounded p-3">
                <div className="flex justify-between items-center">
                  <p><strong>Date:</strong> {m.date} | <strong>Time:</strong> {m.time}</p>
                  <span className={`px-2 py-1 rounded text-sm font-semibold ${
                    m.status === "accepted"
                      ? "bg-green-600"
                      : m.status === "declined"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  }`}>
                    {m.status?.toUpperCase() || "PENDING"}
                  </span>
                </div>
                {m.notes && <p className="text-gray-300 mt-1"><strong>Notes:</strong> {m.notes}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
