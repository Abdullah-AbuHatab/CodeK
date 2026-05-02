import { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { authService } from "../../services/authService";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await authService.login(username, password);
      window.dispatchEvent(new Event("storage"));
      data.user.role === "admin" ? navigate("/admin") : navigate(from);
    } catch (err) {
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Welcome Back </h2>
        <p>Login to CodeK platform</p>

        <div className="input-group">
          <FiUser className="input-icon" />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} required />
        </div>

        <div className="input-group">
          <FiLock className="input-icon" />
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required />
          {showPassword ? <FiEyeOff className="password-toggle" onClick={() => setShowPassword(false)} /> : <FiEye className="password-toggle" onClick={() => setShowPassword(true)} />}
        </div>

        {error && <span className="error">{error}</span>}
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>

        <div className="signup-link-container">
          <p className="signup-link">Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
        </div>
      </form>
    </section>
  );
}