import React, { Component } from 'react';

import { FormWrapper, HoneypotField, Form, Input, Label, SuccessMessage } from '../components/Form';
import Button from '../components/Button';

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

    this.setState({
      isSuccess: false,
      buttonIsDisabled: true,
    });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'subscribe',
        email: this.state.email,
        'bot-field': this.state['bot-field'],
      }),
    })
      .then(() => {
        this.setState({
          isSuccess: true,
          email: '',
        });
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
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
        <Form
          name="subscribe"
          data-netlify-honeypot="bot-field"
          method="POST"
          data-netlify="true"
          onSubmit={this.handleSubmit}
        >
          <HoneypotField>
            <label htmlFor="bot-field">
              <input type="text" id="bot-field" name="bot-field" onChange={this.handleOnChange} />
            </label>
          </HoneypotField>
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
