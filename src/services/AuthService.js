import jwtDecode from 'jwt-decode';

class AuthService {
  constructor() {
    this.domain = process.env.REACT_APP_URL_AUTH;
  }

  /**
   * TODO Short description
   *
   * @param username
   * @param password
   */
  login = (username, password) => {
    this.setToken(username + password);
  }

  /**
   * Clear user token and profile data from localStorage
   */
  logout = () => {
    localStorage.removeItem('token');
  }

  /**
   * Checks if there is a saved token and it's still valid
   *
   * @returns {boolean}
   */
  isLoggedIn = () => {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * Checks if the token is expired
   *
   * @param token
   * @returns {boolean}
   */
  isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (e) {
      return false;
    }
  }

  /**
   * Saves user token to localStorage
   *
   * @param token
   */
  setToken = (token) => {
    localStorage.setItem('token', token);
  }

  /**
   * Retrieves the token from localStorage
   *
   * @returns {string}
   */
  getToken = () => localStorage.getItem('token');

  /**
   * Retrieves the user from token
   *
   * @returns {*}
   */
  getProfile() {
    return jwtDecode(this.getToken());
  }
}

export default AuthService;
