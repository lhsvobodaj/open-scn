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

import { LOAD_PAPERS } from './index';

const papersLoaded = (papers) => {
  return {
    type: LOAD_PAPERS,
    payload: papers
  };
};

export const loadPapers = () => {
  return dispatch => {

    // const sample = [
    //   {title: 'Sample title #1', abstract: 'Sample abstract #1'},
    //   {title: 'Sample title #2', abstract: 'Sample abstract #2'},
    //   {title: 'Sample title #3', abstract: 'Sample abstract #3'}
    // ];
    // dispatch(papersLoaded(sample));

    const url = 'http://localhost:3001/papers';
    const options = { method: 'GET' };

    fetch(url, options)
      .then(response => response.json())
      .then(result => {
        dispatch(papersLoaded(result));
      })
      .catch(error => console.log(error));
  };
};
