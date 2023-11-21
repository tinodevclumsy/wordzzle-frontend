import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #786BF9;
`;

const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  padding: 75px 30px;
  border-radius: 30px;
  background: #fff;
  overflow: hidden;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4vw;
  margin: 0 0 25px;
  color: #2341cc;
`;

const AuthLayout = ({ children }) => {
  return (
    <Container>
      <InnerContainer>
        <Title>WORDZZLE</Title>
        {children}
      </InnerContainer>
    </Container>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
};

export default AuthLayout;
