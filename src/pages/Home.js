import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../services/AuthService';
import authRequired from '../components/AuthRequired';

class Home extends Component {
  constructor(props) {
    super(props);

    const {
      history,
      user,
    } = props;

    this.state = {
      history,
      user,
    };

    this.authService = new AuthService();
  }

  handleLogout = () => {
    this.authService.logout();
    const { history } = this.state;
    history.replace('/login');
  }

  render = () => {
    const { user } = this.state;
    return (
      <div className="home">
        <p className="home__text">
          Hello
          {user.name}
        </p>
        <button
          type="button"
          className="form-submit"
          onClick={this.handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default authRequired(Home);
