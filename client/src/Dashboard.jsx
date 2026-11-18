
import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {

  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [active, setActive] = useState("Dashboard");

  // Image Generation API
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setGeneratedImage("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/images/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt: prompt })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image generation failed");
      }

      setGeneratedImage(
        `data:${data.mimeType};base64,${data.image}`
      );

    } catch (error) {
      console.error("Image generation error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Sidebar Menu
  const menu = [
    "Dashboard",
    "Community",
    "Prompt Store",
    "Favorites",
    "Subscription",
    "Image Generation",
    "Canvas Editor",
    "Texture Generation",
    "Motion Generation",
    "Settings"
  ];

  // Recent Creations
  const creations = [
    { title: "Dreamy Cherry", category: "Photography", color: "cherry" },
    { title: "Magic Garden", category: "Nature", color: "garden" },
    { title: "Golden Memories", category: "Art", color: "gold" },
    { title: "Ocean Dreams", category: "Photography", color: "ocean" },
    { title: "Pink Blossom", category: "Digital Art", color: "flower" },
    { title: "Fantasy World", category: "Fantasy", color: "fantasy" }
  ];

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <span className="brand-icon">✦</span>
          Imagine AI
        </div>

        <div className="menu-title">MENU</div>

        <nav>
          {menu.map((item, index) => (
            <button
              key={item}
              className={`menu-item ${
                active === item ? "active" : ""
              }`}
              onClick={() => {

                if (item === "Image Generation") {
                  window.location.href = "/create-image";}
                         else if (item === "Community") {

                       window.location.href = "/community";
                         }
                         else if (item === "Prompt Store") {
  window.location.href = "/prompt-store";}

                        else if (item === "Subscription") {
  window.location.href = "/subscription";
}

                 else if (item === "Settings") {
                  window.location.href = "/settings";

                } 
                else if (item === "Texture Generation") {
  window.location.href = "/texture-generation";
}
 else if (item === "Motion Generation") {
  window.location.href = "/motion-generation";
 }

  else if (item === "Canvas Editor") {
  window.location.href = "/canvas-editor";
}
                else {
                  setActive(item);
                }

              }}
            >
              <span className="menu-icon">
                {[
                  "⌂",
                  "◎",
                  "▤",
                  "♡",
                  "◇",
                  "✧",
                  "▣",
                  "◈",
                  "◉",
                  "⚙"
                ][index]}
              </span>

              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">V</div>

            <div>
              <strong>My Account</strong>
              <small>Free Plan</small>
            </div>
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* TOPBAR */}
        <header className="topbar">

          <div>
            <span className="breadcrumb">
              Workspace /
            </span>

            <strong>{active}</strong>
          </div>

          <div className="top-actions">
            <button className="notification">♧</button>
            <div className="avatar">V</div>
          </div>

        </header>

        {/* WELCOME SECTION */}
        <section className="welcome">

          <div className="welcome-content">

            <span className="welcome-label">
              YOUR AI CREATIVE STUDIO
            </span>

            <h1>Welcome Back!</h1>

            <h2>
              Ready to create something amazing today?
            </h2>

            <p>
              Turn your imagination into reality with the
              power of AI. Describe your idea and let AI
              create it for you.
            </p>

            <button
              className="start-button"
              onClick={() => {
                window.location.href = "/create-image";
              }}
            >
              Start Creating <span>→</span>
            </button>

          </div>

          <div className="welcome-art">✦</div>

        </section>

        {/* IMAGE GENERATOR */}
        <section className="generator">

          <div className="section-heading">

            <div>
              <h2>Create with AI</h2>
              <p>
                Describe the image you want to generate
              </p>
            </div>

            <span className="ai-badge">
              AI POWERED
            </span>

          </div>

          <textarea
            placeholder="A beautiful fantasy landscape, mountains, sunset, cinematic lighting..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="generator-bottom">

            <span>
              Be creative. There are no limits.
            </span>

            <button
              className="generate-button"
              disabled={!prompt.trim() || loading}
              onClick={handleGenerate}
            >
              {loading ? "Generating..." : "Generate Image"}
            </button>

          </div>

          {loading && (
            <p>Creating your image... Please wait.</p>
          )}

          {error && (
            <p className="error-message">{error}</p>
          )}

          {generatedImage && (
            <div className="generated-result">

              <h3>Your Generated Image</h3>

              <img
                src={generatedImage}
                alt="AI generated"
                style={{
                  width: "100%",
                  maxWidth: "600px"
                }}
              />

            </div>
          )}

        </section>

        {/* RECENT CREATIONS */}
        <section className="creations">

          <div className="section-heading">

            <div>
              <h2>Recent Creations</h2>
              <p>
                Explore your latest AI artwork
              </p>
            </div>

            <button className="view-all">
              View All →
            </button>

          </div>

          <div className="filters">

            <button className="filter active-filter">
              All Images
            </button>

            <button className="filter">
              Photography
            </button>

            <button className="filter">
              Digital Art
            </button>

            <button className="filter">
              Nature
            </button>

          </div>

          <div className="creation-grid">

            {creations.map((item) => (

              <div className="creation-card" key={item.title}>

                <div className={`creation-image ${item.color}`}>
                  <span>✦</span>
                </div>

                <div className="creation-info">

                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.category}</small>
                  </div>

                  <button className="favorite">
                    ♡
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* FOOTER */}
        <footer>
          © 2026 Imagine AI. Create something extraordinary.
        </footer>

      </main>

    </div>
  );
}

export default Dashboard;
