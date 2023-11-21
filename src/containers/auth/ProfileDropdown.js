import React from 'react';
import { Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../modules/user';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

const IconContainer = styled.div`
  border: 1px solid;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-right: 7px;
`;

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(({ user }) => user.user);

  const ITEMS = [
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
    <Dropdown menu={{ items: ITEMS }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconContainer>
          <UserOutlined style={{ fontSize: '18px' }} />
        </IconContainer>
        <b>{user && user.username}</b>
      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;
