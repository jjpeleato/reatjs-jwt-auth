import React, { Component } from 'react';
import authRequired from '../components/AuthRequired';

class Home extends Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    return (
      <p>Hello World!</p>
    );
  }
}

export default authRequired(Home);
