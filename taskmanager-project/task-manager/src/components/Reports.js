import React from "react";

function Reports() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h2>Reports & Analytics</h2>
                <p style={{ color: "var(--text-muted)", marginTop: "6px" }}>
                    View insights and performance metrics
                </p>
            </div>

            <div className="placeholder-content">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="20" x2="12" y2="10"></line>
                    <line x1="18" y1="20" x2="18" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="16"></line>
                </svg>
                <h3>Reports & Analytics</h3>
                <p>This page will display charts, graphs, and performance reports.</p>
            </div>
        </div>
    );
}

export default Reports;
