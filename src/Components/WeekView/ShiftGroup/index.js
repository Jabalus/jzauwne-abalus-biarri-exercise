import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ShiftBox from '../../ShiftBox';

import {
  RoleRowHeader,
  RoleRowContainer,
  RoleTimelineBody,
  WeekViewContainerDiv,
} from '../styles';

import Timeline from '../Timeline';

const ShiftGroup = ({ shifts, roles, onEdit }) => {
  // let dateMap = [];

  // shifts.forEach((shift) => {
  //   dateMap = [
  //     ...dateMap,
  //     new Date(shift.start_time),
  //     new Date(shift.end_time),
  //   ];
  // });

  const dateMap = shifts.reduce(
    (arrOfDates, shift) => [
      ...arrOfDates,
      new Date(shift.start_time),
      new Date(shift.end_time),
    ],
    [],
  );

  const latestDate = moment(new Date(Math.max(...dateMap)));
  const earliestDate = moment(new Date(Math.min(...dateMap)));

  // function to set the veritcal postion (what row) the shift should be on
  const setYStart = (arr) => {
    const newArr = [];
    arr.forEach((shift, i) => {
      if (i === 0) {
        newArr.push({ ...shift, yStart: 0 });
      } else {
        /* 
            This block is used to check which indeces has overlaps 
            if an index is available e.g. 0 has no over lap consume it and ignore over lap on other
        */

        // get all overlaps with element with assign (yStart)
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
          // get highest index of an overlap
          const highestTakenIndex = Math.max(...overlaps);

          // check which indeces are free based on greatest index available on takenIndeces
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
            .duration(
              moment(shift.start_time).diff(earliestDate.startOf('day')),
            )
            .asHours();

          const endX = width + startX;
          return { ...shift, width, startX, endX };
        }),
    ),
  );

  // console.log(shiftByRolesGroup);
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

  // console.log(
  //   shiftByRolesGroup.map((arr) =>
  //     arr.map((shift) => ({
  //       id: shift.id,
  //       start_time: moment(shift.start_time).format('MMM DD, YYYY h:mm a'),
  //       end_time: moment(shift.end_time).format('MMM DD, YYYY h:mm a'),
  //     })),
  //   ),
  // );
  console.log(shiftByRolesGroupYIndex);
  return (
    <>
      <RoleRowContainer>
        {roles.map(({ name }, i) => (
          <RoleRowHeader
            key={name}
            noOfRows={shiftByRolesGroupYIndex[i] + 1}
            color={roles[i].background_colour}
          >
            <h2> {name}</h2>
          </RoleRowHeader>
        ))}
      </RoleRowContainer>
      <WeekViewContainerDiv>
        <Timeline start={earliestDate} end={latestDate} />

        {shiftByRolesGroup.map((shiftByRole, i) => (
          <RoleTimelineBody
            key={`row-${roles[i].name}`}
            noOfRows={shiftByRolesGroupYIndex[i] + 1}
          >
            {shiftByRole.map(
              ({ employee, width, startX, yStart, ...shift }) => (
                <ShiftBox
                  key={shift.id}
                  shift={shift}
                  employee={employee}
                  earliestDate={earliestDate}
                  yStart={yStart}
                  width={width}
                  start={startX}
                  color={roles[i].background_colour}
                  edit={() => onEdit(shift, employee)}
                />
              ),
            )}
          </RoleTimelineBody>
        ))}
      </WeekViewContainerDiv>
    </>
  );
};

ShiftGroup.propTypes = {
  shifts: PropTypes.array,
  roles: PropTypes.array,
  onEdit: PropTypes.func,
};

export default ShiftGroup;
