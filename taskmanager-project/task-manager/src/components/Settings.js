import React from "react";

function Settings() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Settings</h2>
                <p style={{ color: "var(--text-muted)", marginTop: "6px" }}>
                    Manage your preferences and account settings
                </p>
            </div>

            <div className="placeholder-content">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m-2 2l-4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m-2-2l-4.2-4.2"></path>
                </svg>
                <h3>Application Settings</h3>
                <p>This page will contain application settings and user preferences.</p>
            </div>
        </div>
    );
}

export default Settings;
