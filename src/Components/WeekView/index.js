import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { WeekViewWrapperDiv } from './styles';
import EditShiftModal from '../EditShiftModal';
import ShiftGroup from './ShiftGroup';
import { getMomentTz } from '../../utils';

const WeekView = ({ shifts, roles }) => {
  const [shiftsState, setShiftState] = useState(shifts);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInitialValue, setModalInitialValue] = useState();

  const handleSave = (newData) => {
    const filtered = shiftsState.filter((shift) => shift.id !== newData.id);
    const newArr = [...filtered, newData];
    setShiftState(newArr);
    setModalVisible(false);
  };

  const handleEdit = (shift, employee) => {
    setModalInitialValue({
      ...shift,
      start_time: getMomentTz(shift.start_time),
      end_time: getMomentTz(shift.end_time),
      employee,
    });
    setModalVisible(true);
  };

  return (
    <>
      <EditShiftModal
        initialValue={modalInitialValue}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSave={handleSave}
      ></EditShiftModal>
      <WeekViewWrapperDiv>
        <ShiftGroup shifts={shiftsState} roles={roles} onEdit={handleEdit} />
      </WeekViewWrapperDiv>
    </>
  );
};

WeekView.propTypes = {
  shifts: PropTypes.array,
  roles: PropTypes.array,
};

export default WeekView;
