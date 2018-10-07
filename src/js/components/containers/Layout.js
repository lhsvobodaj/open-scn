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
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';

import { Component } from 'react';
import PropTypes from 'prop-types';

import NavSidebar from '../ui/NavSidebar';

export default class Layout extends Component {
  render() {
    return (
      <Split priority='right' flex='right'>
        <NavSidebar />

        <Box pad='medium' align='stretch' justify='end' basis='full'>
          {this.props.children}
        </Box>
      </Split>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
};
