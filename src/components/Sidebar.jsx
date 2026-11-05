
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Admin Menu</h2>

      <NavLink to="/admin-dashboard">Dashboard</NavLink>
      <NavLink to="/manage-tasks">Manage Tasks</NavLink>
      <NavLink to="/admin-dashboard">Users</NavLink>
    </aside>
  );
}

export default Sidebar;
