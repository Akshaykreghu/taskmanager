import React, { useState, useEffect } from "react";

function TaskModal({ onClose, onTaskCreated }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [employees, setEmployees] = useState([]);

  // Load employees for dropdown
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/employees")
  //     .then(res => res.json())
  //     .then(data => setEmployees(data));
  // }, []);

  useEffect(() => {
  fetch(
    "https://v1.mypayrollmaster.online/api/v2qa/employees_list?user_id=GLET100056"
  )
    .then(res => res.json())
    .then(json => {
      if (json.success === 1) {
        setEmployees(json.data);
      } else {
        setEmployees([]);
      }
    })
    .catch(err => {
      console.error("Failed to load employees", err);
      setEmployees([]);
    });
}, []);


//   const handleSave = async () => {
//   // Format deadline for MySQL DATETIME: 'YYYY-MM-DD HH:MM:SS'
// //   const formattedDeadline = deadline ? deadline.replace("T", " ") + ":00" : null;

//   // Match column names in MySQL
//   const taskData = {
//     task_name: taskName,
//     description: description,
//     assignee_id: assigneeId ? Number(assigneeId) : null,
//     deadline: deadline,
//     // created_date: "",
//     // status: "PENDING"
//   };

//   try {
//     const response = await fetch("http://localhost:8080/api/tasks", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(taskData),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Failed to save task:", errorText);
//       alert("Failed to save task. See console for details.");
//       return;
//     }

//     onTaskCreated();
//     onClose();
//   } catch (err) {
//     console.error("Error saving task:", err);
//     alert("An error occurred while saving the task.");
//   }
// };

const handleSave = async () => {

  // find selected employee object
  const selectedEmployee = employees.find(
    emp => String(emp.emp_pkey) === String(assigneeId)
  );


  
  const taskData = {
    task_name: taskName,
    description: description,
    assignee_id: assigneeId ? Number(assigneeId) : null,
    EmpName: selectedEmployee ? selectedEmployee.EmpName : "",
    deadline: deadline
  };

 

  try {
    const response = await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to save task:", errorText);
      alert("Failed to save task. See console for details.");
      return;
    }

    onTaskCreated();
    onClose();
  } catch (err) {
    console.error("Error saving task:", err);
    alert("An error occurred while saving the task.");
  }
};


  return (
    <div className="modal">
      <div className="modal-box">
        <h3>Create New Task</h3>

        <input
          placeholder="Task Name"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="datetime-local"
          step="1"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />

       <select value={assigneeId} onChange={e => setAssigneeId(e.target.value)}>
  <option value="">Select Assignee</option>
  {employees.map(emp => (
    <option key={emp.emp_pkey} value={emp.emp_pkey}>
      {emp.EmpName}
    </option>
  ))}
</select>


        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save Task</button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
