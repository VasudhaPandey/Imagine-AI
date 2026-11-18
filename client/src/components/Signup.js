import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }

    alert("Signup form submitted!");
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        <div className="signup-art">
          <div className="art-content">
            <span className="signup-logo">✦</span>
            <h1>IMAGINE AI</h1>
            <p>Turn your imagination into reality.</p>
          </div>
        </div>

        <div className="signup-form-section">
          <form onSubmit={handleSignup}>

            <h2>Create an account</h2>
            <p className="signup-subtitle">
              Enter your credentials to get started.
            </p>

            <div className="social-buttons">
              <button type="button">🌐 Sign up with Google</button>
              <button type="button"> Sign up with Apple</button>
            </div>

            <div className="signup-divider">
              <span>OR</span>
            </div>

            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Set a password</label>
            <div className="signup-password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label className="terms-label">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I agree to the <a href="#terms">Terms & Conditions</a>
              </span>
            </label>

            <button type="submit" className="create-account-btn">
              Create account
            </button>

            <p className="already-account">
              Already have an account?
              <a href="/login"> Log in</a>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Signup;

