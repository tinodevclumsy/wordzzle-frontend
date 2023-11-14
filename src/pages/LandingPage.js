import React from 'react';
// import Button from '../components/common/Button';
import styled from 'styled-components';
import Layout from '../layout';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Title = styled.h1`
  font-size: 8vw;
  margin: 0 0 25px;
  background-image: linear-gradient(
    43deg,
    #da3096 0%,
    #e0b958 46%,
    #2ecc71 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LandingPage = () => {
  return (
    <Layout>
      <div style={{ textAlign: 'center' }}>
        <Title>WORDZZLE</Title>
        <Link to="/list">
          <Button
            style={{ width: '50%', marginBottom: '5px', height: '45px' }}
            size="large"
          >
            List
          </Button>
        </Link>
        <br />
        <Link to="/quiz">
          <Button
            style={{ width: '50%', marginBottom: '5px', height: '45px' }}
            size="large"
          >
            Quiz
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default LandingPage;
