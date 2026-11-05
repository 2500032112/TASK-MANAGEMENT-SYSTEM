import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo Admin Login
    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      const admin = {
        name: "Admin",
        email: email,
        role: "admin",
      };

      localStorage.setItem("currentUser", JSON.stringify(admin));
      navigate("/admin-dashboard");
      return;
    }

    // User Login
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/user-dashboard");
    } else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">TaskFlow</div>

        <h2>Welcome Back!</h2>
        <p className="subtitle">Login to manage your tasks</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <div className="demo-info">
          <strong>Admin Demo Login</strong>
          <p>Email: admin@gmail.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;