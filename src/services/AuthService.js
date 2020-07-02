import jwtDecode from 'jwt-decode';

class AuthService {
  constructor() {
    this.domain = process.env.REACT_APP_URL_AUTH;
  }

  /**
   * Login process and set token
   *
   * @param email
   * @param password
   */
  login = (email, password) => this.fetch(this.domain, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => {
    this.setToken(res.token);
    return Promise.resolve(res);
  })

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

  /**
   * Performs api calls sending the required authentication headers
   *
   * @param url
   * @param options
   * @returns {Promise<any>}
   */
  fetch = (url, options) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (this.isLoggedIn()) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }

    return fetch(url, { headers, ...options })
      .then(this.checkStatus)
      .then((response) => response.json());
  }

  /**
   * Raises an error in case response status is not a success
   *
   * @param response
   * @returns {*}
   */
  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export default AuthService;
