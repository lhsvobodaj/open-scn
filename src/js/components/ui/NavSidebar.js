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

import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import React from 'react';

import { Component } from 'react';

export class NavSidebar extends Component {

  render() {
    return (
      <Sidebar fixed={true} colorIndex='neutral-3'>
        <Header>
          <Title>PLOS App</Title>
        </Header>
        <Menu fill={true} primary={true}>
          <Anchor key='Dashboard' path='/dashboard' label='Dashboard'/>
          <Anchor key='Papers' path='/papers' label='Papers'/>
        </Menu>
      </Sidebar>
    );
  }

}
