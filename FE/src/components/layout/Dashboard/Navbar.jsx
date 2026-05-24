function Navbar({ onOpenSidebar }) {
  return (
    <header className="top_navbar">
      <div className="nav_left">
        <button className="menu_btn" onClick={onOpenSidebar}>
          ☰
        </button>
      </div>

      <div className="search_box">
        <input type="text" placeholder="Search your library..." />
      </div>

      <div className="nav_actions">
        <button>＋</button>
        <button>◉</button>
        <button>🔔</button>
        <div className="profile_avatar"></div>
      </div>
    </header>
  );
}

export default Navbar;