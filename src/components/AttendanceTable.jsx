import { useEmployees } from "../context/EmployeeContext";
import { useState } from "react";

export default function AttendanceTable() {
  const { employees, checkIn, checkOut, attendance } = useEmployees();
  const [activeTab, setActiveTab] = useState("employees");
  const [expandedEmployee, setExpandedEmployee] = useState(null);

  const today = new Date().toDateString();
  const todayRecords = attendance.filter((a) => a.date === today);

  const getLatestRecord = (id) => {
    const records = todayRecords.filter((a) => a.id === id);
    return records.length > 0 ? records[records.length - 1] : null;
  };

  const getEmployeeRecords = (id) => {
    return attendance.filter((a) => a.id === id).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const toggleExpandEmployee = (id) => {
    setExpandedEmployee(expandedEmployee === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab("employees")}
            className={`py-4 px-6 text-center font-medium text-sm ${activeTab === "employees" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            Employee Attendance
          </button>
          <button
            onClick={() => setActiveTab("records")}
            className={`py-4 px-6 text-center font-medium text-sm ${activeTab === "records" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            All Records
          </button>
        </nav>
      </div>

      {activeTab === "employees" && (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Today's Attendance</h2>
            <p className="text-gray-600">{today}</p>
          </div>

          <div className="overflow-hidden rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-Out</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((emp) => {
                  const record = getLatestRecord(emp.id);
                  const isCheckedIn = record && !record.checkOut;
                  
                  return (
                    <>
                      <tr key={emp.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-800 font-medium">{emp.name.charAt(0)}</span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                              <div className="text-sm text-gray-500">ID: {emp.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">{emp.role}</td>
                        <td className="py-4 px-4 text-sm">
                          {record?.checkIn ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {record.checkIn}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {record?.checkOut ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {record.checkOut}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {isCheckedIn ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Checked In
                            </span>
                          ) : record ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Checked Out
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Not Checked In
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <div className="flex space-x-2">
                            {!record || record.checkOut ? (
                              <button
                                onClick={() => checkIn(emp.id)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Check-In
                              </button>
                            ) : (
                              <button
                                onClick={() => checkOut(emp.id)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                              >
                                Check-Out
                              </button>
                            )}
                            <button
                              onClick={() => toggleExpandEmployee(emp.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              History
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedEmployee === emp.id && (
                        <tr className="bg-gray-50">
                          <td colSpan="6" className="px-4 py-3">
                            <div className="text-sm font-medium text-gray-900 mb-2">Attendance History for {emp.name}</div>
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-In</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Check-Out</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {getEmployeeRecords(emp.id).map((record, idx) => (
                                    <tr key={idx}>
                                      <td className="px-4 py-2 text-sm">{record.date}</td>
                                      <td className="px-4 py-2 text-sm">{record.checkIn || "-"}</td>
                                      <td className="px-4 py-2 text-sm">{record.checkOut || "-"}</td>
                                      <td className="px-4 py-2 text-sm">
                                        {record.checkIn && record.checkOut ? (
                                          (() => {
                                            const [inHour, inMinute] = record.checkIn.split(':').map(Number);
                                            const [outHour, outMinute] = record.checkOut.split(':').map(Number);
                                            const hours = outHour - inHour + (outMinute - inMinute) / 60;
                                            return `${hours.toFixed(1)}h`;
                                          })()
                                        ) : "-"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "records" && (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">All Attendance Records</h2>
            <p className="text-gray-600">Complete history of employee attendance</p>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <ul className="divide-y divide-gray-200">
              {attendance.length === 0 ? (
                <li className="px-6 py-4 text-center text-gray-500">No attendance records yet.</li>
              ) : (
                attendance.map((a, idx) => {
                  const employee = employees.find(e => e.id === a.id);
                  return (
                    <li key={idx} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{employee?.name || `Employee ${a.id}`}</div>
                          <div className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{a.date}</div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">IN: {a.checkIn || "-"}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">OUT: {a.checkOut || "-"}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}