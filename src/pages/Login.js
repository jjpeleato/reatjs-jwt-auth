import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ROUTE_HOME } from '../constants/routes';
import AuthService from '../services/AuthService';

class Login extends Component {
  constructor(props) {
    super(props);

    const { history } = this.props;

    this.state = {
      history,
      email: '',
      password: '',
      error: '',
    };

    this.authService = new AuthService();
  }

  componentDidMount = () => {
    if (this.authService.isLoggedIn() === true) {
      const { history } = this.state;
      history.replace(ROUTE_HOME);
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { history, email, password } = this.state;

    if (email === '' || password === '') {
      return;
    }

    this.authService.login(email, password)
      .then(() => {
        history.replace(ROUTE_HOME);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render = () => {
    const { error } = this.state;

    return (
      <div className="login">
        <div className="login__box">
          <h1 className="login__title">Login</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="login__item"
              placeholder="Email"
              name="email"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="login__item"
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input
              className="login__submit"
              value="Submit"
              type="submit"
            />
          </form>
          <p className="login__result">{error}</p>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
};

export default Login;
