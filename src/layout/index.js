import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const InnerContainer = styled.div`
  width: 80%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  /* background-color: #ebebeb; */
  padding: 75px;
  /* box-shadow: 0 0 .2rem #fff,
              0 0 .2rem #fff,
              0 0 2rem #d3b8e1,
              0 0 0.8rem #2ecc71,
              0 0 2.8rem #2ecc71,
              inset 0 0 1.3rem #2ecc71; */
`;

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <Container>
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
};

export default Layout;
