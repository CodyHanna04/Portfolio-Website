// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../auth/firebase";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("A password reset email has been sent.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
        {message && <p className="text-green-400 text-center mt-2">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="text-center text-sm mt-2">
          <Link to="/login" className="text-sky-400 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
