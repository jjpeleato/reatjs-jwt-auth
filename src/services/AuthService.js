import jwtDecode from 'jwt-decode';

class AuthService {
  constructor() {
    this.domain = process.env.REACT_APP_URL_AUTH;
  }

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
  isLogin = () => {
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
   * Retrieves the user token from localStorage
   *
   * @returns {string}
   */
  getToken = () => localStorage.getItem('token');
}

export default AuthService;
