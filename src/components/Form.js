import styled from 'styled-components';

import { grey, success } from '../styles/colors';

export const FormWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 12px 0;
`;

export const HoneypotField = styled.p`
  display: none;
`;

export const Input = styled.input`
  border: 1px solid ${grey.light};
  padding: 12px;
  height: 52px;
  
  &:focus {
    border: 1px solid ${grey.default};
    outline: none;
  }
`;

export const SuccessMessage = styled.div`
  padding: 12px;
  background: ${success};
  color: #fff;
  display: ${({ isActive }) => isActive ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`;
