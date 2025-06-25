import { useState } from "react";
import { auth, db } from "../auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    businessName: "",
    email: "",
    phone: "",
    website: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await setDoc(doc(db, "users", res.user.uid), {
        businessName: form.businessName,
        email: form.email,
        phone: form.phone,
        website: form.website,
        role: "client",
        userId: res.user.uid,
        createdAt: new Date().toISOString()
      });
      navigate("/client-dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          name="businessName"
          type="text"
          onChange={handleChange}
          value={form.businessName}
          placeholder="Business Name"
          required
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={form.email}
          placeholder="Email"
          required
        />
        <input
          name="phone"
          type="tel"
          onChange={handleChange}
          value={form.phone}
          placeholder="Phone Number"
          required
        />
        <input
          name="website"
          type="url"
          onChange={handleChange}
          value={form.website}
          placeholder="Website (optional)"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={form.password}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
        <div className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-400 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
