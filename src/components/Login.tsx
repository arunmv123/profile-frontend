import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use `useNavigate` to get navigation function

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/profile", { replace: true }); // Navigate to the profile page
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      alert(error.response.data.message);
      navigate("/login", { replace: true }); 
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          value={email}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          value={password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
