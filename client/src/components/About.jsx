
import React from "react";
import "./About.css";

function About() {
  const features = [
    {
      icon: "✦",
      title: "AI Image Generation",
      description:
        "Turn simple text descriptions into beautiful, detailed images using AI."
    },
    {
      icon: "◈",
      title: "Creative Canvas",
      description:
        "Edit your designs, add elements, customize images and bring your ideas together."
    },
    {
      icon: "▧",
      title: "Texture Creation",
      description:
        "Generate unique textures and realistic surfaces for your creative projects."
    },
    {
      icon: "▶",
      title: "Motion Generation",
      description:
        "Transform creative concepts into dynamic motion and video experiences."
    }
  ];

  return (
    <section className="about-section" id="about">

      <div className="about-container">

        {/* SECTION INTRO */}
        <div className="about-heading">
          <span className="about-label">ABOUT IMAGINE AI</span>

          <h2>
            Creativity meets
            <span> Artificial Intelligence.</span>
          </h2>

          <p>
            Imagine AI is a creative platform designed to turn your
            imagination into digital experiences. From generating
            stunning visuals to editing designs and creating motion,
            everything you need to explore your creativity comes
            together in one place.
          </p>
        </div>

        {/* ABOUT CONTENT */}
        <div className="about-content">

          <div className="about-visual">
            <div className="about-visual-glow"></div>

            <div className="about-main-card">
              <span className="about-star">✦</span>

              <h3>Imagine it.</h3>
              <h3 className="about-purple-text">Create it.</h3>

              <p>
                Your ideas deserve more than imagination.
                Give them a visual form.
              </p>

              <div className="about-decoration">
                <span>✧</span>
                <span>✦</span>
                <span>◈</span>
                <span>✧</span>
              </div>
            </div>

            <div className="about-floating-card">
              <span>✦</span>
              Powered by creativity
            </div>
          </div>

          <div className="about-details">

            <span className="about-small-label">
              ONE PLATFORM. ENDLESS POSSIBILITIES.
            </span>

            <h3>
              Everything you need to
              <span> create without limits.</span>
            </h3>

            <p>
              Whether you're exploring digital art, designing
              creative projects or experimenting with AI-generated
              content, Imagine AI gives you tools to make the
              process simpler and more exciting.
            </p>

            <div className="about-feature-grid">

              {features.map((feature, index) => (
                <div className="about-feature" key={index}>
                  <div className="about-feature-icon">
                    {feature.icon}
                  </div>

                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}

            </div>

            <a href="/signup" className="about-cta">
              Start Creating <span>→</span>
            </a>

          </div>

        </div>

        {/* BOTTOM MESSAGE */}
        <div className="about-bottom">
          <h3>
            Your imagination is the starting point.
          </h3>

          <p>
            Let technology help you bring it to life.
          </p>
        </div>

      </div>

    </section>
  );
}

export default About;
