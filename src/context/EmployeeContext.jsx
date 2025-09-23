import { createContext, useContext, useState } from "react";
import { employees as dummyEmployees } from "../utils/dummyData";

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(dummyEmployees);
  const [attendance, setAttendance] = useState([]); // stores sessions

  const addEmployee = (employee) => {
    setEmployees([...employees, { id: Date.now(), ...employee }]);
  };

  // ✅ Check-In = new session
  const checkIn = (id) => {
    const today = new Date().toDateString();
    const now = new Date().toLocaleTimeString();

    setAttendance((prev) => [
      ...prev,
      { id, date: today, checkIn: now, checkOut: null },
    ]);
  };

  // ✅ Check-Out = close the last open session
  const checkOut = (id) => {
    const today = new Date().toDateString();
    const now = new Date().toLocaleTimeString();

    setAttendance((prev) => {
      const updated = [...prev];
      const lastIndex = updated
        .map((a, idx) => (a.id === id && a.date === today ? idx : null))
        .filter((i) => i !== null)
        .pop();

      if (lastIndex !== undefined && updated[lastIndex].checkOut === null) {
        updated[lastIndex] = {
          ...updated[lastIndex],
          checkOut: now,
        };
      }
      return updated;
    });
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, attendance, checkIn, checkOut }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  return useContext(EmployeeContext);
}
