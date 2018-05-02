import React, { Component } from 'react'
import Link from 'gatsby-link'

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
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Link to="/page-2/">Go to page 2</Link>
        <Gists gists={this.state.gists} />
      </div>
    );
  }
}
