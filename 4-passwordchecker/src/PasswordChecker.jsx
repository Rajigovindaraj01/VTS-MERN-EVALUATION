import React, { useState, useEffect } from "react";
import "./PasswordChecker.css";

function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [missing, setMissing] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedPassword) {
      setMessage("Previously saved password found in localStorage");
    }
  }, []);

  const checkStrength = (value) => {
    let conditions = [];
    let passed = 0;

    if (!/[A-Z]/.test(value)) {
      conditions.push("At least one uppercase letter");
    } else passed++;

    if (!/[a-z]/.test(value)) {
      conditions.push("At least one lowercase letter");
    } else passed++;

    if (!/[0-9]/.test(value)) {
      conditions.push("At least one number");
    } else passed++;

    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
      conditions.push("At least one special symbol");
    } else passed++;

    if (value.length < 8) {
      conditions.push("Minimum 8 characters");
    } else passed++;

    setMissing(conditions);

    if (passed <= 2) setStrength("Weak");
    else if (passed <= 4) setStrength("Medium");
    else setStrength("Strong");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkStrength(value);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (strength !== "Strong") {
      setMessage("Password must be Strong before submitting!");
      return;
    }

    localStorage.setItem("savedPassword", password);
    setMessage("Password saved successfully in localStorage!");
    setPassword("");
    setStrength("");
    setMissing([]);
  };

  return (
    <div className="password-container">
      <div className="password-card">
        <h2>🔐 Password Strength Checker</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange}
          />

          {password && (
            <>
              <div className={`strength ${strength?.toLowerCase()}`}>
                Strength: {strength}
              </div>

              {missing.length > 0 && (
                <div className="missing">
                  <p>Missing Requirements:</p>
                  <ul>
                    {missing.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <button type="submit" className="submit-btn">
            Submit Password
          </button>
        </form>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default PasswordChecker;
