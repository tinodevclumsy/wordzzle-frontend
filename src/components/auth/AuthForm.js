import React from 'react';
import { Input, Button, Form } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthForm = ({ type, form, onChange, onSubmit }) => {
  const onFinish = () => {
    onSubmit();
  };

  const checkConfirmPassword = () => {
    if (form.password === form.passwordConfirm) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Confirm password sholud be matched'));
  };

  return (
    <Form
      name="auth-form"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Username is required',
          },
        ]}
      >
        <Input
          name="username"
          size="large"
          onChange={(e) => onChange(e)}
          value={form.username}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Password is required',
          },
        ]}
      >
        <Input.Password
          name="password"
          size="large"
          onChange={(e) => onChange(e)}
          value={form.password}
        />
      </Form.Item>
      {type === 'register' && (
        <Form.Item
          label="Confirm Password"
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: 'Confirm Password is required',
            },
            {
              validator: checkConfirmPassword,
            },
          ]}
        >
          <Input.Password
            name="passwordConfirm"
            size="large"
            onChange={(e) => onChange(e)}
            value={form.passwordConfirm}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Button
          type="primary"
          size="large"
          style={{ width: '100%', marginTop: '5px' }}
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
      {type === 'register' ? (
        <Link to="/login" style={{ color: '#999' }}>
          Already have an account? Sign In
        </Link>
      ) : (
        <Link to="/register" style={{ color: '#999' }}>
          Don&apos;t have an account? Sign Up
        </Link>
      )}
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
