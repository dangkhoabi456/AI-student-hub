import Logo from "../../../assets/logo/Logo.jsx";
function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { icon: "🏠", label: "Home" },
    { icon: "📁", label: "My repositories" },
    { icon: "🔀", label: "Pull requests" },
    { icon: "🧩", label: "Projects" },
    { icon: "💬", label: "Discussions" },
    { icon: "🤖", label: "Copilot" },
  ];

  const topRepositories = [
    "AI-student-hub",
    "To-do-list",
    "portfolio-webpage",
    "Pokedex",
    "smart-home-system",
  ];

  return (
    <aside className={`sidebar ${isOpen ? "sidebar_open" : ""}`}>
      <div className="sidebar_header">
        <Logo />

        <button className="close_btn" onClick={onClose}>
          ×
        </button>
      </div>

      <nav className="sidebar_nav">
        {menuItems.map((item, index) => (
          <a
            href="#"
            className={`sidebar_link ${index === 1 ? "active" : ""}`}
            key={item.label}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar_divider" />

      <div className="top_repo_header">
        <p>Most access storage</p>
        <button>⌕</button>
      </div>

      <div className="repo_list">
        {topRepositories.map((repo) => (
          <a href="#" className="repo_item" key={repo}>
            <span className="avatar"></span>
            <span>{repo}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;