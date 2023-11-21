import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProfileDropdown from '../../containers/auth/ProfileDropdown'

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

const Header = () => {

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
            <ProfileDropdown />
          </NavItem>
        </Nav>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
