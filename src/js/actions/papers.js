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

import { Papers } from './index';
import Conf from '../open-scn';

const BASE_URL = `http://${Conf.server.host}:${Conf.server.port}/paper`;

export const loadPapers = () => {
  return dispatch => {
    const options = { method: 'GET' };

    fetch(BASE_URL, options)
      .then(response => response.json())
      .then(papers => {
        dispatch({ type: Papers.LOAD, payload: papers });
      })
      .catch(error => console.log(error));
  };
};
