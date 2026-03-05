import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  // 🔹 Lifted State (shared authentication status)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("signin");

  console.log("App Re-rendered");

  return (
    <div className="app">
      <h1>Authentication System</h1>

      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <>
          <div className="switch">
            <button onClick={() => setCurrentPage("signin")}>
              Sign In
            </button>
            <button onClick={() => setCurrentPage("signup")}>
              Sign Up
            </button>
          </div>

          {currentPage === "signin" ? (
            <SignIn setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <SignUp setIsAuthenticated={setIsAuthenticated} />
          )}
        </>
      )}
    </div>
  );
}

/* ================= SIGN IN ================= */

function SignIn({ setIsAuthenticated }) {
  // 🔹 State Co-location (only used here)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Derived State
  const isValid = email.includes("@") && password.length >= 6;

  useEffect(() => {
    console.log("SignIn Re-rendered");
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsAuthenticated(true); // 🔹 Lifted state update
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Sign In</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={!isValid}>
        {isValid ? "Login" : "Enter valid details"}
      </button>
    </form>
  );
}

/* ================= SIGN UP ================= */

function SignUp({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid =
    username.length >= 3 &&
    email.includes("@") &&
    password.length >= 6;

  useEffect(() => {
    console.log("SignUp Re-rendered");
  }, [username, email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsAuthenticated(true);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={!isValid}>
        {isValid ? "Register" : "Fill all fields correctly"}
      </button>
    </form>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard({ setIsAuthenticated }) {
  return (
    <div className="card">
      <h2>Welcome 🎉</h2>
      <p>You are successfully authenticated.</p>
      <button onClick={() => setIsAuthenticated(false)}>
        Logout
      </button>
    </div>
  );
}