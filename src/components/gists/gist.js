import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class Gist extends Component {

  state = {
    gistContents: null,
  }

  async componentDidMount() {
    const req = await fetch(this.props.body)
    const text = await req.text();

    if (text === this.state.gistContents) {
      return null;
    }

    this.setState({ gistContents: text });
  }

  render() {
    const { id, title, comments, commentsCount } = this.props;
    return (
      <div>
        <h4>{title}</h4>
        <ReactMarkdown source={this.state.gistContents} />
        <ul>
          <li>{id}</li>
          <li>{commentsCount}</li>
          <li>{comments}</li>
        </ul>
      </div>
    );
  }
}

