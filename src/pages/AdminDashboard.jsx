import { useState, useEffect } from "react";

function AdminDashboard() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [users] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter task title");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      assignedTo,
      priority,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setDescription("");
    setAssignedTo("");
    setPriority("Medium");

    alert("Task Added Successfully!");
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const updateStatus = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const progress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">
        <h2>TaskFlow</h2>
        <p>ADMIN PANEL</p>
        <h4>Dashboard</h4>
        <h4>Manage Tasks</h4>
        <h4>Users</h4>

        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </aside>

      <main className="admin-main">

        <h1>Admin Dashboard</h1>
        <p>Welcome to your Task Management System</p>

        <div className="stats-container">

          <div className="stat-card">
            <h3>Total Tasks</h3>
            <h1>{total}</h1>
          </div>

          <div className="stat-card">
            <h3>Pending Tasks</h3>
            <h1>{pending}</h1>
          </div>

          <div className="stat-card">
            <h3>In Progress</h3>
            <h1>{progress}</h1>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <h1>{completed}</h1>
          </div>

          <div className="stat-card">
            <h3>Total Users</h3>
            <h1>{users.length}</h1>
          </div>

        </div>

        <div className="task-form">

          <h2>Create New Task</h2>

          <form onSubmit={addTask}>

            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select User</option>

              {users.map((user) => (
                <option key={user.id} value={user.email}>
                  {user.name}
                </option>
              ))}
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button type="submit">+ Add Task</button>

          </form>

        </div>

        <div className="task-list">

          <h2>All Tasks</h2>

          {tasks.length === 0 ? (
            <p>No Tasks Available. Create your first task!</p>
          ) : (

            tasks.map((task) => (

              <div className="task-item" key={task.id}>

                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Assigned To: {task.assignedTo || "Not Assigned"}</p>
                  <p>Priority: {task.priority}</p>
                </div>

                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task.id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </main>
    </div>
  );
}


export default AdminDashboard;