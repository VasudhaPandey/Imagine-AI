
import React, { useState } from "react";
import "./MotionGeneration.css";

function MotionGeneration() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [camera, setCamera] = useState("Smooth Zoom");
  const [duration, setDuration] = useState("5 seconds");
  const [ratio, setRatio] = useState("16:9");
  const [intensity, setIntensity] = useState("Medium");
  const [generations, setGenerations] = useState([]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert("Please describe the video you want to create.");
      return;
    }

    const newGeneration = {
      id: Date.now(),
      prompt,
      style,
      camera,
      duration,
      ratio,
      intensity
    };

    setGenerations((previous) => [newGeneration, ...previous]);
    setPrompt("");
  };

  return (
    <div className="motion-page">

      {/* SIDEBAR */}
      <aside className="motion-sidebar">
        <h2 className="motion-logo">
          Imagine<span>AI</span>
        </h2>

        <p className="motion-menu-title">WORKSPACE</p>

        <nav className="motion-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/community">Community</a>
          <a href="/prompt-store">Prompt Store</a>
          <a href="/dashboard">Favorites</a>
          <a href="/subscription">Subscription</a>

          <p className="motion-menu-title">CREATE</p>

          <a href="/create-image">Image Generation</a>
          <a href="/dashboard">Canvas Editor</a>
          <a href="/texture-generation">Texture Generation</a>
          <a href="/motion-generation" className="active">
            Motion Generation
          </a>

          <p className="motion-menu-title">PREFERENCES</p>
          <a href="/settings">Settings</a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="motion-main">

        <header className="motion-header">
          <div>
            <h1>Motion Generation</h1>
            <p>Turn your creative ideas into cinematic motion.</p>
          </div>

          <div className="motion-ai-badge">
            ✦ AI Studio
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="motion-hero">
          <div>
            <span className="motion-tag">AI VIDEO STUDIO</span>
            <h2>Bring your imagination into motion.</h2>
            <p>
              Create stunning video concepts with motion,
              camera effects and cinematic styles.
            </p>
          </div>

          <div className="motion-hero-icon">▶</div>
        </section>

        {/* WORKSPACE */}
        <div className="motion-workspace">

          {/* GENERATION FORM */}
          <section className="motion-form">

            <div className="motion-section-heading">
              <h2>Create your video</h2>
              <span>01 / PROMPT</span>
            </div>

            <label>Describe your video</label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: A peaceful mountain landscape with clouds slowly moving across the sky, cinematic lighting..."
            />

            <div className="motion-section-heading">
              <h3>Motion Style</h3>
              <span>02 / STYLE</span>
            </div>

            <div className="motion-style-grid">
              {[
                "Cinematic",
                "Realistic",
                "Animation",
                "Anime",
                "3D Motion",
                "Dreamlike"
              ].map((item) => (
                <button
                  key={item}
                  className={style === item ? "selected" : ""}
                  onClick={() => setStyle(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="motion-settings-grid">

              <div>
                <label>Camera Movement</label>
                <select
                  value={camera}
                  onChange={(e) => setCamera(e.target.value)}
                >
                  <option>Smooth Zoom</option>
                  <option>Pan Left</option>
                  <option>Pan Right</option>
                  <option>Camera Rotation</option>
                  <option>Tracking Shot</option>
                  <option>Static Camera</option>
                </select>
              </div>

              <div>
                <label>Video Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option>5 seconds</option>
                  <option>10 seconds</option>
                  <option>15 seconds</option>
                  <option>20 seconds</option>
                </select>
              </div>

              <div>
                <label>Aspect Ratio</label>
                <select
                  value={ratio}
                  onChange={(e) => setRatio(e.target.value)}
                >
                  <option>16:9</option>
                  <option>9:16</option>
                  <option>1:1</option>
                  <option>4:3</option>
                </select>
              </div>

              <div>
                <label>Motion Intensity</label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

            </div>

            <button
              className="motion-generate-btn"
              onClick={handleGenerate}
            >
              ✦ Generate Video
            </button>

          </section>

          {/* PREVIEW */}
          <section className="motion-preview">

            <div className="motion-section-heading">
              <h2>Video Preview</h2>
              <span>03 / OUTPUT</span>
            </div>

            <div className="motion-preview-box">
              <div className="motion-placeholder">
                <div className="motion-play-icon">▶</div>
                <h3>Your video will appear here</h3>
                <p>
                  Describe your idea and configure your settings
                  to prepare a video generation.
                </p>
              </div>
            </div>

            <div className="motion-preview-info">
              <div>
                <span>Style</span>
                <strong>{style}</strong>
              </div>

              <div>
                <span>Duration</span>
                <strong>{duration}</strong>
              </div>

              <div>
                <span>Ratio</span>
                <strong>{ratio}</strong>
              </div>
            </div>

          </section>

        </div>

        {/* RECENT GENERATIONS */}
        <section className="motion-history">

          <div className="motion-section-heading">
            <h2>Recent Generations</h2>
            <span>{generations.length} CREATED</span>
          </div>

          {generations.length === 0 ? (
            <p className="motion-empty">
              Your video projects will appear here.
            </p>
          ) : (
            <div className="motion-history-list">
              {generations.map((item) => (
                <div className="motion-history-card" key={item.id}>
                  <div className="motion-history-icon">▶</div>

                  <div>
                    <strong>{item.style} Video</strong>
                    <p>{item.prompt}</p>
                    <span>
                      {item.duration} · {item.ratio} · {item.camera}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default MotionGeneration;
