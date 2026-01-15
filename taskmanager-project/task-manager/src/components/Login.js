import React, { useState } from "react";
import "../styles/Login.css";
// import SHA1 from "crypto-js/sha1";

function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 🔐 SHA1 hash (matches PHP sha1())
      // const hashedPassword = SHA1(password).toString();

      const response = await fetch(
        `https://v1.mypayrollmaster.online/api/v2qa/login?user_id=${encodeURIComponent(
          username
        )}&password= ${password}`
      );

      const data = await response.json();

      if (data.success === 1) {
        // Save login info if needed
        localStorage.setItem("user", JSON.stringify(data.data));
        onSuccess(data.data);
      } else {
        alert("Invalid login credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Task Manager</h2>
          <p>Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
