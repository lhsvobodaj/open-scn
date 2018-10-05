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

import Box from 'grommet/components/Box';
import LoginForm from 'grommet/components/LoginForm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/session';

class Login extends Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(fields) {
    this.props.dispatch(login(fields.username, fields.password));
  }

  render() {
    return (
      <Box align='center' alignContent='center' appCentered={true}>
        <LoginForm
          align='center'
          title='OpenSCN'
          secondaryText='Open Scientific Community Network'
          onSubmit={this._onSubmit}
          usernameType='email'
        />
      </Box>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(Login);
