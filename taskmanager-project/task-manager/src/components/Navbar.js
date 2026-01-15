import React from "react";

function Navbar() {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const employeeName = user?.employee_name || "Employee";

  // If profile_pic exists use it, else use default image
  const profileImage =
    user?.profile_pic && user.profile_pic !== ""
      ? user.profile_pic
      : "istockphoto-2132177453-170667a.jpg"; // put image in public folder

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h3>Task Manager</h3>
      </div>

      <div className="navbar-right">
        <span className="profile-name">{employeeName}</span>
        <img
          src={profileImage}
          alt="profile"
          className="profile-pic"
          onError={(e) => {
            e.target.src = "istockphoto-2132177453-170667a.jpg";
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;
