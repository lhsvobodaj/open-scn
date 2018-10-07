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

import React from 'react';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../actions/session';

class NavSidebar extends Component {

  constructor(props) {
    super(props);

    this._onClickLogout = this._onClickLogout.bind(this);
  }

  _onClickLogout() {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <Sidebar pad='small' size='small' colorIndex='neutral-3'>
        <Header justify='between'>
          <Title>OpenSCN</Title>
        </Header>
        <Menu size='small' fill={true} primary={true}>
          <Anchor key='Dashboard' path='/dashboard' label='Dashboard'/>
          <Anchor key='Papers' path='/papers' label='Papers'/>
        </Menu>
        <Footer>
          <Button label='Logout' onClick={this._onClickLogout} />
        </Footer>
      </Sidebar>
    );
  }

}

NavSidebar.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(NavSidebar);
