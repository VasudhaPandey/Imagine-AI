
import React, { useState } from "react";
import "./CreateImage.css";

function CreateImage() {

  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Realistic");
  const [ratio, setRatio] = useState("1:1");
  const [quality, setQuality] = useState("Standard");

  const [reference, setReference] = useState("");
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Upload reference image
  const handleUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setReference(URL.createObjectURL(file));
    }
  };

  // Generate image using Spring Boot API
  const handleGenerate = async () => {

    if (!prompt.trim()) {
      setError("Please enter an image description.");
      return;
    }

    setLoading(true);
    setError("");
    setPreview("");

    try {

      const response = await fetch(
        "http://localhost:8080/api/images/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            prompt: `${prompt}, ${style} style, ${quality} quality, ${ratio} aspect ratio`
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image generation failed");
      }

      if (!data.image || !data.mimeType) {
        throw new Error("Invalid image response from server.");
      }

      setPreview(
        `data:${data.mimeType};base64,${data.image}`
      );

    } catch (err) {

      console.error(err);
      setError(
        err.message || "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // Download generated image
  const handleDownload = () => {

    if (!preview) return;

    const link = document.createElement("a");

    link.href = preview;
    link.download = "ImagineAI-Generated.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (

    <div className="create-page">

      {/* HEADER */}

      <header className="create-header">

        <div>
          <span className="create-logo">✦</span>
          <span className="create-brand">Imagine AI</span>
        </div>

        <button
          className="back-dashboard"
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          ← Dashboard
        </button>

      </header>


     { /* PAGE TITLE */}

      <div className="create-heading">

        <span className="create-label">
          YOUR AI CREATIVE STUDIO
        </span>

        <h1>Create Something Amazing</h1>

        <p>
          Turn your imagination into beautiful AI-generated artwork.
        </p>

      </div>


      {/* MAIN CONTENT */}

      <div className="create-layout">


        {/* LEFT PANEL */}

        <section className="create-form">

          <h2>✦ Describe Your Image</h2>

          <p className="form-subtitle">
            Write a detailed description of your imagination.
          </p>


          {/* PROMPT */}

          <label>Image Description</label>

          <textarea
            className="prompt-input"
            placeholder="Example: A beautiful fantasy castle surrounded by mountains, glowing sunset, cinematic lighting..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />


          {/* STYLE */}

          <label>Choose Image Style</label>

          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="Realistic">Realistic</option>
            <option value="Anime">Anime</option>
            <option value="3D Art">3D Art</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Watercolor">Watercolor</option>
            <option value="Fantasy">Fantasy</option>
          </select>


          {/* ASPECT RATIO */}

          <label>Aspect Ratio</label>

          <select
            value={ratio}
            onChange={(e) => setRatio(e.target.value)}
          >
            <option value="1:1">Square (1:1)</option>
            <option value="16:9">Landscape (16:9)</option>
            <option value="9:16">Portrait (9:16)</option>
            <option value="4:3">Classic (4:3)</option>
          </select>


          {/* QUALITY */}

          <label>Image Quality</label>

          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          >
            <option value="Standard">Standard</option>
            <option value="High">High</option>
            <option value="Ultra">Ultra</option>
          </select>


          {/* UPLOAD */}

          <label>Reference Image (Optional)</label>

          <div className="upload-area">

            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />

            <span>☁ Upload Reference Image</span>

          </div>

          {reference && (
            <img
              src={reference}
              alt="Reference"
              className="reference-preview"
            />
          )}


          {/* ERROR */}

          {error && (
            <p className="create-error">{error}</p>
          )}


          {/* GENERATE BUTTON */}

          <button
            className="create-generate-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating Image..." : "✦ Generate Image"}
          </button>

          {loading && (
            <p className="loading-text">
              Your imagination is becoming reality...
            </p>
          )}

        </section>


        {/* RIGHT PANEL */}

        <section className="preview-panel">

          <h2>Image Preview</h2>

          <p className="form-subtitle">
            Your generated artwork will appear here.
          </p>

          <div className="preview-box">

            {preview ? (

              <img
                src={preview}
                alt="AI Generated"
                className="generated-image"
              />

            ) : (

              <div className="empty-preview">

                <span className="preview-icon">✧</span>

                <h3>Your Canvas Awaits</h3>

                <p>
                  Enter a prompt and click Generate Image
                  to see your artwork here.
                </p>

              </div>

            )}

          </div>

          {preview && (

            <div className="preview-actions">

              <button onClick={handleDownload}>
                ↓ Download Image
              </button>

              <button
                onClick={() => {
                  setPreview("");
                }}
              >
                Generate Another
              </button>

            </div>

          )}

          {preview && (
            <div className="image-details">
              <span>Style: {style}</span>
              <span>Ratio: {ratio}</span>
              <span>Quality: {quality}</span>
            </div>
          )}

        </section>

      </div>

      <footer className="create-footer">
        © 2026 Imagine AI. Create something extraordinary.
      </footer>

    </div>
  );
}

export default CreateImage;
