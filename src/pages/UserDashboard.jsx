import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const myTasks = tasks.filter(
    (task) => task.assignedTo === user?.email
  );

  const updateStatus = (id, status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const pending = myTasks.filter(
    (t) => t.status === "Pending"
  ).length;

  const progress = myTasks.filter(
    (t) => t.status === "In Progress"
  ).length;

  const completed = myTasks.filter(
    (t) => t.status === "Completed"
  ).length;

  return (
    <div className="admin-main">

      <h1>Welcome, {user?.name}!</h1>

      <p>Here are your assigned tasks.</p>

      <div className="stats-container">

        <div className="stat-card">
          <h3>Total Tasks</h3>
          <h1>{myTasks.length}</h1>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
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

      </div>

      <div className="task-list">

        <h2>My Assigned Tasks</h2>

        {myTasks.length === 0 ? (
          <p>No tasks assigned yet!</p>
        ) : (

          myTasks.map((task) => (

            <div className="task-item" key={task.id}>

              <div>
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <p>Priority: {task.priority}</p>

                <p>Status: {task.status}</p>
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

            </div>

          ))

        )}

      </div>

      <button
        className="auth-button"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  );
}

export default UserDashboard;