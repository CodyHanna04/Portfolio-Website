import { useState, useEffect } from "react";
import { auth, db } from "../auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    businessName: "",
    email: "",
    phone: "",
    website: "",
    password: "",
    referrerId: "", // optional but validated if filled
  });
  const [error, setError] = useState("");
  const [checkingReferral, setCheckingReferral] = useState(false);
  const navigate = useNavigate();

  // Autofill from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref");
    if (ref) {
      setForm((prev) => ({ ...prev, referrerId: ref }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // 🔍 Validate referral if filled
    if (form.referrerId) {
      setCheckingReferral(true);
      const refDoc = await getDoc(doc(db, "users", form.referrerId));
      if (!refDoc.exists()) {
        setError("Invalid referral code.");
        setCheckingReferral(false);
        return;
      }
      setCheckingReferral(false);
    }

    // 👤 Create user and save
    try {
      const res = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await setDoc(doc(db, "users", res.user.uid), {
        businessName: form.businessName,
        email: form.email,
        phone: form.phone,
        website: form.website,
        role: "client",
        userId: res.user.uid,
        referrerId: form.referrerId || null,
        createdAt: new Date().toISOString(),
        active: true
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
        <input
          name="referrerId"
          type="text"
          onChange={handleChange}
          value={form.referrerId}
          placeholder="Referral Code (optional)"
        />
        <button type="submit" disabled={checkingReferral}>
          {checkingReferral ? "Checking referral..." : "Register"}
        </button>
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
