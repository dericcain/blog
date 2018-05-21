import React, { Component } from 'react';
import styled from 'styled-components';

import { grey, red, green } from '../styles/colors';

const FormWrapper = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const HoneypotField = styled.p`
  display: none;
`;

const Input = styled.input`
  border: 1px solid ${grey.light};
  padding: 12px;
  
  &:focus {
    border: 1px solid ${grey.default};
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  background: ${red.dark};
  color: #fff;
  border: none;
  font-weight: 300;
  margin-bottom: 12px;
  
  &:hover {
    cursor: pointer;
  }
`;

const SuccessMessage = styled.div`
  padding: 12px;
  background: ${green};
  color: #fff;
  display: ${({ isActive }) => isActive ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`;

const encode = data =>
  Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');

class Subscribe extends Component {
  state = {
    email: '',
    'bot-field': '',
    isSuccess: false,
    buttonIsDisabled: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'subscribe', ...this.state }),
    })
      .then(result => {
        // Let the user know that they have signed up
        console.log(result);
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  handleOnChange = ({ currentTarget }) => {
    this.setState({ [currentTarget.name]: currentTarget.value });
  };

  render() {
    return (
      <FormWrapper>
        <h1>Want to be notified?</h1>
        <p>I will gladly send you an email when I write new content. I also vow to protect your
          email address and will never share it with anyone.</p>
        <Form
          name="subscribe"
          data-netlify-honeypot="bot-field"
          method="POST"
          data-netlify="true"
          onSubmit={this.handleSubmit}
        >
          <HoneypotField>
            <label htmlFor="bot-field">
              <input type="text" id="bot-field" name="bot-field" onChange={this.handleOnChange}/>
            </label>
          </HoneypotField>
          <Label htmlFor="email">
            Email
            <Input type="email" id="email" name="email" onChange={this.handleOnChange}/>
          </Label>
          <Button type="submit" disabled={this.state.buttonIsDisabled}>Sign up!</Button>
          <SuccessMessage isActive={this.state.isSuccess}>You have been added to the list!</SuccessMessage>
        </Form>
      </FormWrapper>
    );
  }
}

export default Subscribe;
