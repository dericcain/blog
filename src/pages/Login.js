import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import { FormWrapper, SuccessMessage, Label, Input, Form } from '../components/Form';
import { error } from '../styles/colors';
import Auth from '../services/auth';

const ErrorMessage = styled(SuccessMessage)`
  background: ${error};
`;

class Login extends Component {

  state = {
    email: '',
    password: '',
    attempts: 3,
    error: null,
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState(({ attempts }) => ({
      error: null,
      attempts: attempts - 1,
    }));

    if (this.state.attempts <= 0) {
      this.setState({ error: 'You have no more attempts. -The Gatekeeper' });
      return;
    }

    try {
      const isLoggedIn = await Auth.login(this.state.email, this.state.password);
      if (isLoggedIn) {

      } else {

      }
    } catch (e) {
      this.setState({ error: `You shall not pass. ${this.state.attempts} attempts left.` });
      throw new Error(e);
    }
  };

  render() {
    return (
      <FormWrapper>
        <h2>Only one can pass the gate.</h2>
        <Form onSubmit={this.handleSubmit}>
          <Label htmlFor="email">
            Email
            <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
          </Label>
          <Label htmlFor="password">
            Password
            <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
          </Label>
          <Button>Unlock the gate</Button>
          <ErrorMessage isActive={this.state.error}>{this.state.error}</ErrorMessage>
        </Form>
      </FormWrapper>
    );
  }
}

export default Login;
