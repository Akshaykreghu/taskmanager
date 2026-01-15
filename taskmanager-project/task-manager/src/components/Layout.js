import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Feed from "./Feed";
import Chat from "./Chat";

// import Messages from "./Messages";

function Layout() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "messages":
        return <Feed />;
      case "chat":
        return <Chat />;
      case "tasks":
        return <Dashboard />; // reuse or new component
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="layout">
      <Navbar />
      <div className="content-area">
        <Sidebar active={page} onNavigate={setPage} />
        <div className="main-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default Layout;
