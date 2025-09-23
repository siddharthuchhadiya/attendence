import { LayoutDashboard, Users, Calendar } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-lg transition ${
      isActive ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-indigo-600"
    }`;

  return (
    <aside className="w-64 bg-indigo-700 text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 text-2xl font-bold border-b border-indigo-600">
        Company Panel
      </div>
      <nav className="flex-1 p-4 space-y-4">
        <NavLink to="/" className={linkClasses}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/employees" className={linkClasses}>
          <Users size={20} /> Employees
        </NavLink>
        <NavLink to="/attendance" className={linkClasses}>
          <Calendar size={20} /> Attendance
        </NavLink>
      </nav>
      <div className="p-4 border-t border-indigo-600 text-sm text-gray-300">
        © 2025 Company
      </div>
    </aside>
  );
}
