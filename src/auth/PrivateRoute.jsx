import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
