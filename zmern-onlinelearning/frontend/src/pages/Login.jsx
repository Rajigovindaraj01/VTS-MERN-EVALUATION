import { useState, useContext } from "react";
import axios from "axios";
import './login.css'
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        form
      );

      login(res.data);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid email or password. New user? Please register first.");
      }
    }
  };

  return (
    <div className="body-container">
      <div className="logo">
        EDUTECH - <span>Online learning platform</span>
      </div>
      <div className="login-container" style={{ textAlign: "center", marginTop: "50px" }}>
      <div className="login-col1">
        <img src="https://i.pinimg.com/1200x/df/be/92/dfbe924249436a239218147fad31627b.jpg"></img>
      </div>
      <div>
        <h2>Login</h2>

      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <input
          placeholder="Email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <p className="newuser"  style={{ marginTop: "50px" }}>
        New user? <Link to="/register">Register here</Link>
      </p>
      </div>
    </div>
    </div>
  );
}

export default Login;
