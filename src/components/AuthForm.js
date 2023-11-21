/* eslint-disable no-unused-vars */
import React from 'react';
import { Input, Button, Space, Form } from 'antd';
import PropTypes from 'prop-types';

const AuthForm = ({ type, form, onChange, onSubmit }) => {
  return (
    <Form onFinish={onSubmit}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ textAlign: 'left' }}>
          <label style={{ color: '#999', fontSize: '14px' }}>Username</label>
          <Input
            name="username"
            size="large"
            onChange={(e) => onChange(e)}
            value={form.username}
          />
        </div>
        <div style={{ textAlign: 'left' }}>
          <label style={{ color: '#999', fontSize: '14px' }}>Password</label>
          <Input
            name="password"
            size="large"
            onChange={(e) => onChange(e)}
            value={form.password}
          />
        </div>

        {type === 'register' && (
          <div style={{ textAlign: 'left' }}>
            <label style={{ color: '#999', fontSize: '14px' }}>
              Confirm Password
            </label>
            <Input
              name="passwordConfirm"
              size="large"
              onChange={(e) => onChange(e)}
              value={form.passwordConfirm}
            />
          </div>
        )}

        <Button
          type="primary"
          size="large"
          style={{ width: '100%', marginTop: '5px' }}
          htmlType="submit"
        >
          Submit
        </Button>
      </Space>
    </Form>
  );
};

AuthForm.propTypes = {
  type: PropTypes.string,
  form: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default AuthForm;
