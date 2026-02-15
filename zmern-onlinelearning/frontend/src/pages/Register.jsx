import { useState } from "react";
import './register.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default role
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/auth/register",
        form
      );

      alert("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="body-container">
      <div className="logo">
        EDUTECH - <span>Online learning platform</span>
      </div>
      <div className="register-container">
        <div className="regis-col1">
        <img src="https://i.pinimg.com/1200x/df/be/92/dfbe924249436a239218147fad31627b.jpg"></img>
      </div>
      <div className="regis-col2" style={{ textAlign: "center"}}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br /><br />

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

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <br /><br />

        <button type="submit">Register</button>
      </form>
      <p className="newuser"  style={{ marginTop: "50px" }}>
        Already a User? <Link to="/">Please Login</Link>
      </p>
    </div>
    </div>
    </div>
  );
}

export default Register;
