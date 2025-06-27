// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { db } from "../../auth/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [proposalCount, setProposalCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const proposalsSnapshot = await getDocs(collection(db, "proposals"));
      const usersSnapshot = await getDocs(collection(db, "users"));
      const invoicesSnapshot = await getDocs(collection(db, "invoices"));
      const meetingsSnapshot = await getDocs(
        query(collection(db, "meetings"), orderBy("createdAt", "desc"))
      );

      setProposalCount(proposalsSnapshot.size);
      setUserCount(usersSnapshot.size);
      setInvoiceCount(invoicesSnapshot.size);
      setMeetings(meetingsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const handleAcceptMeeting = async (id) => {
    await updateDoc(doc(db, "meetings", id), { status: "accepted" });
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "accepted" } : m))
    );
  };

  const handleDeleteMeeting = async (id) => {
    if (confirm("Delete this meeting request?")) {
      await deleteDoc(doc(db, "meetings", id));
      setMeetings((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const formatDateTime = (date, time) => {
    try {
      const combined = new Date(`${date}T${time}`);
      return combined.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">🛠️ Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Proposals</h2>
          <p className="text-3xl mt-2">{proposalCount}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-3xl mt-2">{userCount}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Invoices</h2>
          <p className="text-3xl mt-2">{invoiceCount}</p>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">📅 Pending Meeting Requests</h2>
        {meetings.length === 0 ? (
          <p className="text-gray-400">No meetings submitted.</p>
        ) : (
          <div className="space-y-4">
            {meetings.map((m) => (
              <div key={m.id} className="p-4 bg-gray-800 rounded border border-gray-700">
                <p><strong>Date:</strong> {formatDateTime(m.date, m.time)}</p>
                <p><strong>Notes:</strong> {m.notes || "No notes provided."}</p>
                <p><strong>Status:</strong> {m.status || "pending"}</p>
                <div className="flex gap-3 mt-2">
                  {m.status !== "accepted" && (
                    <button
                      onClick={() => handleAcceptMeeting(m.id)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 text-sm rounded"
                    >
                      Accept
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteMeeting(m.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 text-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">🛠️ Admin Tools</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>🔍 View and manage all proposals (edit, approve, reject)</li>
          <li>👥 View and manage registered users</li>
          <li>🧾 Generate and assign invoices to projects</li>
          <li>📅 Review meeting requests directly on the dashboard</li>
          <li>🛡️ Update site-wide settings and roles</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
