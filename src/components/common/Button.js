import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 700;
  padding: 10px 25px;
  color: #fff;
  cursor: pointer;
  background-color: #7c89f1;
  transition: 0.3s ease-in-out all;
  -webkit-transition: 0.3s ease-in-out all;
  &:hover {
    background-color: #000;
  }
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
