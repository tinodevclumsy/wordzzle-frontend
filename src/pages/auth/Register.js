import React from 'react';
import Auth from '../../layout/auth';
import RegisterForm from '../../containers/auth/RegisterForm';

const Register = () => {
  return (
    <Auth>
      <RegisterForm />
    </Auth>
  );
};

export default Register;
