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

import LoginForm from 'grommet/components/LoginForm';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { login } from '../../actions/session';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(fields) {
    this.props.dispatch(login(fields.username, fields.password));
  }

  render() {

    return (
      <LoginForm
        align='center'
        title='OpenSCN'
        secondaryText='Open Scientific Community Network'
        onSubmit={this._onSubmit}
        //errors={[error]}
        usernameType='email'
      />
    );
  }

}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object
};
