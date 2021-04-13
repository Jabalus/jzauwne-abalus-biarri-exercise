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

  // working map
  // const shiftByRolesGroup = roles.map((role) =>
  //   shifts
  //     .filter((shift) => shift.role_id === role.id)
  //     .sort((shiftA, shiftB) =>
  //       moment(shiftA.start_time).diff(shiftB.start_time),
  //     ),
  // );

  // experimental

  const setYStart = (arr) => {
    const newArr = [];
    arr.forEach((shift, i) => {
      if (i === 0) {
        newArr.push({ ...shift, yStart: 0 });
      } else {
        // newArr.push({ ...shift, yStart: 0 });

        const overlaps = newArr.filter(
          (shiftPast) =>
            shift.startX >= shiftPast.startX && shift.startX <= shiftPast.endX,
        );

        if (overlaps.length === 0) {
          newArr.push({ ...shift, yStart: 0 });
        } else {
          newArr.push({ ...shift, yStart: overlaps.length });
        }
      }
    });
    return newArr;
  };

  const shiftByRolesGroup = roles.map((role) =>
    setYStart(
      shifts
        .filter((shift) => shift.role_id === role.id)
        .sort((shiftA, shiftB) =>
          moment(shiftA.start_time).diff(shiftB.start_time),
        )
        .map((shift) => {
          const width = moment
            .duration(moment(shift.end_time).diff(moment(shift.start_time)))
            .asHours();

          const startX = moment
            .duration(moment(shift.end_time).diff(earliestDate))
            .asHours();

          const endX = width + startX;
          return { ...shift, aWidth: width, startX, endX };
        }),
    ),
  );

  /*
    hour px length = 100px
  */

  const getHighestYIndex = (arr) =>
    arr.reduce((highest, currentValue) =>
      currentValue.yStart > highest.yStart ? currentValue : highest,
    ).yStart;

  const shiftByRolesGroupYIndex = shiftByRolesGroup.map((arr) =>
    getHighestYIndex(arr),
  );

  return (
    <WeekViewWrapperDiv>
      <RoleRowContainer>
        {roles.map(({ name }, i) => (
          <RoleRowHeader>
            <h2> {name}</h2>
            <p>no of rows: {shiftByRolesGroupYIndex[i] + 1}</p>
          </RoleRowHeader>
        ))}
      </RoleRowContainer>
      <WeekViewContainerDiv>
        <Timeline start={earliestDate} end={latestDate} />
        {shiftByRolesGroup.map((shiftByRole, i) => (
          <RoleTimelineBody noOfRows={shiftByRolesGroupYIndex[i] + 1}>
            {shiftByRole.map(({ employee, startX, yStart, ...shift }) => (
              <ShiftBox
                shift={shift}
                employee={employee}
                earliestDate={earliestDate}
                yStart={yStart}
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
