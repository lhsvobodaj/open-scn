/**
 * Copyright (2018) Luiz Hermes Svoboda Junior
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 */

import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import LoginForm from 'grommet/components/LoginForm';
import Toast from 'grommet/components/Toast';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/session';
import { Error } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onSubmit(fields) {
    this.props.dispatch(login(fields.username, fields.password));
  }

  onClose() {
    this.props.dispatch({type: Error.HIDE});
  }

  render() {
    const error = this.props.error;
    let errorComponent;

    if (error && error.status) {
      errorComponent = (
        <Toast status={error.status} onClose={this.onClose}>{error.message}</Toast>
      );
    }

    return (
      <Box align='center' alignContent='center' appCentered={true}>
        {errorComponent}
        <LoginForm
          align='center'
          title='OpenSCN'
          secondaryText='Open Scientific Community Network'
          onSubmit={this.onSubmit}
          usernameType='email'
        />
      </Box>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object,
  error: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    session: state.session,
    error:state.error
  };
};

export default connect(mapStateToProps)(Login);
