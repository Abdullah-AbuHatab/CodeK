import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleLoginClick = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="container">
      {/* Logo + Mobile Menu Button */}
      <div className="logo-menu">
        <button className="menu-btn" onClick={() => setOpen((v) => !v)}>
          ☰
        </button>
        <h1 className="Pname">CodeK</h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="nav nav-left nav-hidden">
        <NavLink to="/" end>
          {({ isActive }) => (
            <button className={isActive ? "active" : "hi"}>Home</button>
          )}
        </NavLink>
        <NavLink to="/courses">
          {({ isActive }) => (
            <button className={isActive ? "active" : "hi"}>Courses</button>
          )}
        </NavLink>
        <NavLink to="/about">
          {({ isActive }) => (
            <button className={isActive ? "active" : "hi"}>About</button>
          )}
        </NavLink>
        <NavLink to="/contact">
          {({ isActive }) => (
            <button className={isActive ? "active" : "hi"}>Contact</button>
          )}
        </NavLink>
      </nav>

      {/* User Actions */}
      <div className="user-actions">
        {user ? (
          <>
            <span className="user-name">Hi, {user.username}</span>
            {user.role === "admin" && (
              <button onClick={() => navigate("/admin")} className="admin-btn">
                Admin
              </button>
            )}
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={handleLoginClick} className="login">
              Login
            </button>
            <NavLink to="/signup">
              <button className="signup">Sign Up</button>
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-dropdown ${open ? "open" : ""}`}>
        <NavLink to="/" end onClick={() => setOpen(false)}>
          {({ isActive }) => (
            <button className={isActive ? "active" : ""}>Home</button>
          )}
        </NavLink>
        <NavLink to="/courses" onClick={() => setOpen(false)}>
          {({ isActive }) => (
            <button className={isActive ? "active" : ""}>Courses</button>
          )}
        </NavLink>
        <NavLink to="/about" onClick={() => setOpen(false)}>
          {({ isActive }) => (
            <button className={isActive ? "active" : ""}>About</button>
          )}
        </NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>
          {({ isActive }) => (
            <button className={isActive ? "active" : ""}>Contact</button>
          )}
        </NavLink>

        {!user && (
          <>
            <button onClick={handleLoginClick}>Login</button>
            <NavLink to="/signup" onClick={() => setOpen(false)}>
              <button>Sign Up</button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}
