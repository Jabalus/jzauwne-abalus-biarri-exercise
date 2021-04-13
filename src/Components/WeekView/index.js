import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Timeline from './Timeline';

import {
  RoleTimelineBody,
  WeekViewContainerDiv,
  RoleRowHeader,
  WeekViewWrapperDiv,
  RoleRowContainer,
} from './styles';
import ShiftBox from '../ShiftBox';

const WeekView = ({ shifts, roles }) => {
  const [shiftsState] = useState(shifts);

  // const dateMap = shiftsState.map((e) => new Date(e.MeasureDate));

  let dateMap = [];

  shiftsState.forEach((shift) => {
    dateMap = [
      ...dateMap,
      new Date(shift.start_time),
      new Date(shift.end_time),
    ];
  });

  const latestDate = moment(new Date(Math.max(...dateMap)));
  const earliestDate = moment(new Date(Math.min(...dateMap)));

  const shiftByRolesGroup = roles.map((role) =>
    shifts.filter((shift) => shift.role_id === role.id),
  );

  /*

    hour px length = 100px
  */

  // const sortByNonOverlap = (arr) => {
  //   const newArr = [];
  //   arr.forEach(((shift, i) => {
  //     if (i === 0){
  //       newArr.push([[]])
  //     }
  //   }));
  //   return [newArr];
  // };

  return (
    <WeekViewWrapperDiv>
      <RoleRowContainer>
        {roles.map(({ name }) => (
          <RoleRowHeader>
            <h2> {name}</h2>
          </RoleRowHeader>
        ))}
      </RoleRowContainer>
      <WeekViewContainerDiv>
        <Timeline start={earliestDate} end={latestDate} />
        {shiftByRolesGroup.map((shiftByRole) => (
          <RoleTimelineBody>
            {shiftByRole.map(({ employee, ...shift }) => (
              <ShiftBox
                shift={shift}
                employee={employee}
                earliestDate={earliestDate}
              />
            ))}
          </RoleTimelineBody>
        ))}
      </WeekViewContainerDiv>
    </WeekViewWrapperDiv>
  );
};

/* 
  {shiftsState.map(({ employee, ...shift }) => (
    <div>
      {employee.first_name} {employee.last_name}
      <div>
        {moment(shift.start_time).format('MMM DD YYYY, h:mm:ss a')}
      </div>
      <div>{moment(shift.end_time).format('MMM DD YYYY, h:mm:ss a')}</div>
    </div>
  ))}
*/

WeekView.propTypes = {
  shifts: PropTypes.array,
  roles: PropTypes.array,
};

export default WeekView;
