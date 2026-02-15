import React, { useState } from "react";
import "./assets/Auth.css";

function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!username || !password) {
      alert("Fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isSignup) {
      const existingUser = users.find((u) => u.username === username);
      if (existingUser) {
        alert("User already exists");
        return;
      }

      const newUser = { username, password };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      alert("Signup successful! Please login.");
      setIsSignup(false);
    } else {
      const validUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!validUser) {
        alert("Invalid credentials");
        return;
      }

      onLogin(validUser);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p onClick={() => setIsSignup(!isSignup)} className="toggle">
          {isSignup
            ? "Already have account? Sign In"
            : "Don't have account? Sign Up"}
        </p>
      </div>
    </div>
  );
}

export default Auth;
