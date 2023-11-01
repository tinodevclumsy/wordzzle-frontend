import React from 'react';
// import Button from '../components/common/Button';
import styled from 'styled-components';
import Layout from '../layout';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Title = styled.h1`
  font-size: 7rem;
  margin: 0 0 25px;
  /* color: #fff; */
  background-image: linear-gradient(43deg, #DA3096 0%, #E0B958 46%, #2ecc71 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* text-shadow:
    0 0 2px #fff,
    0 0 2px #000,
    0 0 15px #fff,
    0 0 23px #2ecc71,
    0 0 82px #2ecc71,
    0 0 25px #2ecc71,
    0 0 80px #2ecc71,
    0 0 120px #2ecc71; */
`;

const LandingPage = () => {
  return (
    <Layout>
      <div>
        <Title>WORDZZLE</Title>
        <Link to="/list">
          <Button style={{ width: '100%', marginBottom: '5px' }} size='large'>List</Button>
        </Link>
        <Button style={{ width: '100%', marginBottom: '5px' }} size='large'>Quiz 1</Button>
        <Button style={{ width: '100%' }} size='large'>Quiz 2</Button>
      </div>
    </Layout>
  );
};

export default LandingPage;
