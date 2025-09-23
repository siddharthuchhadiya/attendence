import { useEmployees } from "../context/EmployeeContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, LogIn, LogOut, LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  const { employees, attendance } = useEmployees();

  const today = new Date().toDateString();
  const todayRecords = attendance.filter((a) => a.date === today);

  const checkedIn = todayRecords.filter((a) => a.checkIn).length;
  const checkedOut = todayRecords.filter((a) => a.checkOut).length;

  // ✅ Monthly chart data
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthRecords = attendance.filter((a) => {
    const d = new Date(a.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const dailySummary = {};
  monthRecords.forEach((rec) => {
    if (!dailySummary[rec.date]) {
      dailySummary[rec.date] = { date: rec.date, checkIns: 0, checkOuts: 0 };
    }
    if (rec.checkIn) dailySummary[rec.date].checkIns++;
    if (rec.checkOut) dailySummary[rec.date].checkOuts++;
  });

  const chartData = Object.values(dailySummary);

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/employees", label: "Employees" },
    { path: "/attendance", label: "Attendance" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-600">
          Company Panel
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <a
            href={navItems[0].path}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-600"
          >
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a
            href="/employees"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-600"
          >
            <Users size={20} /> Employees
          </a>
          <a
            href="/attendance"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-600"
          >
            <Users size={20} /> Attendance
        </a>
        </nav>
        <div className="p-4 border-t border-indigo-600 text-sm text-gray-300">
          © 2025 Company
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="text-gray-500 text-sm">
            {new Date().toLocaleDateString()}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-500 text-sm">Total Employees</h2>
              <p className="text-3xl font-bold text-indigo-600 mt-2">
                {employees.length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-500 text-sm">Checked In Today</h2>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {checkedIn}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-500 text-sm">Checked Out Today</h2>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {checkedOut}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Monthly Attendance Overview
            </h2>
            {chartData.length === 0 ? (
              <p className="text-gray-500">No data available for this month.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="checkIns" fill="#34D399" name="Check-Ins" />
                  <Bar dataKey="checkOuts" fill="#F87171" name="Check-Outs" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
