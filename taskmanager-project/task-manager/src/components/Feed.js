import React, { useState, useEffect } from "react";
import "../styles/Feed.css";

function Feed() {
  const [message, setMessage] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([
    { id: "all", name: "All employees" }
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(
          "https://v1.mypayrollmaster.online/api/v2qa/employees_list?user_id=GLET100056"
        );
        const json = await res.json();

        if (json.success === 1 && Array.isArray(json.data)) {
          const normalized = json.data
            .map(emp => ({
              id: emp.emp_pkey,
              fullName: emp.EmpName?.trim()
            }))
            .filter(emp => emp.fullName && emp.fullName !== "");

          setEmployees(normalized);
        } else {
          setEmployees([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, []);

  // Add recipient
  const addRecipient = (emp) => {
    if (emp.id === "all") {
      setSelectedRecipients([{ id: "all", name: "All employees" }]);
    } else {
      const filtered = selectedRecipients.filter(r => r.id !== "all");
      if (!filtered.find(r => r.id === emp.id)) {
        setSelectedRecipients([...filtered, { id: emp.id, name: emp.fullName }]);
      }
    }
    setSearchTerm("");
    setShowDropdown(false);
  };

  // Remove recipient
  const removeRecipient = (id) => {
    const updated = selectedRecipients.filter(r => r.id !== id);
    if (updated.length === 0) {
      updated.push({ id: "all", name: "All employees" });
    }
    setSelectedRecipients(updated);
  };

  // Filter employees
  const filteredEmployees = employees.filter(emp =>
    emp.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission
  const handleSend = async () => {
    if (!message.trim()) return;

    const recipientType = selectedRecipients.some(r => r.id === "all") ? "ALL" : "SELECTED";
    const recipientIds = recipientType === "SELECTED" ? selectedRecipients.map(r => parseInt(r.id)) : [];

    const payload = {
      message,
      recipientType,
      recipientIds
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/feeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (json.success) {
        alert("Feed sent successfully!");
        setMessage("");
        setSelectedRecipients([{ id: "all", name: "All employees" }]);
      } else {
        alert("Failed to send feed.");
      }
    } catch (err) {
      console.error("Send error:", err);
      alert("Error sending feed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bitrix-feed-container">
      {showDropdown && (
        <div className="dropdown-overlay" onClick={() => setShowDropdown(false)} />
      )}

      <div className="bitrix-composer">
        <div className="composer-tabs">
          <button className="tab active">Message</button>
        </div>

        <div className="composer-content">
          <textarea
            className="composer-textarea"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="recipient-row">
            <span className="to-label">To:</span>
            <div className="recipient-pills">
              {selectedRecipients.map(r => (
                <span key={r.id} className={`pill ${r.id === 'all' ? 'all-pill' : ''}`}>
                  {r.name}
                  <button className="remove-pill" onClick={() => removeRecipient(r.id)}>×</button>
                </span>
              ))}

              <div className="add-recipient-wrapper">
                <input
                  type="text"
                  className="recipient-input"
                  placeholder="Add persons..."
                  value={searchTerm}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onMouseDown={(e) => e.stopPropagation()}
                />

                {showDropdown && (
                  <div className="recipient-dropdown" onClick={e => e.stopPropagation()}>
                    <div
                      className="dropdown-item all"
                      onClick={() => addRecipient({ id: 'all', fullName: 'All employees' })}
                    >
                      <strong>All employees</strong>
                    </div>

                    {filteredEmployees.length === 0 ? (
                      <div className="dropdown-item no-results">No employees found</div>
                    ) : (
                      filteredEmployees.map(emp => (
                        <div
                          key={emp.id}
                          className="dropdown-item"
                          onClick={() => addRecipient(emp)}
                        >
                          <div className="user-icon">{emp.fullName.charAt(0).toUpperCase()}</div>
                          {emp.fullName}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="composer-footer">
          <button
            className="send-button"
            disabled={!message.trim() || loading}
            onClick={handleSend}
          >
            {loading ? "Sending..." : "SEND"}
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              setMessage("");
              setSelectedRecipients([{ id: "all", name: "All employees" }]);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feed;
