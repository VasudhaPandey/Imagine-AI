
import React, { useState } from "react";
import "./Community.css";

function Community() {
  const [activeTab, setActiveTab] = useState("For You");
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState([]);
  const [saved, setSaved] = useState([]);
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const posts = [
    {
      id: 1,
      creator: "Sophia Williams",
      username: "@sophia.creates",
      avatar: "S",
      time: "2 hours ago",
      title: "A World Beyond Dreams ✨",
      description:
        "Exploring a magical world where nature meets fantasy. Created with Imagine AI.",
      image:
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1000",
      category: "Fantasy",
      tags: ["Fantasy", "Dreamscape", "AIArt"],
      likes: 1240,
      commentCount: 28
    },
    {
      id: 2,
      creator: "Alex Morgan",
      username: "@alex.visuals",
      avatar: "A",
      time: "4 hours ago",
      title: "Into the Mountains 🏔️",
      description:
        "Sometimes the best inspiration comes from the quietest places.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000",
      category: "Photography",
      tags: ["Mountains", "Nature", "Landscape"],
      likes: 856,
      commentCount: 16
    },
    {
      id: 3,
      creator: "Pixel Studio",
      username: "@pixel.studio",
      avatar: "P",
      time: "Yesterday",
      title: "The Future Is Neon",
      description:
        "A futuristic city concept with vibrant lights and a cyberpunk atmosphere.",
      image:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1000",
      category: "Digital Art",
      tags: ["Cyberpunk", "DigitalArt", "Future"],
      likes: 2100,
      commentCount: 54
    },
    {
      id: 4,
      creator: "Luna Creates",
      username: "@luna.art",
      avatar: "L",
      time: "Yesterday",
      title: "Ocean of Serenity 🌊",
      description:
        "A little reminder to slow down and enjoy the beauty around us.",
      image:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1000",
      category: "Nature",
      tags: ["Ocean", "Peace", "Nature"],
      likes: 1630,
      commentCount: 39
    }
  ];

  const creators = [
    { name: "Sophia Williams", username: "@sophia.creates", avatar: "S" },
    { name: "Pixel Studio", username: "@pixel.studio", avatar: "P" },
    { name: "Alex Morgan", username: "@alex.visuals", avatar: "A" }
  ];

  const trendingTags = [
    "#AIArt",
    "#FantasyWorld",
    "#DigitalCreation",
    "#Dreamscape",
    "#ImagineAI"
  ];

  const toggleLike = (id) => {
    setLiked((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleSave = (id) => {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const handleComment = (id) => {
    const value = commentInputs[id]?.trim();
    if (!value) return;

    setComments((previous) => ({
      ...previous,
      [id]: [...(previous[id] || []), value]
    }));

    setCommentInputs((previous) => ({
      ...previous,
      [id]: ""
    }));
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeFilter === "All" || post.category === activeFilter;

    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.creator.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const navigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="community-layout">

      {/* LEFT SIDEBAR */}
      <aside className="community-sidebar">

        <div className="community-brand">
          <span>✦</span>
          Imagine AI
        </div>

        <p className="community-menu-label">WORKSPACE</p>

        <nav className="community-navigation">

          <button onClick={() => navigate("/dashboard")}>
            <span>⌂</span> Dashboard
          </button>

          <button className="community-nav-active">
            <span>◎</span> Community
          </button>

          <button onClick={() => navigate("/prompt-store")}>
            <span>▤</span> Prompt Store
          </button>

          <button onClick={() => navigate("/favorites")}>
            <span>♡</span> Favorites
          </button>

          <button onClick={() => navigate("/subscription")}>
            <span>◇</span> Subscription
          </button>

          <p className="community-menu-label">CREATE</p>

          <button onClick={() => navigate("/create-image")}>
            <span>✧</span> Image Generation
          </button>

          <button onClick={() => navigate("/canvas-editor")}>
            <span>▣</span> Canvas Editor
          </button>

          <button onClick={() => navigate("/texture-generation")}>
            <span>◈</span> Texture Generation
          </button>

          <button onClick={() => navigate("/motion-generation")}>
            <span>◉</span> Motion Generation
          </button>

          <p className="community-menu-label">PREFERENCES</p>

          <button onClick={() => navigate("/settings")}>
            <span>⚙</span> Settings
          </button>

        </nav>

        <div className="community-sidebar-profile">
          <div className="community-my-avatar">V</div>
          <div>
            <strong>Vasudha Pandey</strong>
            <small>Free Plan</small>
          </div>
        </div>

      </aside>

      {/* CENTER FEED */}
      <main className="community-feed">

        <header className="community-header">
          <div>
            <span>YOUR CREATIVE SPACE</span>
            <h1>Community</h1>
          </div>

          <div className="community-header-actions">
            <input
              type="text"
              placeholder="Search creators or artwork..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="community-header-avatar">V</div>
          </div>
        </header>

        {/* WELCOME BANNER */}
        <section className="community-welcome">
          <div>
            <span>✦ IMAGINE. CREATE. CONNECT.</span>
            <h2>Your imagination belongs here.</h2>
            <p>
              Share your creations, meet artists and discover
              new inspiration every day.
            </p>

            <button
              onClick={() => navigate("/create-image")}
            >
              Create Artwork <span>→</span>
            </button>
          </div>

          <div className="community-welcome-art">✦</div>
        </section>

        {/* CREATE POST */}
        <section className="community-create-post">
          <div className="community-my-avatar">V</div>

          <button
            className="community-post-placeholder"
            onClick={() => navigate("/create-image")}
          >
            Share something creative with the community...
          </button>

          <button
            className="community-post-create-btn"
            onClick={() => navigate("/create-image")}
          >
            + Create
          </button>
        </section>

        {/* FEED TABS */}
        <div className="community-feed-tabs">
          {["For You", "Following", "Trending"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "feed-tab-active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CATEGORY FILTERS */}
        <div className="community-category-filters">
          {["All", "Digital Art", "Photography", "Fantasy", "Nature"].map(
            (filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter ? "category-active" : ""
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* POSTS */}
        <section className="community-post-feed">

          {filteredPosts.length === 0 && (
            <div className="community-no-posts">
              <h3>No creations found</h3>
              <p>Try a different search or category.</p>
            </div>
          )}

          {filteredPosts.map((post) => (

            <article className="social-post" key={post.id}>

              <div className="social-post-header">

                <div className="social-creator-avatar">
                  {post.avatar}
                </div>

                <div className="social-creator-details">
                  <strong>{post.creator}</strong>
                  <span>{post.username} · {post.time}</span>
                </div>

                <button className="social-more">•••</button>

              </div>

              <div className="social-post-description">
                <h3>{post.title}</h3>
                <p>{post.description}</p>

                <div className="social-tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </div>

              <div className="social-artwork">
                <img src={post.image} alt={post.title} />
              </div>

              <div className="social-post-stats">
                <span>♥ {(
                  post.likes + (liked.includes(post.id) ? 1 : 0)
                ).toLocaleString("en-US")} likes</span>

                <span>
                  {post.commentCount + (comments[post.id]?.length || 0)} comments
                </span>
              </div>

              <div className="social-post-actions">

                <button
                  className={liked.includes(post.id) ? "action-liked" : ""}
                  onClick={() => toggleLike(post.id)}
                >
                  {liked.includes(post.id) ? "♥" : "♡"} Like
                </button>

                <button
                  onClick={() =>
                    document.getElementById(`comment-${post.id}`)?.focus()
                  }
                >
                  ♧ Comment
                </button>

                <button
                  onClick={() =>
                    navigator.clipboard?.writeText(window.location.href)
                  }
                >
                  ↗ Share
                </button>

                <button
                  className={saved.includes(post.id) ? "action-saved" : ""}
                  onClick={() => toggleSave(post.id)}
                >
                  {saved.includes(post.id) ? "♥ Saved" : "♧ Save"}
                </button>

              </div>

              <div className="social-comment-box">
                <div className="community-my-avatar">V</div>

                <input
                  id={`comment-${post.id}`}
                  type="text"
                  placeholder="Write a comment..."
                  value={commentInputs[post.id] || ""}
                  onChange={(e) =>
                    setCommentInputs((previous) => ({
                      ...previous,
                      [post.id]: e.target.value
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleComment(post.id);
                  }}
                />

                <button onClick={() => handleComment(post.id)}>
                  Post
                </button>
              </div>

              {(comments[post.id] || []).map((comment, index) => (
                <div className="community-new-comment" key={index}>
                  <strong>You</strong>
                  <span>{comment}</span>
                </div>
              ))}

            </article>

          ))}

        </section>

        <footer className="community-feed-footer">
          © 2026 Imagine AI · Create and inspire.
        </footer>

      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="community-right-sidebar">

        <div className="right-sidebar-heading">
          <h2>Discover</h2>
          <span>✦</span>
        </div>

        {/* TRENDING */}
        <section className="right-sidebar-card">
          <div className="right-card-heading">
            <h3>Trending Topics</h3>
            <span>↗</span>
          </div>

          {trendingTags.map((tag, index) => (
            <div className="trending-tag" key={tag}>
              <div>
                <small>#{index + 1} TRENDING</small>
                <strong>{tag}</strong>
              </div>
              <span>✧</span>
            </div>
          ))}
        </section>

        {/* CREATORS */}
        <section className="right-sidebar-card">
          <div className="right-card-heading">
            <h3>Popular Creators</h3>
            <span>✦</span>
          </div>

          {creators.map((creator) => (
            <div className="popular-creator" key={creator.username}>
              <div className="social-creator-avatar">
                {creator.avatar}
              </div>

              <div className="popular-creator-details">
                <strong>{creator.name}</strong>
                <span>{creator.username}</span>
              </div>

              <button
                onClick={(e) => {
                  e.currentTarget.textContent =
                    e.currentTarget.textContent === "Following"
                      ? "Follow"
                      : "Following";
                }}
              >
                Follow
              </button>
            </div>
          ))}
        </section>

        {/* COMMUNITY INFO */}
        <section className="community-guidelines">
          <span>✦</span>
          <h3>Creativity is better together.</h3>
          <p>
            Be kind, share your imagination and inspire
            other creators.
          </p>
          <button>Community Guidelines</button>
        </section>

        <div className="community-right-footer">
          About · Guidelines · Privacy
          <p>© 2026 Imagine AI</p>
        </div>

      </aside>

    </div>
  );
}

export default Community;
