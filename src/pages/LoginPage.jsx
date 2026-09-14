import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const LoginPage = () => {
  const navigate  = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      {
        username,
        password,
      }
    );

    console.log("Login response:", response.data);

    const { token, username: loggedInUsername } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("username", loggedInUsername);

    toast.success("Login SuccessFull")

    navigate("/home");

  } catch (error) {
      console.log("Login failed:", error);

  toast.error(
    error.response?.data?.message || "Invalid username or password"
  );
  }
};

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>

        <h2 className="text-center mb-4">
          Login to TicketNest
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Username
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
};

export default LoginPage;