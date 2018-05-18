import React from 'react';
import styled from 'styled-components';

import { red } from '../styles/colors';

const LoaderText = styled.h4`
  color: ${red.light};
`;

const Loading = ({ isActive }) => isActive
  ? <LoaderText>Loading...</LoaderText>
  : null;

export default Loading;
