import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLock, FiCheckCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { authService } from "../../services/authService";
import "./Login.css";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!fullName.trim()) errors.fullName = "Full name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid email format";
    if (!phone.trim()) errors.phone = "Phone number is required";
    if (phone.replace(/\D/g, "").length < 10) errors.phone = "Phone must be at least 10 digits";
    if (!username.trim()) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (password.length < 6) errors.password = "Password must be more than 6 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setLoading(true);

    try {
      await authService.signup({ fullName, email, phone, username, password });
      window.dispatchEvent(new Event("storage"));
      navigate("/courses");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <form className="login-card" onSubmit={handleSignup}>
        <h2>Create an Account </h2>
        <p>Sign up to start learning on CodeK</p>

        <div className="input-group">
          <FiUser className="input-icon" />
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={loading} />
        </div>
        {validationErrors.fullName && <span className="validation-error">{validationErrors.fullName}</span>}

        <div className="input-group">
          <FiMail className="input-icon" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
        </div>
        {validationErrors.email && <span className="validation-error">{validationErrors.email}</span>}

        <div className="input-group">
          <FiPhone className="input-icon" />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={loading} />
        </div>
        {validationErrors.phone && <span className="validation-error">{validationErrors.phone}</span>}

        <div className="input-group">
          <FiUser className="input-icon" />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
        </div>
        {validationErrors.username && <span className="validation-error">{validationErrors.username}</span>}

        <div className="input-group">
          <FiLock className="input-icon" />
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          {showPassword ? <FiEyeOff className="password-toggle" onClick={() => setShowPassword(false)} /> : <FiEye className="password-toggle" onClick={() => setShowPassword(true)} />}
        </div>
        {validationErrors.password && <span className="validation-error">{validationErrors.password}</span>}

        <div className="input-group">
          <FiCheckCircle className="input-icon" />
          <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} />
          {showConfirmPassword ? <FiEyeOff className="password-toggle" onClick={() => setShowConfirmPassword(false)} /> : <FiEye className="password-toggle" onClick={() => setShowConfirmPassword(true)} />}
        </div>
        {validationErrors.confirmPassword && <span className="validation-error">{validationErrors.confirmPassword}</span>}

        {error && <span className="error">{error}</span>}
        <button type="submit" disabled={loading}>{loading ? "Creating account..." : "Sign Up"}</button>
      </form>
    </section>
  );
}