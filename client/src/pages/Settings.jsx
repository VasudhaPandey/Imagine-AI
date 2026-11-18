
import React, { useState } from "react";
import "./Settings.css";

function Settings() {
  const [theme, setTheme] = useState("Dark");
  const [quality, setQuality] = useState("High");
  const [ratio, setRatio] = useState("1:1");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [announcements, setAnnouncements] = useState(false);
  const [publicProfile, setPublicProfile] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = () => {
    const settings = {
      theme,
      quality,
      ratio,
      emailNotifications,
      announcements,
      publicProfile
    };

    localStorage.setItem("imagineAISettings", JSON.stringify(settings));
    setMessage("Your settings have been saved successfully!");
  };

  return (
    <div className="settings-page">

      <div className="settings-topbar">
        <div>
          <span>Workspace</span>
          <span className="breadcrumb-divider"> / </span>
          <strong>Settings</strong>
        </div>

        <div className="settings-top-profile">
          <span className="online-dot"></span>
          <div className="settings-avatar">V</div>
        </div>
      </div>

      <main className="settings-main">

        <div className="settings-heading">
          <div>
            <span className="settings-eyebrow">PERSONALIZE YOUR WORKSPACE</span>
            <h1>Settings <span>✦</span></h1>
            <p>Customize your Imagine AI experience just the way you like it.</p>
          </div>
        </div>

        {/* PROFILE CARD */}
        <section className="profile-card">

          <div className="profile-card-left">
            <div className="large-avatar">V</div>

            <div>
              <span className="profile-label">YOUR ACCOUNT</span>
              <h2>Vasudha Pandey</h2>
              <p>user@example.com</p>
            </div>
          </div>

          <div className="plan-badge">
            ✦ Free Plan
          </div>

        </section>

        <div className="settings-grid">

          {/* APPEARANCE */}
          <section className="settings-card">

            <div className="card-heading">
              <div className="card-icon purple-icon">◐</div>
              <div>
                <h2>Appearance</h2>
                <p>Make your workspace feel yours.</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <h3>Interface Theme</h3>
                <p>Choose your preferred appearance.</p>
              </div>
            </div>

            <div className="theme-options">
              <button
                className={theme === "Dark" ? "theme-option selected" : "theme-option"}
                onClick={() => setTheme("Dark")}
              >
                <span className="theme-preview dark-preview">☾</span>
                <span>Dark</span>
                {theme === "Dark" && <span className="selected-check">✓</span>}
              </button>

              <button
                className={theme === "Light" ? "theme-option selected" : "theme-option"}
                onClick={() => setTheme("Light")}
              >
                <span className="theme-preview light-preview">☀</span>
                <span>Light</span>
                {theme === "Light" && <span className="selected-check">✓</span>}
              </button>
            </div>

          </section>

          {/* GENERATION */}
          <section className="settings-card">

            <div className="card-heading">
              <div className="card-icon blue-icon">✧</div>
              <div>
                <h2>Generation Preferences</h2>
                <p>Set your default image preferences.</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <h3>Image Quality</h3>
                <p>Default quality for new images.</p>
              </div>

              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <option>Standard</option>
                <option>High</option>
                <option>Ultra</option>
              </select>
            </div>

            <div className="setting-row">
              <div>
                <h3>Aspect Ratio</h3>
                <p>Preferred image dimensions.</p>
              </div>

              <select
                value={ratio}
                onChange={(e) => setRatio(e.target.value)}
              >
                <option>1:1</option>
                <option>16:9</option>
                <option>9:16</option>
                <option>4:3</option>
              </select>
            </div>

          </section>

          {/* NOTIFICATIONS */}
          <section className="settings-card">

            <div className="card-heading">
              <div className="card-icon orange-icon">♧</div>
              <div>
                <h2>Notifications</h2>
                <p>Control what updates you receive.</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <h3>Email Notifications</h3>
                <p>Receive important account updates.</p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            <div className="setting-row">
              <div>
                <h3>Product Announcements</h3>
                <p>Discover new features and updates.</p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={announcements}
                  onChange={(e) => setAnnouncements(e.target.checked)}
                />
                <span className="switch-slider"></span>
              </label>
            </div>

          </section>

          {/* PRIVACY */}
          <section className="settings-card">

            <div className="card-heading">
              <div className="card-icon green-icon">♙</div>
              <div>
                <h2>Privacy & Security</h2>
                <p>Manage your profile visibility.</p>
              </div>
            </div>

            <div className="setting-row">
              <div>
                <h3>Public Profile</h3>
                <p>Allow others to view your profile.</p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={publicProfile}
                  onChange={(e) => setPublicProfile(e.target.checked)}
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            <div className="privacy-note">
              <span>ⓘ</span>
              Your profile is private by default.
            </div>

          </section>

        </div>

        {/* SAVE BUTTON */}
        <div className="settings-actions">
          {message && (
            <p className="settings-success">✓ {message}</p>
          )}

          <button
            className="save-settings-btn"
            onClick={handleSave}
          >
            Save Changes <span>→</span>
          </button>
        </div>

        <footer className="settings-footer">
          Imagine AI · Your creative space, your rules.
        </footer>

      </main>
    </div>
  );
}

export default Settings;
