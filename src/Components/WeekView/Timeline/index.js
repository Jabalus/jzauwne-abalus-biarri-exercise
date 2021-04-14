import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ContainerDiv } from './styles';
import DayView from '../../DayView';

const Timeline = ({ start, end }) => {
  const days = [];
  let dayHolder = start;

  while (dayHolder <= end) {
    days.push(dayHolder.toDate());
    dayHolder = dayHolder.clone().add(1, 'd');
  }

  return (
    <ContainerDiv>
      {days.map((day) => (
        <DayView
          key={moment(day).format('MMMM DD YYYY, dddd')}
          day={moment(day).format('MMMM DD YYYY,  dddd')}
        />
      ))}
    </ContainerDiv>
  );
};

Timeline.propTypes = {
  start: PropTypes.instanceOf(moment),
  end: PropTypes.instanceOf(moment),
};

export default Timeline;
