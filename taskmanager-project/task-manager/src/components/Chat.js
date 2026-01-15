// src/components/Chat.js
import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "./Chat.css";

function Chat() {
  const [employees, setEmployees] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [chats, setChats] = useState({}); // { userId: [{text, sender, time}] }
  const [searchText, setSearchText] = useState("");

  const stompClientRef = useRef(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const myEmpKey = loggedInUser?.emp_pkey;

  // Fetch Employees
  useEffect(() => {
    fetch("http://localhost:8080/api/proxy/employees")
      .then((res) => res.json())
      .then((json) => {
        if (json.success === 1) setEmployees(json.data);
        else setEmployees([]);
      })
      .catch((err) => {
        console.error("Failed to load employees", err);
        setEmployees([]);
      });
  }, []);

  // Connect to WebSocket
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws-chat"); // backend endpoint
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");

      // Subscribe to public topic
      client.subscribe("/topic/public", (message) => {
        if (!message.body) return;

        const receivedMessage = JSON.parse(message.body);
        
        // Ignore messages not meant for this user
        if (
          receivedMessage.sender !== myEmpKey &&
          receivedMessage.receiver !== myEmpKey
        ) {
          return;
        }

        // ❗ Ignore own echoed message
        if (receivedMessage.sender === myEmpKey) return;

        // Determine chat partner
        const otherUserId =
          receivedMessage.sender === myEmpKey
            ? receivedMessage.receiver
            : receivedMessage.sender;

        setChats((prev) => ({
          ...prev,
          [otherUserId]: [
            ...(prev[otherUserId] || []),
            {
              text: receivedMessage.content,
              sender: receivedMessage.sender === myEmpKey ? "me" : "them",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        }));
      });
    };

    client.activate();
    stompClientRef.current = client;

    return () => client.deactivate();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedUser) return;

    const message = {
      sender: myEmpKey,
      receiver: selectedUser.emp_pkey,
      content: messageInput,
    };

    // Send via WebSocket
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: "/app/send-message",
        body: JSON.stringify(message),
      });

      // Add message locally
      const userId = selectedUser.emp_pkey;
      setChats((prev) => ({
        ...prev,
        [userId]: [
          ...(prev[userId] || []),
          {
            text: messageInput,
            sender: "me",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      }));

      setMessageInput("");
    } else {
      console.warn("WebSocket is not connected.");
    }
  };

  const currentMessages = selectedUser
    ? chats[selectedUser.emp_pkey] || []
    : [];

  return (
    <div className="chat-container">
      {/* Left Sidebar */}
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">
          <h3>Chats</h3>
        </div>
        <div className="chat-search">
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="contact-list">
          {employees
            .filter((emp) => emp.emp_pkey !== myEmpKey)
            .filter((emp) =>
              emp.EmpName?.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((emp) => (
              <div
                key={emp.emp_pkey}
                className={`contact-item ${
                  selectedUser?.emp_pkey === emp.emp_pkey ? "active" : ""
                }`}
                onClick={() => setSelectedUser(emp)}
              >
                <div className="avatar">
                  {emp.EmpName?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="contact-info">
                  <h4 className="contact-name">{emp.EmpName}</h4>
                  <p className="last-message">Click to start chatting</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <div
                className="avatar"
                style={{ width: 35, height: 35, fontSize: 16 }}
              >
                {selectedUser.EmpName?.charAt(0).toUpperCase() || "?"}
              </div>
              <h4>{selectedUser.EmpName}</h4>
            </div>

            <div className="chat-messages">
              {currentMessages.length === 0 && (
                <p
                  style={{ textAlign: "center", color: "#888", marginTop: 20 }}
                >
                  No messages yet. Say hi to {selectedUser.EmpName}!
                </p>
              )}
              {currentMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${
                    msg.sender === "me" ? "sent" : "received"
                  }`}
                >
                  {msg.text}
                  <span className="message-time">{msg.time}</span>
                </div>
              ))}
            </div>

            <div className="chat-footer">
              <form
                onSubmit={handleSendMessage}
                style={{ display: "flex", width: "100%" }}
              >
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Type a message"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button type="submit" className="send-btn">
                  ➤
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <h2>Task Manager Chat</h2>
            <p>Select a contact to view your conversations.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
