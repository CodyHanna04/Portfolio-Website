import { useState } from "react";
import { auth, db } from "../../auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const AmbassadorRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    referralCode: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // 🔍 Check if referralCode is already used
    const referralQuery = query(
      collection(db, "users"),
      where("referralCode", "==", form.referralCode.trim().toLowerCase())
    );
    const existing = await getDocs(referralQuery);
    if (!form.referralCode.trim()) {
      return setError("Referral link ID is required.");
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(form.referralCode)) {
      return setError("Referral link can only contain letters, numbers, hyphens, and underscores.");
    }
    if (!existing.empty) {
      return setError("That referral link ID is already taken. Please choose another.");
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await setDoc(doc(db, "users", res.user.uid), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        referralCode: form.referralCode.trim().toLowerCase(),
        role: "ambassador",
        userId: res.user.uid,
        createdAt: new Date().toISOString(),
        active: true,
        hasReferrals: false
      });
      navigate("/ambassador/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <h2>Ambassador Sign Up</h2>
      <form onSubmit={handleRegister}>
        <input
          name="name"
          type="text"
          onChange={handleChange}
          value={form.name}
          placeholder="Full Name"
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
          name="password"
          type="password"
          onChange={handleChange}
          value={form.password}
          placeholder="Password"
          required
        />
        <input
          name="referralCode"
          type="text"
          onChange={handleChange}
          value={form.referralCode}
          placeholder="Choose your referral link ID (e.g., codyrocks)"
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
        <div className="text-center text-sm mt-2">
          Already an ambassador?{" "}
          <Link to="/login" className="text-sky-400 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AmbassadorRegister;
