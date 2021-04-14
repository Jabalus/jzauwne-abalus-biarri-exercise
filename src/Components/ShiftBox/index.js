import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { ShiftBoxContainer } from './styles';

const ShiftBox = ({ shift, employee, earliestDate, yStart }) => {
  const width = moment
    .duration(moment(shift.end_time).diff(moment(shift.start_time)))
    .asHours();

  const start = moment
    .duration(moment(shift.end_time).diff(earliestDate))
    .asHours();

  return (
    <ShiftBoxContainer width={width} start={start} yIndex={yStart}>
      <div>{yStart}</div>
      {employee.first_name} {employee.last_name}
      <div>{moment(shift.start_time).format('MMM D YY, h:mm a')}</div>
      <div>{moment(shift.end_time).format('MMM D YY, h:mm a')}</div>
      <div>
        {moment
          .duration(moment(shift.end_time).diff(moment(shift.start_time)))
          .asHours()}{' '}
        hrs
      </div>
    </ShiftBoxContainer>
  );
};

ShiftBox.propTypes = {
  shift: PropTypes.object,
  employee: PropTypes.object,
  earliestDate: PropTypes.instanceOf(moment),
  yStart: PropTypes.string,
};

export default ShiftBox;
