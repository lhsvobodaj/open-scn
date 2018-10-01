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

import App from 'grommet/components/App';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import { Component } from 'react';

import NotImplemented from './components/ui/NotImplemented';
import Papers from './components/containers/Papers';
import Login from './components/containers/Login';

export class Main extends Component {

  render() {
    return (
      <App centered={false}>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path='/' component={NotImplemented} />
            <Route path='/dashboard' component={NotImplemented} />
            <Route path='/papers' component={Papers} />
            <Route path='/login' component={Login} />
          </Switch>
        </BrowserRouter>
      </App>
    );
  }

}
