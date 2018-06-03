import React, { Component } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import { FormWrapper, Form, Input, Label, SuccessMessage } from '../components/Form';
import Button from '../components/Button';
import { ADD_SUBSCRIBER } from '../services/routes';
import { grey } from '../styles/colors';

const GoBack = styled(Link)`
  display: block;
  text-align: center;
  background: none;
  border: none;
  color: ${grey.default};
  padding: 12px;
  font-weight: 300;
  margin-bottom: 12px;
  height: 52px;
  width: 100%;
`;

class Subscribe extends Component {
  state = {
    email: '',
    isSuccess: false,
    buttonIsDisabled: false,
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      isSuccess: false,
      buttonIsDisabled: true,
    });

    try {    
      const response = await fetch(ADD_SUBSCRIBER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.email,
        }),
      });

      console.log(response);

      this.setState({
        isSuccess: true,
        email: '',
      });
    } catch (error) {
      this.setState({ error: 'There was an error. Sorry.' });
      throw new Error(error);
    } finally {
      this.setState({ buttonIsDisabled: false });
    }
  };

  handleOnChange = ({ currentTarget }) => {
    this.setState({ [currentTarget.name]: currentTarget.value });
  };

  render() {
    return (
      <FormWrapper>
        <h1>Want to be notified?</h1>
        <p>
          I will gladly send you an email when I write new content. I also vow to protect your email
          address and will never share it with anyone.
        </p>
        <Form name="subscribe" method="POST" onSubmit={this.handleSubmit}>
          <Label htmlFor="email">
            Email
            <Input type="email" id="email" name="email" onChange={this.handleOnChange} />
          </Label>
          <Button type="submit" disabled={this.state.buttonIsDisabled}>
            Sign up!
          </Button>
          <GoBack to="/">Go back</GoBack>
          <SuccessMessage isActive={this.state.isSuccess}>
            You have been added to the list!
          </SuccessMessage>
        </Form>
      </FormWrapper>
    );
  }
}

export default Subscribe;
