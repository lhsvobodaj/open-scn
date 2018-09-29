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

import { SESSION_LOAD } from './index';

const localStorage = window.localStorage;

const sessionLoad = (email, name, token) => {
  return {
    type: SESSION_LOAD,
    payload: {
      email, name, token
    }
  };
};

export const login = (email, password) => {
  return dispatch => {
    const url = 'http://localhost:3001/session';
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({'email': email, 'password': password})
    };

    fetch(url, options)
      .then(response => response.json())
      .then(result => {
        try {
          const { email, name, token } = result;

          localStorage.email = email;
          localStorage.name = name;
          localStorage.token = token;

          dispatch(sessionLoad(email, name, token));
        } catch (error) {
          console.log('Unable to save session (maybe because of private mode)');
        }
        window.location = '/dashboard'; // reload fully
      })
      .catch(error => console.log(error));
  };
};

export const initialize = () => {
  return dispatch => {
    const { email, name, token } = localStorage;

    if (email && token) {
      dispatch(sessionLoad(email, name, token));
    } else {
      window.location = '/login';
    }
  };
};
