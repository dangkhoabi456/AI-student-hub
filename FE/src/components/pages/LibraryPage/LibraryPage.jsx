import "./LibraryPage.css";
import "../../../assets/icons/themify-icons-font/themify-icons/themify-icons.css";

function LibraryPage() {
  const libraryItems = [
    {
      type: "folder",
      name: "Documents",
      note: "Study materials and uploaded files",
      updatedAt: "5 hours ago",
    },
    {
      type: "folder",
      name: "Summaries",
      note: "AI-generated study summaries",
      updatedAt: "yesterday",
    },
    {
      type: "file",
      name: "Software Engineering Notes.pdf",
      note: "Requirements, design, testing, maintenance",
      updatedAt: "2 days ago",
    },
    {
      type: "file",
      name: "React Hooks Practice.docx",
      note: "useState, useEffect, useRef, useContext",
      updatedAt: "last week",
    },
    {
      type: "file",
      name: "Business Analysis Report.xlsx",
      note: "Practice data and analysis table",
      updatedAt: "last week",
    },
  ];

  const collaborators = [
    {
      name: "dangkhoabi456",
      avatar: "https://github.com/identicons/dangkhoabi456.png",
    },
    {
      name: "TrongBVD",
      avatar: "https://github.com/identicons/TrongBVD.png",
    },
    {
      name: "aikirokito",
      avatar: "https://github.com/identicons/aikirokito.png",
    },
  ];

  return (
    <main className="library_page">
      <section className="library_workspace">
        <section className="library_overview_card">
          <div className="library_overview_left">
            <div className="library_icon">
              <i className="ti-archive"></i>
            </div>

            <div>
              <div className="library_title_row">
                <h1>AI-student-hub</h1>
                <span className="library_status_badge">Public</span>
              </div>

              <p className="library_description">
                A learning library for storing study materials, organizing
                subjects, and using AI to review documents.
              </p>
            </div>
          </div>

          <div className="library_overview_actions">
            <button className="outline_action_btn">
              <i className="ti-star"></i>
              Star
            </button>

            <button className="primary_action_btn">
              <i className="ti-upload"></i>
              Upload
            </button>
          </div>
        </section>

        <nav className="library_tabs">
          <a className="active" href="#">
            Library
          </a>
          <a href="#">Documents</a>
          <a href="#">AI Chat</a>
          <a href="#">Summaries</a>
          <a href="#">Subjects</a>
          <a href="#">Members</a>
          <a href="#">Settings</a>
        </nav>

        <section className="library_body">
          <section className="library_main_panel">
            <div className="library_toolbar">
              <button className="subject_btn">
                <i className="ti-book"></i>
                All subjects ▾
              </button>

              <div className="library_toolbar_right">
                <button className="light_action_btn">Search file</button>
                <button className="light_action_btn">New folder ▾</button>
                <button className="code_action_btn">Upload ▾</button>
              </div>
            </div>

            <div className="library_file_panel">
              <div className="activity_bar">
                <div className="activity_left">
                  <div className="small_avatar"></div>

                  <div>
                    <strong>TrongBVD</strong>
                    <span> updated study materials</span>
                  </div>
                </div>

                <div className="activity_right">
                  <span>Latest activity</span>
                  <span>5 hours ago</span>
                </div>
              </div>

              <div className="library_item_list">
                {libraryItems.map((item, index) => (
                  <div className="library_item_row" key={index}>
                    <div className="library_item_name">
                      <i
                        className={
                          item.type === "folder" ? "ti-folder" : "ti-file"
                        }
                      ></i>
                      <span>{item.name}</span>
                    </div>

                    <div className="library_item_note">{item.note}</div>
                    <div className="library_item_time">{item.updatedAt}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="library_side_panel">
            <div className="side_card">
              <h3>About this library</h3>
              <p>
                This library helps students manage learning resources, upload
                documents, and use AI to summarize or ask questions from files.
              </p>
            </div>

            <div className="side_card">
              <div className="side_title">
                <h3>Collaborators</h3>
                <span>{collaborators.length}</span>
              </div>

              <div className="collaborator_list">
                {collaborators.map((item) => (
                  <div className="collaborator_item" key={item.name}>
                    <img src={item.avatar} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="side_card">
              <h3>Library info</h3>

              <div className="library_info_list">
                <div>
                  <span>Main subject</span>
                  <strong>Software Engineering</strong>
                </div>

                <div>
                  <span>Total files</span>
                  <strong>128</strong>
                </div>

                <div>
                  <span>Last update</span>
                  <strong>5 hours ago</strong>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

export default LibraryPage;