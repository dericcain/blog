import React, { Component } from 'react';
import styled from 'styled-components';

const HoneypotField = styled.p`
  display: none;
`;

const encode = data =>
  Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');

class Subscribe extends Component {
  state = {
    email: '',
    'bot-field': '',
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'subscribe', ...this.state }),
    })
      .then(result => {
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
      <form
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
        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" onChange={this.handleOnChange} />
        </label>
        <button type="submit">Sign up!</button>
      </form>
    );
  }
}

export default Subscribe;
