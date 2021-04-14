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
    console.log('Success:', values);
    console.log('initial', initialValue);
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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Modal
      title="Edit shift"
      visible={visible}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form
        {...layout}
        name="basic"
        initialValues={initialValue}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
          rules={[{ required: true }]}
        >
          <DatePicker showTime format="DD/MM/YYYY hh:mm A" />
        </Form.Item>
        <Form.Item
          label="End Time"
          name="end_time"
          rules={[{ required: true }]}
        >
          <DatePicker showTime format="DD/MM/YYYY hh:mm A" />
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
