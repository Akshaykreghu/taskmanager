import React from "react";

function Employees() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Employees</h2>
                <p style={{ color: "var(--text-muted)", marginTop: "6px" }}>
                    Manage your team members
                </p>
            </div>

            <div className="placeholder-content">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <h3>Employee Management</h3>
                <p>This page will display employee information and management tools.</p>
            </div>
        </div>
    );
}

export default Employees;
