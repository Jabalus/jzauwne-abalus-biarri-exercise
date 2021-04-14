import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { ContainerDiv, HourContainerDiv, HourDiv } from './styles';

const hours = [];

const numberArr = new Array(24).fill();

numberArr.forEach((acc, index) => {
  hours.push(moment({ hour: index }).format('h:mm A'));
});

const DayView = ({ day }) => (
  <ContainerDiv>
    <h3>{day}</h3>
    <HourContainerDiv>
      {hours.map((hour) => (
        <HourDiv key={hour}>{hour} </HourDiv>
      ))}
    </HourContainerDiv>
  </ContainerDiv>
);

DayView.propTypes = {
  day: PropTypes.string,
};

export default DayView;
