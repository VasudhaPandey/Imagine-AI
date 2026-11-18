
import React, { useState } from "react";
import "./TextureGeneration.css";

function TextureGeneration() {
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("Wood");
  const [style, setStyle] = useState("Realistic");
  const [resolution, setResolution] = useState("1024 × 1024");
  const [seamless, setSeamless] = useState(true);
  const [textures, setTextures] = useState([]);

  const categories = [
    "Wood",
    "Marble",
    "Metal",
    "Fabric",
    "Stone",
    "Concrete",
    "Leather",
    "Nature"
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert("Please describe the texture you want to generate.");
      return;
    }

    const newTexture = {
      id: Date.now(),
      prompt,
      category,
      style,
      resolution,
      seamless
    };

    setTextures((previous) => [newTexture, ...previous]);
    setPrompt("");
  };

  return (
    <div className="texture-page">

      <aside className="texture-sidebar">
        <h2 className="texture-logo">Imagine<span>AI</span></h2>

        <p className="texture-menu-title">WORKSPACE</p>

        <nav className="texture-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/community">Community</a>
          <a href="/prompt-store">Prompt Store</a>
          <a href="/dashboard">Favorites</a>
          <a href="/subscription">Subscription</a>

          <p className="texture-menu-title">CREATE</p>

          <a href="/create-image">Image Generation</a>
          <a href="/dashboard">Canvas Editor</a>
          <a href="/texture-generation" className="active">
            Texture Generation
          </a>
          <a href="/dashboard">Motion Generation</a>

          <p className="texture-menu-title">PREFERENCES</p>
          <a href="/settings">Settings</a>
        </nav>
      </aside>

      <main className="texture-main">

        <header className="texture-header">
          <div>
            <h1>Texture Generation</h1>
            <p>Create unique textures for your creative projects.</p>
          </div>

          <div className="texture-header-badge">
            ✦ AI Studio
          </div>
        </header>

        <section className="texture-hero">
          <div>
            <span className="texture-tag">AI TEXTURE STUDIO</span>
            <h2>Bring surfaces to life.</h2>
            <p>
              Generate beautiful, detailed and realistic textures
              using your imagination.
            </p>
          </div>
          <div className="texture-hero-icon">✧</div>
        </section>

        <div className="texture-workspace">

          <section className="texture-form">

            <div className="texture-section-heading">
              <h2>Create your texture</h2>
              <span>01 / PROMPT</span>
            </div>

            <label>Describe your texture</label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: A luxurious dark walnut wood texture with natural grain details..."
            />

            <div className="texture-section-heading">
              <h3>Choose a category</h3>
              <span>02 / CATEGORY</span>
            </div>

            <div className="texture-categories">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "selected" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="texture-settings-grid">

              <div>
                <label>Surface Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                >
                  <option>Realistic</option>
                  <option>Abstract</option>
                  <option>Minimal</option>
                  <option>Vintage</option>
                  <option>Artistic</option>
                </select>
              </div>

              <div>
                <label>Resolution</label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                >
                  <option>512 × 512</option>
                  <option>1024 × 1024</option>
                  <option>2048 × 2048</option>
                </select>
              </div>

            </div>

            <div className="texture-seamless">
              <div>
                <strong>Seamless Texture</strong>
                <p>Create a repeating texture without visible edges.</p>
              </div>

              <input
                type="checkbox"
                checked={seamless}
                onChange={(e) => setSeamless(e.target.checked)}
              />
            </div>

            <button
              className="texture-generate-btn"
              onClick={handleGenerate}
            >
              ✦ Generate Texture
            </button>

          </section>

          <section className="texture-preview">

            <div className="texture-section-heading">
              <h2>Preview</h2>
              <span>03 / OUTPUT</span>
            </div>

            <div className="texture-preview-box">
              <div className="texture-preview-placeholder">
                <span>✧</span>
                <h3>Your texture will appear here</h3>
                <p>
                  Describe your idea and click Generate Texture
                  to create a new texture.
                </p>
              </div>
            </div>

            <div className="texture-preview-info">
              <div>
                <span>Category</span>
                <strong>{category}</strong>
              </div>
              <div>
                <span>Style</span>
                <strong>{style}</strong>
              </div>
              <div>
                <span>Resolution</span>
                <strong>{resolution}</strong>
              </div>
            </div>

          </section>

        </div>

        <section className="texture-history">
          <div className="texture-section-heading">
            <h2>Recent Textures</h2>
            <span>{textures.length} CREATED</span>
          </div>

          {textures.length === 0 ? (
            <p className="texture-empty">
              Your generated textures will appear here.
            </p>
          ) : (
            <div className="texture-history-list">
              {textures.map((item) => (
                <div className="texture-history-card" key={item.id}>
                  <div className="texture-history-icon">✧</div>
                  <div>
                    <strong>{item.category} Texture</strong>
                    <p>{item.prompt}</p>
                    <span>{item.style} · {item.resolution}</span>
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

export default TextureGeneration;
