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
      username: '',
      password: '',
    };

    this.authService = new AuthService();
  }

  componentDidMount() {
    if (this.authService.isLoggedIn() === true) {
      const { history } = this.state;
      history.replace(ROUTE_HOME);
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    if (username === '' || password === '') {
      return;
    }

    console.log(username, password);
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="login">
        <div className="login__box">
          <h1>Login</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="login__item"
              placeholder="Username"
              name="username"
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
              value="SUBMIT"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
};

export default Login;
