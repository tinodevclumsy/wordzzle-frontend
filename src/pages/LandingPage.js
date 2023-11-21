import React from 'react';
// import Button from '../components/common/Button';
import styled from 'styled-components';
import Layout from '../layout';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { AuditOutlined, UnorderedListOutlined } from '@ant-design/icons';

const Title = styled.h1`
  font-size: 6vw;
  margin: 0 0 25px;
  color: #2341cc;
  /* background-image: linear-gradient(
    43deg,
    #da3096 0%,
    #e0b958 46%,
    #2ecc71 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
`;

const Container = styled.div`
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.div`
  display: flex;
`;

const NavItem = styled.div`
  margin: 0 10px;
`;

const LandingPage = () => {
  return (
    <Layout>
      <Container>
        <Title>WORDZZLE</Title>
        <Nav>
          <NavItem>
            <Link to="/list">
              <Button
                style={{ width: '100px', height: '100px', fontWeight: '500' }}
                type="primary"
              >
                <UnorderedListOutlined style={{ fontSize: '18px' }} />
                <br />
                List
              </Button>
            </Link>
          </NavItem>

          <NavItem>
            <Link to="/quiz">
              <Button style={{ width: '100px', height: '100px', fontWeight: '500' }}>
                <AuditOutlined style={{ fontSize: '18px' }}/>
                <br />
                Quiz
              </Button>
            </Link>
          </NavItem>
        </Nav>
      </Container>
    </Layout>
  );
};

export default LandingPage;
