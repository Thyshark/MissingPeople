import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:7000/login", {
        email,
        password,
      });

      console.log("Login response:", response.data); // Log the entire response for debugging

      const userType = response.data.role;

      console.log("User type:", userType); // Log the userType for debugging

      if (userType === "User") {
        navigate("/found");
      } else if (userType === "Admin") {
        navigate("/manage");
      } else {
        console.log("Invalid user type:", userType); // Log the userType if it doesn't match expected values
      }
    } catch (error) {
      console.error("Login failed:", error);
      console.log("Login failed. Invalid credentials.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light-blue vh-100">
      <div className="container bg-white p-4 rounded shadow w-50">
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email:</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
