import React from "react";

function Sidebar({ active, onNavigate }) {
  return (
    <div className="sidebar">
      <ul>
        <li
          className={active === "dashboard" ? "active" : ""}
          onClick={() => onNavigate("dashboard")}
        >
          Dashboard
        </li>
        <li
          className={active === "messages" ? "active" : ""}
          onClick={() => onNavigate("messages")}
        >
          Feed
        </li>
        <li
          className={active === "chat" ? "active" : ""}
          onClick={() => onNavigate("chat")}
        >
          Chat
        </li>
        {/* <li
          className={active === "tasks" ? "active" : ""}
          onClick={() => onNavigate("tasks")}
        >
          Tasks
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
