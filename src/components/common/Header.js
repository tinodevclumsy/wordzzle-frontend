import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { logout } from '../../modules/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: fixed;
  z-index: 1;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #786bf9;
`;

const HeaderInner = styled.div`
  max-width: 1280px;
  height: 100px;
  padding: 0 15px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavItem = styled.div`
  margin: 0 15px;
`;

const IconContainer = styled.div`
  border: 1px solid;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = [
    {
      label: <span onClick={() => onLogout()}>Logout</span>,
      key: '1',
    },
  ];

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <HeaderContainer>
      <HeaderInner>
        <Link to="/">
          <h3>WORDZZLE</h3>
        </Link>

        <Nav>
          <NavItem>
            <Link to="/list">
              <b>LIST</b>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/quiz">
              <b>QUIZ</b>
            </Link>
          </NavItem>
          <NavItem>
            <Dropdown menu={{ items }}>
              <IconContainer>
                <UserOutlined style={{ fontSize: '18px' }} />
              </IconContainer>
            </Dropdown>
          </NavItem>
        </Nav>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
