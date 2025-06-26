// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { db } from "../../auth/firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminDashboard = () => {
  const [proposalCount, setProposalCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const proposalsSnapshot = await getDocs(collection(db, "proposals"));
      const usersSnapshot = await getDocs(collection(db, "users"));
      const invoicesSnapshot = await getDocs(collection(db, "invoices"));

      setProposalCount(proposalsSnapshot.size);
      setUserCount(usersSnapshot.size);
      setInvoiceCount(invoicesSnapshot.size);
    };

    fetchData();
  }, []);

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

      <div className="bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Tools</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>🔍 View and manage all proposals (edit, approve, reject)</li>
          <li>👥 View and manage registered users</li>
          <li>🧾 Generate and assign invoices to projects</li>
          <li>🛡️ Update site-wide settings and roles</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
