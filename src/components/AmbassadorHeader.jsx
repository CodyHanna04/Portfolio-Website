import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

const AmbassadorHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-gray-950 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Ambassador Portal</h1>
      <nav className="flex gap-4">
        <Link to="/ambassador/dashboard" className="hover:text-sky-400">Dashboard</Link>
        <Link to="/ambassador/submit-proposal" className="hover:text-sky-400">Submit Proposal</Link>
        <Link to="/ambassador/earnings" className="hover:text-sky-400">Earnings</Link>
        <button onClick={handleLogout} className="text-red-400 hover:text-red-300">Logout</button>
      </nav>
    </header>
  );
};

export default AmbassadorHeader;
