import EmployeeForm from "../components/EmployeeForm";
import { useEmployees } from "../context/EmployeeContext";

export default function Employees() {
  const { employees } = useEmployees();

  return (
    <div className="w-[1525px] ml-auto">
      <h1 className="text-xl font-bold mb-4">Employees</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <EmployeeForm />

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Employee List</h2>
          {employees.length === 0 ? (
            <p className="text-gray-500">No employees added yet.</p>
          ) : (
            <ul className="space-y-2">
              {employees.map((emp) => (
                <li
                  key={emp.id}
                  className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                >
                  <span>
                    <span className="font-medium">{emp.name}</span> —{" "}
                    <span className="text-gray-600">{emp.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
