import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Dashboard.css";
import LibraryPage from "../../pages/LibraryPage/LibraryPage.jsx";

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
          <LibraryPage />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

