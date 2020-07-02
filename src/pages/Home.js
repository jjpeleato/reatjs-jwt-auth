import React, { Component } from 'react';
import PropTypes from 'prop-types';
import authRequired from '../components/AuthRequired';

class Home extends Component {
  constructor(props) {
    super(props);

    const {
      user,
    } = props;

    this.state = {
      user,
    };
  }

  render = () => {
    const { user } = this.state;
    return (
      <div className="home">
        <p className="home__text">
          Hello
          {user.name}
        </p>
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default authRequired(Home);
