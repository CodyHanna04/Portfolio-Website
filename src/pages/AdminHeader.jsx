import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-gray-950 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Portal</h1>
      <nav className="flex gap-4">
        <Link to="/admin" className="hover:text-sky-400">Dashboard</Link>
        <Link to="/admin/proposals" className="hover:text-sky-400">Proposals</Link>
        <Link to="/admin/invoices" className="hover:text-sky-400">Invoices</Link>
        <Link to="/admin/users" className="hover:text-sky-400">Users</Link>
        <Link to="/admin/settings" className="hover:text-sky-400">Settings</Link>
        <button onClick={handleLogout} className="text-red-400 hover:text-red-300">Logout</button>
      </nav>
    </header>
  );
};

export default AdminHeader;
