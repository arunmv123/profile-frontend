import React, { useState } from "react";
import { verifyOTP } from "../services/authService";
import { useNavigate } from "react-router-dom";

const VerifyOTP: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate(); // Use `useNavigate` to get navigation function

  const handleVerify = async (e: any) => {
    e.preventDefault();
    try {
      const response = await verifyOTP(email, otp);
      alert(response.data.message);
      navigate("/login", { replace: true }); 
    } catch (error: any) {
      alert(error.response.data.message || "Error during OTP verification");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerify}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <input
          type="text"
          onChange={(e) => setOtp(e.target.value)}
          required
          placeholder="OTP"
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyOTP;
