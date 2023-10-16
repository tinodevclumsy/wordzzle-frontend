import React from 'react';
import Button from '../components/common/Button';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7c89f1;
`;

const InnerContainer = styled.div`
  width: 80%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: #ebebeb;
  padding: 75px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0 0 25px;  
`;

const LandingPage = () => {
  return (
    <Container>
      <InnerContainer>
        <div>
          <Title>WORDZZLE</Title>
          <Button style={{ width: '100%', marginBottom: '5px' }}>List</Button>
          <Button style={{ width: '100%',  marginBottom: '5px'}}>Quiz 1</Button>
          <Button style={{ width: '100%' }}>Quiz 2</Button>
        </div>
      </InnerContainer>
    </Container>
  );
};

export default LandingPage;
