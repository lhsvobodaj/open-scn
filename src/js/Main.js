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
import Papers from './components/ui/Papers';
import Login from './components/ui/Login';
import Paper from './components/ui/Paper';
import Layout from './components/containers/Layout';

export class Main extends Component {

  render() {
    return (
      <App centered={false}>
        <BrowserRouter>
          <Switch>
            {/* <Route exact={true} path='/' component={NotImplemented} /> */}
            <Route path='/login' component={Login} />
            <Layout>
              <Route path='/dashboard' component={NotImplemented} />
              <Route exact path='/papers' component={Papers} />
              <Route path='/papers/:address' component={Paper} />
            </Layout>
          </Switch>
        </BrowserRouter>
      </App>
    );
  }

}
