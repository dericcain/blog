import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

import { primary, white } from '../assets/styles/colors'

const Nav = styled.nav`
  position: fixed;
  width: 260px;
  top: 0;
  left: 0;
  height: 100%;
  background: ${primary};
  padding: 18px;
`;

const SiteName = styled.h4`
  color: ${white};
  text-align: center;
  font-weight: 300;
`;

const Header = () => (
  <Nav>
    <SiteName>Deric Cain</SiteName>
  </Nav>
)

export default Header
