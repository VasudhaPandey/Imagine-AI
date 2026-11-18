
import React, { useMemo, useState } from "react";
import "./PromptStore.css";

const promptData = [
  {
    id: 1,
    title: "Enchanted Forest",
    category: "Fantasy",
    description: "A magical forest filled with glowing plants and dreamy light.",
    prompt: "An enchanted forest at twilight, glowing mushrooms, magical fireflies, ancient trees, dreamy atmosphere, cinematic lighting, highly detailed fantasy environment.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
    tags: ["Fantasy", "Nature", "Cinematic"],
    level: "Beginner"
  },
  {
    id: 2,
    title: "Golden Hour Portrait",
    category: "Portraits",
    description: "A warm, cinematic portrait with soft golden sunlight.",
    prompt: "A cinematic editorial portrait, warm golden hour sunlight, natural expression, soft background blur, professional photography, realistic skin texture, 85mm lens.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    tags: ["Portrait", "Editorial", "Realistic"],
    level: "Beginner"
  },
  {
    id: 3,
    title: "Future City",
    category: "Architecture",
    description: "A futuristic city skyline with dramatic architectural details.",
    prompt: "A futuristic megacity skyline, elegant architecture, glowing windows, atmospheric haze, dramatic perspective, ultra detailed architectural visualization.",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800",
    tags: ["Architecture", "Sci-Fi", "City"],
    level: "Intermediate"
  },
  {
    id: 4,
    title: "Minimal Product Photography",
    category: "Photography",
    description: "A clean product shot with elegant studio lighting.",
    prompt: "Premium minimalist product photography, a single elegant object on a sculptural pedestal, soft studio lighting, subtle shadows, clean neutral background, luxury commercial campaign.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    tags: ["Product", "Minimal", "Studio"],
    level: "Beginner"
  },
  {
    id: 5,
    title: "Dreamy Ocean",
    category: "Nature",
    description: "A peaceful ocean scene with beautiful atmospheric light.",
    prompt: "A dreamy ocean landscape at sunrise, gentle waves, pastel sky, soft mist, peaceful atmosphere, cinematic nature photography, beautiful natural colors.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800",
    tags: ["Ocean", "Landscape", "Peaceful"],
    level: "Beginner"
  },
  {
    id: 6,
    title: "Abstract 3D Sculpture",
    category: "Digital Art",
    description: "A modern abstract sculpture with striking forms and textures.",
    prompt: "A sophisticated abstract 3D sculpture, flowing geometric forms, smooth reflective materials, soft gradient background, contemporary digital art, studio render.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    tags: ["3D", "Abstract", "Modern"],
    level: "Advanced"
  },
  {
    id: 7,
    title: "Cozy Reading Corner",
    category: "Interiors",
    description: "A warm and comfortable interior design concept.",
    prompt: "A cozy reading corner in a modern home, comfortable armchair, warm table lamp, bookshelves, soft textiles, natural materials, inviting interior photography.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
    tags: ["Interior", "Cozy", "Design"],
    level: "Beginner"
  },
  {
    id: 8,
    title: "Fantasy Castle",
    category: "Fantasy",
    description: "A grand castle surrounded by misty mountains.",
    prompt: "A magnificent fantasy castle on a mountain cliff, dramatic clouds, waterfalls, misty valleys, magical atmosphere, epic fantasy concept art, intricate details.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    tags: ["Castle", "Fantasy", "Landscape"],
    level: "Intermediate"
  }
];

const categories = [
  "All Prompts",
  "Photography",
  "Fantasy",
  "Portraits",
  "Architecture",
  "Nature",
  "Digital Art",
  "Interiors"
];

function PromptStore() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Prompts");
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("Explore");
  const [copiedId, setCopiedId] = useState(null);

  const filteredPrompts = useMemo(() => {
    return promptData.filter((item) => {
      const matchesCategory =
        category === "All Prompts" || item.category === category;

      const matchesFavorite =
        activeTab !== "Favorites" || favorites.includes(item.id);

      const searchText =
        `${item.title} ${item.description} ${item.category} ${item.tags.join(" ")}`
          .toLowerCase();

      return (
        matchesCategory &&
        matchesFavorite &&
        searchText.includes(search.toLowerCase())
      );
    });
  }, [category, search, activeTab, favorites]);

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const copyPrompt = async (item) => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopiedId(item.id);
    } catch {
      setCopiedId(null);
      window.prompt("Copy this prompt:", item.prompt);
    }
  };

  // Save selected prompt and open Image Generation page
  const handleUsePrompt = (item) => {
    sessionStorage.setItem("selectedPrompt", item.prompt);
    window.location.href = "/create-image";
  };

  return (
    <div className="prompt-store-page">

      {/* SIDEBAR */}
      <aside className="prompt-sidebar">
        <div className="prompt-brand">
          <span>✦</span> Imagine AI
        </div>

        <p className="prompt-menu-label">WORKSPACE</p>

        <nav className="prompt-navigation">
          <button onClick={() => window.location.href = "/dashboard"}>
            <span>⌂</span> Dashboard
          </button>

          <button onClick={() => window.location.href = "/community"}>
            <span>◎</span> Community
          </button>

          <button className="prompt-nav-active">
            <span>▤</span> Prompt Store
          </button>

          <button onClick={() => window.location.href = "/favorites"}>
            <span>♡</span> Favorites
          </button>

          <button onClick={() => window.location.href = "/subscription"}>
            <span>◇</span> Subscription
          </button>

          <p className="prompt-menu-label">CREATE</p>

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

          <p className="prompt-menu-label">PREFERENCES</p>

          <button onClick={() => window.location.href = "/settings"}>
            <span>⚙</span> Settings
          </button>
        </nav>

        <div className="prompt-sidebar-profile">
          <div className="prompt-user-avatar">V</div>
          <div>
            <strong>Vasudha Pandey</strong>
            <small>Free Plan</small>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="prompt-main">

        <header className="prompt-topbar">
          <div>
            <span className="prompt-eyebrow">
              DISCOVER YOUR NEXT IDEA
            </span>
            <h1>Prompt Store</h1>
          </div>

          <div className="prompt-topbar-right">
            <div className="prompt-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search prompts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="prompt-user-avatar">V</div>
          </div>
        </header>

        {/* HERO */}
        <section className="prompt-hero">
          <div className="prompt-hero-content">
            <span>✦ THE PROMPT LIBRARY</span>

            <h2>
              Find the words.
              <br />
              Create the extraordinary.
            </h2>

            <p>
              Explore creative prompts, discover new styles and turn
              your ideas into stunning AI artwork.
            </p>

            <button onClick={() => window.location.href = "/create-image"}>
              Start Creating <span>→</span>
            </button>
          </div>

          <div className="prompt-hero-decoration">✧</div>
        </section>

        {/* FEATURE STRIP */}
        <section className="prompt-feature-strip">
          <div>
            <strong>{promptData.length}</strong>
            <span>Creative prompts</span>
          </div>

          <div>
            <strong>{categories.length - 1}</strong>
            <span>Categories</span>
          </div>

          <div>
            <strong>{favorites.length}</strong>
            <span>Your favorites</span>
          </div>
        </section>

        {/* TABS AND FILTERS */}
        <section className="prompt-library-section">

          <div className="prompt-section-heading">
            <div>
              <span className="prompt-eyebrow">
                EXPLORE COLLECTIONS
              </span>
              <h2>Discover Prompts</h2>
            </div>

            <div className="prompt-tabs">
              <button
                className={
                  activeTab === "Explore" ? "prompt-tab-active" : ""
                }
                onClick={() => setActiveTab("Explore")}
              >
                Explore
              </button>

              <button
                className={
                  activeTab === "Favorites" ? "prompt-tab-active" : ""
                }
                onClick={() => setActiveTab("Favorites")}
              >
                ♡ Favorites
              </button>
            </div>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="prompt-category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item ? "prompt-category-active" : ""
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* RESULTS HEADING */}
          <div className="prompt-results-heading">
            <h3>
              {activeTab === "Favorites" ? "Your Favorites" : category}
            </h3>

            <span>{filteredPrompts.length} prompts</span>
          </div>

          {/* PROMPT CARDS */}
          <div className="prompt-grid">
            {filteredPrompts.map((item) => (
              <article className="prompt-card" key={item.id}>

                <div className="prompt-card-image">
                  <img src={item.image} alt={item.title} />

                  <span className="prompt-card-category">
                    {item.category}
                  </span>

                  <button
                    className={`prompt-favorite-button ${
                      favorites.includes(item.id) ? "is-favorite" : ""
                    }`}
                    onClick={() => toggleFavorite(item.id)}
                    aria-label="Toggle favorite"
                  >
                    {favorites.includes(item.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="prompt-card-content">

                  <div className="prompt-card-title-row">
                    <h3>{item.title}</h3>
                    <span>{item.level}</span>
                  </div>

                  <p>{item.description}</p>

                  <div className="prompt-card-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>

                  <div className="prompt-card-actions">
                    <button
                      className="prompt-use-button"
                      onClick={() => handleUsePrompt(item)}
                    >
                      Use Prompt <span>→</span>
                    </button>

                    <button
                      className="prompt-copy-button"
                      onClick={() => copyPrompt(item)}
                    >
                      {copiedId === item.id ? "Copied ✓" : "Copy"}
                    </button>
                  </div>

                </div>
              </article>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredPrompts.length === 0 && (
            <div className="prompt-empty-state">
              <span>✧</span>
              <h3>No prompts found</h3>
              <p>
                Try another search or select a different category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All Prompts");
                  setActiveTab("Explore");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

        </section>

        {/* FOOTER */}
        <footer className="prompt-footer">
          © 2026 Imagine AI · Your ideas, your imagination.
        </footer>

      </main>
    </div>
  );
}

export default PromptStore;
