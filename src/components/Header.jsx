import React from 'react';
import styled from 'styled-components';

import { red, grey } from '../styles/colors';

const StyledHeader = styled.header`
  text-align: center;
`;

const Title = styled.h1`
  
`;

const SubTitle = styled.p`
  font-family: 'Lora', serif;
  color: ${grey.default};
`;

const Header = ({ title, subtitle }) => (
  <StyledHeader>
    <Title>{title}</Title>
    <SubTitle>{subtitle}</SubTitle>
  </StyledHeader>
);

export default Header;
