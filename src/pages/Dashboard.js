import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Auth from '../services/auth';

class Dashboard extends Component {

  renderIfAuthed() {
    const isLoggedIn = Auth.check();
    if (!isLoggedIn) {
      return (
        <Redirect to={{ pathname: '/' }} />
      );
    }
    return (
      <div>We are here</div>
    );
  }

  render() {
    return this.renderIfAuthed();
  }
}

export default Dashboard;
