import styled from 'styled-components';
import { red } from '../styles/colors';

const Button = styled.button`
  padding: 12px;
  background: ${red.dark};
  color: #fff;
  border: none;
  font-weight: 300;
  margin-bottom: 12px;
  height: 52px;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
