import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      const token = response?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/checklist");
      } else {
        alert("Login gagal, token tidak ditemukan");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login gagal, periksa username atau password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Masuk</button>
        <p className="redirect-text">
          Belum punya akun? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
