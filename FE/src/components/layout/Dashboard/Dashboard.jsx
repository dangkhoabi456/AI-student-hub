import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import "./Dashboard.css";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {isSidebarOpen && (
        <div
          className="sidebar_overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="main_area">
        <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="content">

          <div className="filter_box">
            <input type="text" value="contributed-by:@me" readOnly />
            <button>⌕</button>
          </div>

          <section className="repository_card">
            <div className="repository_card_header">
              <strong>12 repositories</strong>
              <span>Relevance ▾</span>
            </div>

            <RepositoryItem
              name="dangkhoabi456/AI-student-hub"
              language="JavaScript"
              time="Updated 11 hours ago"
            />

            <RepositoryItem
              name="dangkhoabi456/To-do-list"
              language="CSS"
              time="Updated 5 months ago"
            />

            <RepositoryItem
              name="dangkhoabi456/portfolio-webpage"
              language="CSS"
              time="Updated 9 months ago"
            />

            <RepositoryItem
              name="dangkhoabi456/Pokedex"
              language="CSS"
              time="Updated 5 months ago"
            />

            <RepositoryItem
              name="alexnta/smart-home-system"
              language="Java"
              time="Updated on Mar 15"
            />
          </section>

        </main >
      </div >
    </div >
  );
}

function RepositoryItem({ name, language, time }) {
  return (
    <div className="repository_item">
      <div>
        <h3>{name}</h3>

        <div className="repo_meta">
          <span className="language_dot"></span>
          <span>{language}</span>
          <span>☆ 0</span>
          <span>⑂ 0</span>
          <span>{time}</span>
        </div>
      </div>

      <div className="repo_graph"></div>
    </div>
  );
}

export default Dashboard;
