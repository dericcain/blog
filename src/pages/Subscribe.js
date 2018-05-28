import React, { Component } from 'react';

import { FormWrapper, Form, Input, Label, SuccessMessage } from '../components/Form';
import Button from '../components/Button';

class Subscribe extends Component {
  state = {
    email: '',
    isSuccess: false,
    buttonIsDisabled: false,
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      isSuccess: false,
      buttonIsDisabled: true,
    });


      fetch('/.netlify/functions/add-subscriber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.email,
        }),
      }).then(() => {
        this.setState({
          isSuccess: true,
          email: '',
        });
      }).catch(e => {
        this.setState({ error: 'There was an error. Sorry.' });
        throw new Error(e);
      }).finally(() => {
        this.setState({ buttonIsDisabled: false });
      });
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
          <SuccessMessage isActive={this.state.isSuccess}>
            You have been added to the list!
          </SuccessMessage>
        </Form>
      </FormWrapper>
    );
  }
}

export default Subscribe;
