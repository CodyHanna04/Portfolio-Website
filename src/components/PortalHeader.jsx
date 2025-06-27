// src/pages/PortalHeader.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../auth/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const PortalHeader = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Cody Codes Portal</h1>

        {user ? (
          <nav className="flex items-center gap-4">
            <Link to={role === "admin" ? "/admin-dashboard" : "/client-dashboard"} className="hover:underline">Dashboard</Link>
            <Link to="/project-status" className="hover:underline">Project Status</Link>
            <Link to="/proposal-request" className="hover:underline">Proposal Request</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </nav>
        ) : (
          <nav className="flex items-center gap-4">
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/register/ambassador" className="hover:underline">Become an Ambassador</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default PortalHeader;