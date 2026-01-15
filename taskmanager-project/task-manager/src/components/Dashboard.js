import React, { useEffect, useState } from "react";
import TaskModal from "./TaskModal";
import TaskDetails from "./TaskDetails";


function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [user, setUser] = useState(null);

  

  // const employeeName = "Athira"; // replace with dynamic value later



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loadTasks = () => {
    fetch("http://localhost:8080/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const employeeName = user?.employee_name || "Employee";
  
  const loggedInUserId = user?.emp_pkey;

const assignedTasks = tasks.filter(
  task => Number(task.assigneeId) === Number(loggedInUserId)
);


const pendingCount = assignedTasks.filter(t => t.status === "PENDING").length;
const progressCount = assignedTasks.filter(t => t.status === "IN_PROGRESS").length;
const completedCount = assignedTasks.filter(t => t.status === "COMPLETED").length;


  return (
    
    <div className="dashboard">

      {/* Header */}
      <div className="header">
        <div>
          <h2>Welcome, {employeeName} 👋</h2>
          <p style={{ color: "var(--text-muted)", marginTop: "6px" }}>
              Here’s an overview of your tasks
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="card-container">
        <div className="card pending">
          <h4>Pending</h4>
          <p>{pendingCount}</p>
        </div>

        <div className="card progress">
          <h4>In Progress</h4>
          <p>{progressCount}</p>
        </div>

        <div className="card completed">
          <h4>Completed</h4>
          <p>{completedCount}</p>
        </div>
      </div>

      {/* Task Section */}
      <div className="section-header">
        <h3>Tasks</h3>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Create Task
        </button>
      </div>

      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          onTaskCreated={loadTasks}
        />
      )}

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Description</th>
              <th>Assignee</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
  {assignedTasks.map(task => (
    <tr
      key={task.id}
      onClick={() => setSelectedTask(task)}
      style={{ cursor: "pointer" }}
    >
      <td>{task.id}</td>
      <td>{task.taskName}</td>
      <td>{task.description}</td>
      <td>{task.EmpName}</td>
      <td>{task.deadline}</td>
      <td>{task.status}</td>
    </tr>
  ))}
</tbody>

        </table>
        {selectedTask && (
  <TaskDetails
    task={selectedTask}
    onClose={() => setSelectedTask(null)}
  />
)}

      </div>

    </div>
  );
}

export default Dashboard;
