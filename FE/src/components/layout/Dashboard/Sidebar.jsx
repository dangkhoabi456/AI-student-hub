import Logo from "../../../assets/logo/Logo.jsx";
import "../../../assets/icons/themify-icons-font/themify-icons/themify-icons.css";

function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { icon: "ti-home", label: "Home" },
    { icon: "ti-folder", label: "My libraries" },
    { icon: "ti-upload", label: "Uploads" },
    { icon: "ti-book", label: "Subjects" },
    { icon: "ti-comments", label: "AI Chat" },
    { icon: "ti-settings", label: "Settings" },
  ];

  const topLibraries = [
    "AI-student-hub",
    "JavaScript-notes",
    "Software-engineering",
    "Business-analysis",
    "Final-exam-review",
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
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar_divider" />

      <div className="top_library_header">
        <p>Most accessed libraries</p>
        <button>⌕</button>
      </div>

      <div className="library_shortcut_list">
        {topLibraries.map((library) => (
          <a href="#" className="library_shortcut_item" key={library}>
            <i className="ti-archive"></i>
            <span>{library}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;