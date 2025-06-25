import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../auth/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, form.email, form.password);

      const userDoc = await getDoc(doc(db, "users", res.user.uid));
      const role = userDoc.data()?.role || "client";

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/client-dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        <div className="text-center text-sm mt-2">
          <Link to="/forgot-password" className="text-sky-400 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
