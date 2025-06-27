// src/auth/RoleBasedRoute.jsx
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        setUser(firebaseUser);
        setRole(userData?.role || null);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user || !allowedRoles.includes(role)) {
    // Optional: redirect to correct dashboard if logged in but role is different
    if (role === "admin") return <Navigate to="/admin" />;
    if (role === "ambassador") return <Navigate to="/ambassador/dashboard" />;
    if (role === "client") return <Navigate to="/client-dashboard" />;

    return <Navigate to="/login" />;
  }

  return children;
};

export default RoleBasedRoute;
