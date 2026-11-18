import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if(email && password){
      window.location.href="/dashboard";
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-brand">
          <div className="brand-symbol">✦</div>
          <h1>IMAGINE AI</h1>
          <p>Create beyond imagination</p>
        </div>

        <div className="login-form-section">
          <form onSubmit={handleLogin}>
            <h2>Sign in</h2>
            <p className="login-subtitle">
              Sign in if you have an account here.
            </p>

            <label>Your email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="forgot-password">
              <a href="#forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="sign-in-btn">
              SIGN IN
            </button>

            <p className="signup-text">
              Not a member? <a href="signup">Sign up</a>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;

