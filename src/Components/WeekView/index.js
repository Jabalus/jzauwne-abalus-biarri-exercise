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

  const setYStart = (arr) => {
    const newArr = [];
    arr.forEach((shift, i) => {
      if (i === 0) {
        newArr.push({ ...shift, yStart: 0 });
      } else {
        const overlaps = newArr
          .filter(
            (shiftPast) =>
              shift.startX >= shiftPast.startX &&
              shift.startX <= shiftPast.endX,
          )
          .map((shiftOverlap) => shiftOverlap.yStart);

        if (overlaps.length === 0) {
          newArr.push({ ...shift, yStart: 0 });
        } else {
          // originally was:
          // newArr.push({ ...shift, yStart: overlaps.length });

          /* 
            add condition here to check which indeces has overlaps 
            if an index is available e.g. 0 has no over lap consume it and ignore over lap on other
          */

          // check which indeces are free based on greatest index available on takenIndeces
          const highestTakenIndex = Math.max(...overlaps);

          // look through 0 to highestTakenIndex to check which is the lowest index avaible to fill

          const availableIndeces = Array(highestTakenIndex + 1)
            .fill()
            .map((_, index) => index)
            .filter((_, index) => !overlaps.includes(index));

          newArr.push({
            ...shift,
            yStart:
              availableIndeces.length > 0
                ? availableIndeces[0]
                : highestTakenIndex + 1,
          });
        }
      }
    });
    return newArr;
  };

  const shiftByRolesGroup = roles.map((role) =>
    setYStart(
      shifts
        .filter((shift) => shift.role_id === role.id) // filter by role
        .sort((shiftA, shiftB) =>
          moment(shiftA.start_time).diff(shiftB.start_time),
        ) // order by date
        .map((shift) => {
          // map shifts with dimension values
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
          <RoleRowHeader noOfRows={shiftByRolesGroupYIndex[i] + 1}>
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

WeekView.propTypes = {
  shifts: PropTypes.array,
  roles: PropTypes.array,
};

export default WeekView;
