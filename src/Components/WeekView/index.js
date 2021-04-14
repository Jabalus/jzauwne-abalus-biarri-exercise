import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { WeekViewWrapperDiv } from './styles';
import EditShiftModal from '../EditShiftModal';
import ShiftGroup from './ShiftGroup';

const WeekView = ({ shifts, roles }) => {
  const [shiftsState, setShiftState] = useState(shifts);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInitialValue, setModalInitialValue] = useState();

  // const dateMap = shiftsState.map((e) => new Date(e.MeasureDate));

  const handleSave = (newData) => {
    // console.log('==============on handle save==============');
    // console.log('Data');
    // console.log(newData);

    // console.log('id');
    // console.log(newData.id);
    // console.log('Shift State');
    // console.log(shiftsState);

    const filtered = shiftsState.filter((shift) => shift.id !== newData.id);

    // console.log('filtered');
    // console.log(filtered);

    const newArr = [...filtered, newData];
    // console.log('New Shift State');
    // console.log(newArr);
    // console.log('==============end==============');
    setShiftState(newArr);
    setModalVisible(false);
  };

  const handleEdit = (shift, employee) => {
    setModalInitialValue({
      ...shift,
      start_time: moment(shift.start_time),
      end_time: moment(shift.end_time),
      employee,
    });
    setModalVisible(true);
  };

  console.log(
    shiftsState.map((shift) => ({
      id: shift.id,
      start_time: moment(shift.start_time).format('MMM DD, YYYY h:mm a'),
      end_time: moment(shift.end_time).format('MMM DD, YYYY h:mm a'),
    })),
  );

  return (
    <WeekViewWrapperDiv>
      <EditShiftModal
        initialValue={modalInitialValue}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSave={handleSave}
      ></EditShiftModal>
      <ShiftGroup shifts={shiftsState} roles={roles} onEdit={handleEdit} />
    </WeekViewWrapperDiv>
  );
};

WeekView.propTypes = {
  shifts: PropTypes.array,
  roles: PropTypes.array,
};

export default WeekView;
