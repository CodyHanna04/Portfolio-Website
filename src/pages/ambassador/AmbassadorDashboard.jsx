// src/pages/AmbassadorDashboard.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../../auth/firebase";
import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";

const AmbassadorDashboard = () => {
  const [referrals, setReferrals] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [commission, setCommission] = useState(0);
  const [user, setUser] = useState(null);
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const fetchReferrals = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      setUser(currentUser);

      // Get referred users
      const q1 = query(collection(db, "users"), where("referrerId", "==", currentUser.uid));
      const referralSnap = await getDocs(q1);
      const referredUsers = referralSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setReferrals(referredUsers);

      // Get proposals linked to the ambassador
      const q2 = query(collection(db, "proposals"), where("referrerId", "==", currentUser.uid));
      const proposalSnap = await getDocs(q2);
      const referredProposals = proposalSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProposals(referredProposals);

      // Calculate commission from closed proposals
      let earned = 0;
      for (const proposal of referredProposals) {
        if (proposal.status === "closed") {
          earned += 0.15 * (proposal.total || 0); // Assuming `total` is project value
        }
      }
      setCommission(earned);
    };

    fetchReferrals();

    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      const userData = userDoc.data();

      if (userData?.referralCode) {
        setReferralCode(userData.referralCode);
      }
    };

    fetchUser();
  }, []);

  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Ambassador!</h2>
        <p className="mb-4">Your referral link:</p>
        <input
          type="text"
          value={referralLink}
          readOnly
          className="w-full p-2 border border-gray-300 rounded mb-6"
        />

        <h3 className="text-xl font-bold mb-2">Referrals</h3>
        <ul className="mb-6">
          {referrals.map((r) => (
            <li key={r.id} className="border-b py-2">
              {r.businessName || r.email} — Registered ✅
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-bold mb-2">Proposals Credited to You</h3>
        <ul className="mb-6">
          {proposals.map((p) => (
            <li key={p.id} className="border-b py-2">
              <span className="font-semibold">{p.projectName || "Untitled"}</span> — Status: {p.status || "Unknown"}
              {p.clientApproved ? (
                <span className="text-green-500 font-medium ml-2">✅ Client Approved</span>
              ) : (
                <span className="text-yellow-400 font-medium ml-2">⏳ Awaiting Approval</span>
              )}
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-bold">Commission Earned:</h3>
        <p className="text-2xl font-bold text-green-600">${commission.toFixed(2)}</p>
      </div>
    </>
  );
};

export default AmbassadorDashboard;
