// src/components/Register.tsx
import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate(); // Use `useNavigate` to get navigation function

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      if (!email) {
        setEmailError("Email is required");
        return;
      }
      if (!password) {
        setPasswordError("Password is required");
        return;
      }
      await register(email, password);
      navigate("/verify-otp", { replace: true }); // Navigate to OTP verification page
    } catch (error: any) {
      console.log(error.response.data.message);
      alert(error.response.data.message || "Error during registration");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(null);
          }}
          placeholder="Email"
          required // HTML5 'required' attribute for browser-level validation
          value={email}
        />
        {emailError && <span style={{ color: "red" }}>{emailError}</span>}{" "}
        {/* Display error if email is missing */}
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(null);
          }}
          placeholder="Password"
          required
          value={password}
        />
        {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}{" "}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
