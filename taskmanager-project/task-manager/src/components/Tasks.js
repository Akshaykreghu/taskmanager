import React from "react";

function Tasks() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h2>All Tasks</h2>
                <p style={{ color: "var(--text-muted)", marginTop: "6px" }}>
                    View and manage all tasks
                </p>
            </div>

            <div className="placeholder-content">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <h3>Task Management</h3>
                <p>This page will display a detailed task list with filtering and sorting options.</p>
            </div>
        </div>
    );
}

export default Tasks;
