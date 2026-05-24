import { useState } from "react";
import "./CreateLibraryPage.css";

function CreateLibraryPage() {
  const [libraryName, setLibraryName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");

  function handleCreateLibrary(e) {
    e.preventDefault();

    if (libraryName.trim() === "") {
      alert("Please enter library name");
      return;
    }

    const newLibrary = {
      owner: "dangkhoabi456",
      libraryName,
      description,
      visibility,
    };

    console.log("New library:", newLibrary);
    alert("Library created successfully!");
  }

  return (
    <main className="create_library_page">
      <section className="create_library_container">
        <div className="create_library_header">
          <h1>Create a new library</h1>
          <p>
            A library contains your study files, documents, notes, and learning
            materials.
          </p>
        </div>

        <form className="create_library_form" onSubmit={handleCreateLibrary}>
          <div className="form_section">
            <h2>General information</h2>

            <div className="library_name_row">
              <div className="form_group owner_group">
                <label>Owner *</label>

                <button type="button" className="owner_btn">
                  <span className="owner_avatar"></span>
                  <span>dangkhoabi456</span>
                  <span>▾</span>
                </button>

                <p className="library_hint">
                  The person who set the foundation.
                </p>
              </div>

              <div className="form_group library_name_group">
                <label>Library name *</label>

                <input
                  type="text"
                  value={libraryName}
                  onChange={(e) => setLibraryName(e.target.value)}
                  placeholder="Enter library name"
                />
              </div>
            </div>

            <p className="library_hint">
              Great library names are short and memorable.
            </p>

            <div className="form_group">
              <label>Description</label>

              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a short description"
              />

              <p className="character_count">
                {description.length} / 350 characters
              </p>
            </div>
          </div>

          <div className="form_section">
            <h2>Visibility</h2>

            <div className="visibility_options">
              <label
                className={`visibility_card ${
                  visibility === "public" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={(e) => setVisibility(e.target.value)}
                />

                <div>
                  <h3>Public</h3>
                  <p>Anyone can see this library.</p>
                </div>
              </label>

              <label
                className={`visibility_card ${
                  visibility === "private" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={(e) => setVisibility(e.target.value)}
                />

                <div>
                  <h3>Private</h3>
                  <p>You choose who can see this library.</p>
                </div>
              </label>
            </div>
          </div>

          <div className="create_library_actions">
            <button type="submit" className="create_library_btn">
              Create library
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateLibraryPage;