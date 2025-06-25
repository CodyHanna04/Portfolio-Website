// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../auth/firebase";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.role === "client");
      setClients(data);
    };

    fetchClients();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Registered Clients</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="p-4 bg-white shadow rounded border">
            <h3 className="font-bold text-lg">{client.businessName}</h3>
            <p>Email: {client.email}</p>
            <p>Phone: {client.phone}</p>
            {client.website && <p>Website: <a href={client.website} className="text-blue-600 underline" target="_blank" rel="noreferrer">{client.website}</a></p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
