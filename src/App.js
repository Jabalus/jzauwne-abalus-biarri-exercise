import React from 'react';

// import config from './files/config.json';
import shiftsData from './files/shifts.json';
import employeesData from './files/employees.json';
import rolesData from './files/roles.json';

import WeekView from './Components/WeekView';

const joinShiftsWithDetails = (shifts, employees, roles) =>
  shifts.map((shift) => {
    const employeeDetails = employees.find(
      (emp) => emp.id === shift.employee_id,
    );
    const roleDetails = roles.find((role) => role.id === shift.role_id);

    return {
      ...shift,
      employee: employeeDetails,
      role: roleDetails,
    };
  });

const shiftsJoined = joinShiftsWithDetails(
  shiftsData,
  employeesData,
  rolesData,
);

function App() {
  return (
    <div>
      <WeekView shifts={shiftsJoined} roles={rolesData} />
    </div>
  );
}

export default App;
