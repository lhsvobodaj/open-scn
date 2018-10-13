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

import { Paper } from './index';

const EMPTY_PAPER = {
  address: undefined,
  title: '',
  description: '',
  abstract: '',
  content: ''
};

export const savePaper = (token, paper) => {
  return () => {
    // Default values to save a new paper
    let url = 'http://localhost:3001/paper';
    let method = 'POST';

    if (paper.address && paper.address.startsWith('0x')) {
      url += '/' + paper.address;
      method = 'PUT';
    }

    const options = {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Auth-Token': token
      },
      body: JSON.stringify(paper)
    };

    fetch(url, options)
      .then(response => response.json())
      .then(newPaper => window.location.href = '/papers/' + newPaper.address)
      .catch(error => console.log(error));
  };
};

export const onChangePaper = (field, content) => {
  return dispatch => {
    dispatch({
      type: Paper.ON_CHANGE,
      payload: {
        field,
        content
      }
    });
  };
};

export const loadPaper = (address) => {
  return dispatch => {
    if (address && address.startsWith('0x')) {
      const url = 'http://localhost:3001/paper/' + address;
      const options = { method: 'GET' };

      fetch(url, options)
        .then(response => response.json())
        .then(paper => dispatch({type: Paper.LOAD, payload: paper}))
        .catch(error => console.log(error));
    } else {
      dispatch({type: Paper.NEW, payload: EMPTY_PAPER});
    }
  };
};
