import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

import { ShiftBoxContainer } from './styles';
import { formatDate } from '../../utils';

const ShiftBox = ({ shift, employee, start, width, yStart, color, edit }) => {
  const shiftBoxRender = (
    <ShiftBoxContainer
      width={width}
      start={start}
      yStart={yStart}
      color={color}
      onClick={edit}
    >
      <div>{shift.id}</div>
      {employee.first_name} {employee.last_name}
      <div>{formatDate(shift.start_time)}</div>
      <div>{formatDate(shift.end_time)}</div>
    </ShiftBoxContainer>
  );

  return width < 2 ? (
    <Tooltip
      title={() => (
        <>
          <div>{shift.id}</div>
          {employee.first_name} {employee.last_name}
          <div>{formatDate(shift.start_time)}</div>
          <div>{formatDate(shift.end_time)}</div>
        </>
      )}
    >
      {shiftBoxRender}
    </Tooltip>
  ) : (
    shiftBoxRender
  );
};

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
