import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { ShiftBoxContainer } from './styles';

const ShiftBox = ({ shift, employee, start, width, yStart, color }) => (
  <ShiftBoxContainer width={width} start={start} yStart={yStart} color={color}>
    <div>
      {yStart} {width}
    </div>
    {employee.first_name} {employee.last_name}
    <div>{moment(shift.start_time).format('MMM D YY, h:mm a')}</div>
    <div>{moment(shift.end_time).format('MMM D YY, h:mm a')}</div>
  </ShiftBoxContainer>
);

// const width = moment
//     .duration(moment(shift.end_time).diff(moment(shift.start_time)))
//     .asHours();

//   const start = moment
//     .duration(moment(shift.end_time).diff(earliestDate))
//     .asHours();
ShiftBox.propTypes = {
  shift: PropTypes.object,
  employee: PropTypes.object,
  start: PropTypes.number,
  width: PropTypes.number,
  yStart: PropTypes.string,
  color: PropTypes.string,
};

export default ShiftBox;
