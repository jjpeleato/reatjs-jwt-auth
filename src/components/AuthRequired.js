import React, { Component } from 'react';
import AuthService from '../services/AuthService';

const authRequired = (AuthComponent) => class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.state = {
      history: null,
      user: null,
    };
  }

  componentDidMount = () => {
    if (this.authService.isLogin() === false) {
      console.log('not login');
    } else {
      console.log('login');
    }
  }

  render = () => {
    const { history, user } = this.state;

    if (user !== null) {
      return (
        <AuthComponent history={history} user={user} />
      );
    }

    return null;
  }
};

export default authRequired;
