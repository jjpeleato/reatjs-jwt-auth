import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ROUTE_LOGIN } from '../constants/routes';
import AuthService from '../services/AuthService';

const authRequired = (AuthComponent) => {
  class AuthContainer extends Component {
    constructor(props) {
      super(props);

      const { history } = props;

      this.state = {
        history,
        user: null,
      };

      this.authService = new AuthService();
    }

    componentDidMount = () => {
      const { history } = this.state;

      if (this.authService.isLoggedIn() === false) {
        history.replace(ROUTE_LOGIN);
      } else {
        try {
          const profile = this.authService.getProfile();
          this.setState({
            user: profile,
          });
        } catch (e) {
          this.authService.logout();
          history.replace(ROUTE_LOGIN);
        }
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
  }

  AuthContainer.propTypes = {
    history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
  };

  return AuthContainer;
};

export default authRequired;
