import React, { Component } from 'react'

import { gistsRequest } from '../services/gists';
import Gists from '../components/gists/gists'

export default class IndexPage extends Component {

  state = {
    gists: []
  };

  async componentDidMount() {
    const { gists } = await gistsRequest();
    this.setState({ gists }, () => console.log(this.state));
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <Gists gists={this.state.gists} />
      </div>
    );
  }
}
