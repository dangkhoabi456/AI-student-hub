import { useState } from "react";
import "./PersonalProfilePage.css";
import defaultAvatar from "../../../assets/imgs/default_avatar.png";

function PersonalProfile() {
  const [userName, setUserName] = useState("dangkhoabi456");
  const dateOfBirth = new Date("2003-11-19");
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(userName);
  const [avatar, setAvatar] = useState(defaultAvatar);

  const libraries = [
    {
      name: "JavaScript-notes",
      visibility: "Public",
      language: "HTML",
    },
    {
      name: "React-practice",
      visibility: "Public",
      language: "JavaScript",
    },
    {
      name: "Software-engineering",
      visibility: "Public",
      description:
        "Learning materials about requirements, design, testing, and software process models.",
      language: "C++",
    },
    {
      name: "Business-analysis",
      visibility: "Public",
      language: "HTML",
    },
    {
      name: "AI-study-documents",
      visibility: "Public",
      language: "Python",
    },
    {
      name: "Final-exam-review",
      visibility: "Public",
      language: "HTML",
    },
  ];

  function handleChangeAvatar(e) {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
  }

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

          <div className="avatar_overlay">Change avatar</div>

          <input type="file" accept="image/*" onChange={handleChangeAvatar} />
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
              <h2>{dateOfBirth.toDateString()}</h2>

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
      </aside>

      <section className="profile_content">
        <div className="libraries_section">
          <div className="libraries_header">
            <h3>Popular libraries</h3>
            <button>Customize your pins</button>
          </div>

          <div className="library_grid">
            {libraries.map((library) => (
              <LibraryCard key={library.name} library={library} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function LibraryCard({ library }) {
  return (
    <div className="library_profile_card">
      <div className="library_card_header">
        <h4>{library.name}</h4>
        <span>{library.visibility}</span>
      </div>

      {library.description && (
        <p className="library_description">{library.description}</p>
      )}

      <div className="library_language">
        <span className="language_color"></span>
        <span>{library.language}</span>
      </div>
    </div>
  );
}

export default PersonalProfile;