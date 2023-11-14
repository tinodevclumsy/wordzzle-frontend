import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '../components/common/Header';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  padding: 100px 15px;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
