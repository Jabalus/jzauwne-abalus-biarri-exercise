import React from 'react';

// import config from './files/config.json';
import { Typography } from 'antd';
import shiftsData from './files/shifts.json';
import employeesData from './files/employees.json';
import rolesData from './files/roles.json';

import WeekView from './Components/WeekView';
import 'antd/dist/antd.css';

import config from './files/config.json';
import { TitleDiv } from './styles';

const { Title, Text } = Typography;

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
      <TitleDiv>
        <Title level={1} strong>
          {config.location} Roster Schedule
        </Title>
        <Text level={2} strong>
          {config.timezone} timezone
        </Text>
      </TitleDiv>
      <WeekView shifts={shiftsJoined} roles={rolesData} />
    </div>
  );
}

export default App;
