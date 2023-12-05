import React from 'react';
import Auth from '../../layout/auth';
import LoginForm from '../../containers/auth/LoginForm';
const Login = () => {
  return (
    <Auth>
      <LoginForm />
    </Auth>
  );
};

export default Login;
