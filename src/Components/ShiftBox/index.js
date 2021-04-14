import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { ShiftBoxContainer } from './styles';

const ShiftBox = ({ shift, employee, start, width, yStart, color, edit }) => (
  <ShiftBoxContainer
    width={width}
    start={start}
    yStart={yStart}
    color={color}
    onClick={edit}
  >
    <div>{shift.id}</div>
    {employee.first_name} {employee.last_name}
    <div>{moment(shift.start_time).format('MMM D YY, h:mm a')}</div>
    <div>{moment(shift.end_time).format('MMM D YY, h:mm a')}</div>
  </ShiftBoxContainer>
);

ShiftBox.propTypes = {
  shift: PropTypes.object,
  employee: PropTypes.object,
  start: PropTypes.number,
  width: PropTypes.number,
  yStart: PropTypes.number,
  color: PropTypes.string,
  edit: PropTypes.func,
};

export default ShiftBox;
