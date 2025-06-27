// src/pages/Earnings.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../../auth/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const AmbassadorEarnings = () => {
  const [proposals, setProposals] = useState([]);
  const [totalEarned, setTotalEarned] = useState(0);

  useEffect(() => {
    const fetchEarnings = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const q = query(
        collection(db, "proposals"),
        where("referrerId", "==", currentUser.uid),
        where("status", "==", "closed") // Only count closed deals
      );

      const snap = await getDocs(q);
      const data = snap.docs.map(doc => doc.data());
      setProposals(data);

      let total = 0;
      for (const p of data) {
        const amount = parseFloat(p.total || p.budget || 0);
        total += 0.15 * amount; // 15% commission
      }

      setTotalEarned(total);
    };

    fetchEarnings();
  }, []);

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Earnings</h2>
        <p className="text-xl text-green-600 mb-6 font-semibold">
          Total Earned: ${totalEarned.toFixed(2)}
        </p>

        <h3 className="text-lg font-semibold mb-2">Closed Proposals:</h3>
        <ul className="space-y-2">
          {proposals.map((p, i) => (
            <li key={i} className="border p-3 rounded">
              {p.projectName || "Untitled"} — Earned: $
              {(0.15 * parseFloat(p.total || p.budget || 0)).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AmbassadorEarnings;
