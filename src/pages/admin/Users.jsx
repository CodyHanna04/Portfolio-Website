import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role !== "admin"); // ⛔️ Exclude admins
      setUsers(data);
      setFilteredUsers(data);
    };
    fetchUsers();
  }, []);

  const handleStatusToggle = async (id, isActive) => {
    await updateDoc(doc(db, "users", id), { active: !isActive });
    setUsers(prev =>
      prev.map(user => user.id === id ? { ...user, active: !isActive } : user)
    );
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteDoc(doc(db, "users", id));
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredUsers(users.filter(u =>
      u.email.toLowerCase().includes(value) ||
      u.businessName?.toLowerCase().includes(value)
    ));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">👥 Manage Users</h1>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by email or business name..."
        className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-600 text-white"
      />

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-gray-900 rounded-lg border border-gray-700 shadow"
          >
            <p><strong>Name:</strong> {user.businessName || "N/A"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Status:</strong> {user.active ? "Active" : "Inactive"}</p>
            <p><strong>Last Login:</strong> {user.lastLogin ? new Date(user.lastLogin.toDate()).toLocaleString() : "N/A"}</p>
            <div className="mt-2 flex gap-3">
              <button
                onClick={() => handleStatusToggle(user.id, user.active)}
                className={`px-3 py-1 rounded text-white ${user.active ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"}`}
              >
                {user.active ? "Deactivate" : "Reactivate"}
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
