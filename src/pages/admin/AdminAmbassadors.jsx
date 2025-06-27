import { useEffect, useState } from "react";
import { db } from "../../auth/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const AdminAmbassadors = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalCommission: 0,
    paidCommission: 0,
    unpaidCommission: 0,
    ambassadorStats: {},
  });

  const COMMISSION_RATE = 0.15;

  const fetchAmbassadorProposals = async () => {
    setLoading(true);
    const q = query(
      collection(db, "proposals"),
      where("submittedBy", "==", "ambassador")
    );
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProposals(results);
    calculateAnalytics(results);
    setLoading(false);
  };

  const calculateAnalytics = (proposals) => {
    let totalRevenue = 0;
    let totalCommission = 0;
    let paidCommission = 0;
    let ambassadorStats = {};

    for (const p of proposals) {
      const budget = parseFloat(p.budget || 0);
      const commission = budget * COMMISSION_RATE;

      if (p.clientApproved) {
        totalRevenue += budget;
        totalCommission += commission;

        if (p.referrerId) {
          if (!ambassadorStats[p.referrerId]) {
            ambassadorStats[p.referrerId] = {
              totalProjects: 0,
              totalBudget: 0,
              totalCommission: 0,
              paid: 0,
              owed: 0,
            };
          }

          ambassadorStats[p.referrerId].totalProjects += 1;
          ambassadorStats[p.referrerId].totalBudget += budget;
          ambassadorStats[p.referrerId].totalCommission += commission;

          if (p.commissionPaid) {
            ambassadorStats[p.referrerId].paid += commission;
            paidCommission += commission;
          } else {
            ambassadorStats[p.referrerId].owed += commission;
          }
        }
      }
    }

    setAnalytics({
      totalRevenue,
      totalCommission,
      paidCommission,
      unpaidCommission: totalCommission - paidCommission,
      ambassadorStats,
    });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this proposal?");
    if (!confirm) return;
    await deleteDoc(doc(db, "proposals", id));
    setProposals((prev) => prev.filter((p) => p.id !== id));
  };

  const handleMarkPaid = async (id) => {
    await updateDoc(doc(db, "proposals", id), {
      commissionPaid: true,
    });
    setProposals((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, commissionPaid: true } : p
      )
    );
    calculateAnalytics(
      proposals.map((p) =>
        p.id === id ? { ...p, commissionPaid: true } : p
      )
    );
  };

  useEffect(() => {
    fetchAmbassadorProposals();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Ambassador Proposals</h2>

      {/* Analytics */}
      <div className="bg-gray-900 border border-gray-700 rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-2">📊 Earnings Analytics</h3>
        <p><strong>Total Revenue (Approved):</strong> ${analytics.totalRevenue.toFixed(2)}</p>
        <p><strong>Total Commission Owed:</strong> ${analytics.totalCommission.toFixed(2)}</p>
        <p><strong>Paid Commission:</strong> ${analytics.paidCommission.toFixed(2)}</p>
        <p><strong>Unpaid Commission:</strong> ${analytics.unpaidCommission.toFixed(2)}</p>

        <h4 className="mt-4 font-bold">Per Ambassador Stats:</h4>
        <div className="space-y-2 mt-2">
          {Object.entries(analytics.ambassadorStats).map(([id, data]) => (
            <div
              key={id}
              className="bg-gray-800 rounded p-3 border border-gray-600"
            >
              <p><strong>Referrer ID:</strong> {id}</p>
              <p><strong>Projects:</strong> {data.totalProjects}</p>
              <p><strong>Total Budget:</strong> ${data.totalBudget.toFixed(2)}</p>
              <p><strong>Commission:</strong> ${data.totalCommission.toFixed(2)}</p>
              <p><strong>Paid:</strong> ${data.paid.toFixed(2)}</p>
              <p><strong>Still Owed:</strong> ${data.owed.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Proposal List */}
      {loading ? (
        <p>Loading proposals...</p>
      ) : proposals.length === 0 ? (
        <p>No proposals submitted by ambassadors yet.</p>
      ) : (
        <div className="grid gap-4">
          {proposals.map((p) => {
            const commission = parseFloat(p.budget || 0) * COMMISSION_RATE;
            return (
              <div
                key={p.id}
                className="border rounded p-4 shadow flex flex-col sm:flex-row sm:justify-between bg-gray-900 border-gray-700"
              >
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    {p.projectName || "Untitled Project"}
                    {p.clientApproved && (
                      <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        ✅ Approved
                      </span>
                    )}
                  </p>
                  <p>Client: {p.clientName} ({p.clientEmail})</p>
                  <p>Status: {p.status || "N/A"}</p>
                  <p>Budget: ${p.budget || "Unknown"}</p>
                  <p className="text-sm text-gray-400">
                    Referrer ID: {p.referrerId}
                  </p>
                  {p.clientApproved && (
                    <p className="text-sm mt-1">
                      Commission: ${commission.toFixed(2)} —{" "}
                      {p.commissionPaid ? (
                        <span className="text-green-500 font-semibold">✅ Paid</span>
                      ) : (
                        <span className="text-red-400 font-semibold">❌ Not Paid</span>
                      )}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:items-end">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  {p.clientApproved && !p.commissionPaid && (
                    <button
                      onClick={() => handleMarkPaid(p.id)}
                      className="text-sm px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white"
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminAmbassadors;
