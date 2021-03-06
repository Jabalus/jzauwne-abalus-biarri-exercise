import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, DatePicker } from 'antd';
import moment from 'moment';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const EditShiftModal = ({ initialValue, visible, onCancel, onSave }) => {
  const onFinish = (values) => {
    onSave({
      employee_id: initialValue.employee_id,
      start_time: moment.utc(values.start_time).toISOString(),
      role_id: initialValue.role_id,
      end_time: moment.utc(values.end_time).toISOString(),
      id: initialValue.id,
      break_duration: initialValue.break_duration,
      employee: initialValue.employee,
      role: initialValue.role,
    });
  };

  return (
    <Modal
      title="Edit shift"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        {...layout}
        name="basic"
        initialValues={initialValue}
        onFinish={onFinish}
      >
        <Form.Item label="Employee Name">
          {initialValue && (
            <h3>
              {initialValue.employee.first_name}{' '}
              {initialValue.employee.last_name}
            </h3>
          )}
        </Form.Item>

        <Form.Item label="Shift Role">
          {initialValue && <h3>{initialValue.role.name}</h3>}
        </Form.Item>

        <Form.Item label="Break Duration">
          {initialValue && <h3>{initialValue.break_duration / 3600} hr/s</h3>}
        </Form.Item>

        <Form.Item
          label="Start Time"
          name="start_time"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('end_time').isAfter(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('start time must be earlier than end time'),
                );
              },
            }),
          ]}
        >
          <DatePicker
            showTime
            format="MM/DD/YYYY hh:mm A"
            allowClear={false}
            minuteStep={30}
          />
        </Form.Item>
        <Form.Item
          label="End Time"
          name="end_time"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || value.isAfter(getFieldValue('start_time'))) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('start time must be earlier than end time'),
                );
              },
            }),
          ]}
        >
          <DatePicker
            showTime
            format="MM/DD/YYYY hh:mm A"
            allowClear={false}
            minuteStep={30}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditShiftModal.propTypes = {
  initialValue: PropTypes.object,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};

export default EditShiftModal;
