
import React, { useState } from "react";
import "./Subscription.css";

function Subscription() {
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("Free");

  const plans = [
    {
      name: "Free",
      monthly: "₹0",
      yearly: "₹0",
      description: "Perfect for exploring AI creativity.",
      features: [
        "5 AI image generations",
        "Basic image quality",
        "Standard generation speed",
        "Access to Prompt Store",
        "Community access"
      ],
      button: "Current Plan",
      recommended: false
    },
    {
      name: "Pro",
      monthly: "₹499",
      yearly: "₹4,999",
      description: "For creators who want more possibilities.",
      features: [
        "200 AI image generations",
        "HD image quality",
        "Faster generation speed",
        "Access to all prompts",
        "Save unlimited favorites",
        "Priority support"
      ],
      button: "Choose Pro",
      recommended: true
    },
    {
      name: "Premium",
      monthly: "₹999",
      yearly: "₹9,999",
      description: "The complete creative experience.",
      features: [
        "Unlimited AI image generations*",
        "Ultra HD image quality",
        "Fastest generation speed",
        "Exclusive premium prompts",
        "Advanced creative tools",
        "Priority support",
        "Early access to new features"
      ],
      button: "Choose Premium",
      recommended: false
    }
  ];

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
  };

  return (
    <div className="subscription-page">

      {/* SIDEBAR */}
      <aside className="subscription-sidebar">

        <div className="subscription-brand">
          <span>✦</span> Imagine AI
        </div>

        <p className="subscription-menu-label">WORKSPACE</p>

        <nav className="subscription-navigation">

          <button onClick={() => window.location.href = "/dashboard"}>
            <span>⌂</span> Dashboard
          </button>

          <button onClick={() => window.location.href = "/community"}>
            <span>◎</span> Community
          </button>

          <button onClick={() => window.location.href = "/prompt-store"}>
            <span>▤</span> Prompt Store
          </button>

          <button onClick={() => window.location.href = "/favorites"}>
            <span>♡</span> Favorites
          </button>

          <button className="subscription-nav-active">
            <span>◇</span> Subscription
          </button>

          <p className="subscription-menu-label">CREATE</p>

          <button onClick={() => window.location.href = "/create-image"}>
            <span>✧</span> Image Generation
          </button>

          <button onClick={() => window.location.href = "/canvas-editor"}>
            <span>▣</span> Canvas Editor
          </button>

          <button onClick={() => window.location.href = "/texture-generation"}>
            <span>◈</span> Texture Generation
          </button>

          <button onClick={() => window.location.href = "/motion-generation"}>
            <span>◉</span> Motion Generation
          </button>

          <p className="subscription-menu-label">PREFERENCES</p>

          <button onClick={() => window.location.href = "/settings"}>
            <span>⚙</span> Settings
          </button>

        </nav>

        <div className="subscription-sidebar-profile">
          <div className="subscription-avatar">V</div>

          <div>
            <strong>Vasudha Pandey</strong>
            <small>{selectedPlan} Plan</small>
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="subscription-main">

        {/* TOPBAR */}
        <header className="subscription-topbar">

          <div>
            <span className="subscription-eyebrow">
              PLANS & PRICING
            </span>

            <h1>Subscription</h1>
          </div>

          <div className="subscription-top-profile">
            <span className="subscription-avatar">V</span>
          </div>

        </header>

        {/* HERO */}
        <section className="subscription-hero">

          <div className="subscription-hero-content">

            <span className="subscription-hero-label">
              ✦ UNLOCK YOUR CREATIVITY
            </span>

            <h2>
              Create more.
              <br />
              Imagine without limits.
            </h2>

            <p>
              Choose a plan that fits your creative journey.
              Get access to more AI generations, powerful tools
              and an enhanced creative experience.
            </p>

          </div>

          <div className="subscription-hero-icon">
            ✧
          </div>

        </section>

        {/* BILLING SWITCH */}
        <section className="subscription-pricing-section">

          <div className="subscription-heading">
            <span className="subscription-eyebrow">
              SIMPLE & TRANSPARENT
            </span>

            <h2>Choose Your Plan</h2>

            <p>
              Start for free and upgrade whenever you need more.
            </p>
          </div>

          <div className="subscription-billing">

            <button
              className={billing === "monthly" ? "billing-active" : ""}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>

            <button
              className={billing === "yearly" ? "billing-active" : ""}
              onClick={() => setBilling("yearly")}
            >
              Yearly
              <span className="billing-save">Save more</span>
            </button>

          </div>

          {/* PLAN CARDS */}
          <div className="subscription-plan-grid">

            {plans.map((plan) => (

              <article
                className={`subscription-plan-card ${
                  plan.recommended ? "recommended-plan" : ""
                }`}
                key={plan.name}
              >

                {plan.recommended && (
                  <div className="recommended-badge">
                    MOST POPULAR
                  </div>
                )}

                <div className="plan-card-top">

                  <h3>{plan.name}</h3>

                  <p>{plan.description}</p>

                  <div className="plan-price">
                    <strong>
                      {billing === "monthly"
                        ? plan.monthly
                        : plan.yearly}
                    </strong>

                    <span>
                      / {plan.name === "Free"
                        ? "forever"
                        : billing === "monthly"
                        ? "month"
                        : "year"}
                    </span>
                  </div>

                  {billing === "yearly" && plan.name !== "Free" && (
                    <small className="yearly-note">
                      Billed annually
                    </small>
                  )}

                </div>

                <div className="plan-divider"></div>

                <div className="plan-features">

                  <h4>What's included</h4>

                  {plan.features.map((feature, index) => (
                    <div className="plan-feature" key={index}>
                      <span>✓</span>
                      <p>{feature}</p>
                    </div>
                  ))}

                </div>

                <button
                  className={`plan-select-button ${
                    plan.recommended ? "pro-select-button" : ""
                  }`}
                  onClick={() => handlePlanSelect(plan.name)}
                  disabled={selectedPlan === plan.name}
                >
                  {selectedPlan === plan.name
                    ? "✓ Selected"
                    : plan.button}
                </button>

              </article>

            ))}

          </div>

          <p className="subscription-disclaimer">
            *Unlimited usage may be subject to fair-use limits.
            Prices and plan features are illustrative and can be changed.
          </p>

        </section>

        {/* SELECTED PLAN */}
        <section className="subscription-current-plan">

          <div className="current-plan-icon">✦</div>

          <div className="current-plan-info">
            <span>YOUR SELECTED PLAN</span>
            <h3>{selectedPlan} Plan</h3>
            <p>
              {selectedPlan === "Free"
                ? "You are currently exploring Imagine AI with the free plan."
                : `You have selected the ${selectedPlan} plan. Payment integration can be added next.`}
            </p>
          </div>

          <span className="current-plan-status">
            {selectedPlan === "Free" ? "Free access" : "Selected"}
          </span>

        </section>

        {/* FOOTER */}
        <footer className="subscription-footer">
          © 2026 Imagine AI · Create beyond imagination.
        </footer>

      </main>

    </div>
  );
}

export default Subscription;
