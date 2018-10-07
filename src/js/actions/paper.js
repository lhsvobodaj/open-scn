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

import { NEW_PAPER, LOAD_PAPER } from './index';

const createPaper = () => {
  return {
    type: NEW_PAPER
  };
};

const paperLoaded = (paper) => {
  return {
    type: LOAD_PAPER,
    payload: paper
  };
};

export const newPaper = () => {
  return dispatch => {
    dispatch(createPaper());
  };
};

export const savePaper = (author, paper) => {
  return dispath => {
    const url = 'http://localhost:3001/paper';
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Auth-Token': author
      },
      body: JSON.stringify(paper)
    };
    fetch(url, options)
      .then(response => response.json())
      .then(paper => dispath(paperLoaded(paper)))
      .catch(error => console.log(error));
  };
};

export const loadPaper = (address) => {
  return dispatch => {
    const url = 'http://localhost:3001/paper/' + address;
    const options = { method: 'GET' };

    fetch(url, options)
      .then(response => response.json())
      .then(result => dispatch(paperLoaded(result)))
      .catch(error => console.log(error));
  };
};
