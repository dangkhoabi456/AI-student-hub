import { useState } from "react";
import "./PersonalProfilePage.css";
import defaultAvatar from "../../../assets/imgs/default_avatar.png";
function PersonalProfile() {
  const [userName, setUserName] = useState("dangkhoabi456");

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(userName);
  const [avatar, setAvatar] = useState(defaultAvatar);
  function handleChangeAvatar(e) {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
  }

  const repositories = [
    {
      name: "Jurassic-world-the-game-wiki",
      visibility: "Public",
      language: "HTML",
    },
    {
      name: "new-project",
      visibility: "Public",
      language: "JavaScript",
    },
    {
      name: "electron",
      visibility: "Public",
      description: "Build cross-platform desktop apps with JavaScript, HTML, and CSS",
      language: "C++",
    },
    {
      name: "movie-web",
      visibility: "Public",
      language: "HTML",
    },
    {
      name: "auto-job-applier",
      visibility: "Public",
      language: "Python",
    },
    {
      name: "simple-calculator",
      visibility: "Public",
      language: "HTML",
    },
  ];

  function handleSaveName() {
    if (newName.trim() === "") return;

    setUserName(newName);
    setIsEditingName(false);
  }

  function handleCancelEdit() {
    setNewName(userName);
    setIsEditingName(false);
  }

  return (
    <main className="profile_page">
      <aside className="profile_sidebar">
        <label className="profile_main_avatar">
          <img src={avatar} alt="User avatar" />

          <div className="avatar_overlay">
            Change avatar
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleChangeAvatar}
          />
        </label>

        <div className="profile_name_area">
          {isEditingName ? (
            <div className="edit_name_box">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />

              <div className="edit_name_actions">
                <button onClick={handleSaveName}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="profile_name_row">
              <h2>{userName}</h2>
              <h2>{userName}@gmail.com</h2>
              <button
                className="edit_name_btn"
                onClick={() => setIsEditingName(true)}
                title="Edit name"
              >
                ✏️
              </button>
            </div>
          )}
        </div>

        {/* <button className="edit_profile_btn">Edit profile</button>

        <div className="follow_info">
          <span>👥 0 followers</span>
          <span>·</span>
          <span>3 following</span>
        </div>

        <div className="profile_divider" />

        <section className="achievement_section">
          <h3>Achievements</h3>

          <div className="achievement_badge">
            🏆
          </div>
        </section> */}
      </aside>

      <section className="profile_content">
        {/* <div className="profile_tabs">
          <button className="active">Overview</button>
          <button>Repositories <span>29</span></button>
          <button>Projects</button>
          <button>Packages</button>
          <button>Stars <span>7</span></button>
        </div> */}

        <div className="repositories_section">
          <div className="repositories_header">
            <h3>Popular repositories</h3>
            <button>Customize your pins</button>
          </div>

          <div className="repository_grid">
            {repositories.map((repo) => (
              <RepositoryCard key={repo.name} repo={repo} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function RepositoryCard({ repo }) {
  return (
    <div className="repository_profile_card">
      <div className="repo_card_header">
        <h4>{repo.name}</h4>
        <span>{repo.visibility}</span>
      </div>

      {repo.description && (
        <p className="repo_description">{repo.description}</p>
      )}

      <div className="repo_language">
        <span className="language_color"></span>
        <span>{repo.language}</span>
      </div>
    </div>
  );
}

export default PersonalProfile;