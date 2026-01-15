import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function AddTimeModal({ task, onClose, onSaved }) {
  // const getNow = () => new Date().toISOString().slice(0, 16);
  const getNow = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};


  const [startTime, setStartTime] = useState(getNow());
  const [endTime, setEndTime] = useState(getNow());
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = Math.floor((end - start) / 60000);
    setDuration(diff > 0 ? diff : 0);
  }, [startTime, endTime]);

 const saveTime = async () => {
  if (duration <= 0) {
    alert("End time must be after start time");
    return;
  }

  const payload = {
    empFkey: task.assignee.employeeId,
    taskFkey: task.id,
    startTime: startTime,       // "yyyy-MM-ddTHH:mm"
    endTime: endTime,
    durationMinutes: duration
  };


  try {
    const response = await fetch(
      "http://localhost:8080/api/emp_task_time",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    console.log(response,'response');

    if (!response.ok) {
      throw new Error("Save failed");
    }

    onSaved();
    onClose();
  } catch (err) {
    console.error(err);
    alert("Failed to save time entry");
  }
};


  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Add Time</h3>

        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <label>Duration (minutes)</label>
        <input type="number" value={duration} readOnly />

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={saveTime}>Save</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default AddTimeModal;
