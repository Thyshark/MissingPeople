import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const minLength = password.length >= 8;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      setErrors({ ...errors, email: "Invalid email format" });
      return;
    }

    if (!isPasswordValid(password)) {
      setErrors({
        ...errors,
        password:
          "Password must be at least 8 characters long and meet complexity requirements",
      });
      return;
    }

    try {
      console.log(name, email, password, userType);
      const response = await axios.post("http://localhost:7000/register", {
        name,
        email,
        password,
        userType: userType.charAt(0).toUpperCase() + userType.slice(1),
      });

      console.log(response.data); // Log the response data

      // Assuming successful registration, navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      if (error.response && error.response.data) {
        setErrors({
          ...errors,
          registration:
            error.response.data.message ||
            "Registration failed. Please try again later.",
        });
      } else {
        setErrors({
          ...errors,
          registration: "An error occurred. Please try again later.",
        });
      }
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-light-blue vh-100">
      <div className="container bg-white p-4 rounded shadow w-50">
        <h2 className="mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {errors.name && (
            <div className="alert alert-danger" role="alert">
              {errors.name}
            </div>
          )}

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
          {errors.email && (
            <div className="alert alert-danger" role="alert">
              {errors.email}
            </div>
          )}

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
          {errors.password && (
            <div className="alert alert-danger" role="alert">
              {errors.password}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="userType" className="form-label">
              <strong>User Type:</strong>
            </label>
            <select
              className="form-control rounded-0"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              name="userType"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {errors.registration && (
            <div className="alert alert-danger" role="alert">
              {errors.registration}
            </div>
          )}

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign Up
          </button>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
