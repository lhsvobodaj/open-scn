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

import { combineReducers } from 'redux';

import * as Action from '../actions';

const NEW_PAPER = {
  title: undefined,
  description: undefined,
  address: undefined
};

const papersReducer = (state=[], action) => {
  if (action.type === Action.LOAD_PAPERS) {
    return action.payload;
  } else {
    return state;
  }
};

const paperReducer = (state=NEW_PAPER, action) => {
  if (action.type === Action.NEW_PAPER) {
    return NEW_PAPER;
  } else if (action.type === Action.LOAD_PAPER) {
    return action.payload;
  } else {
    return state;
  }
};

const sessionReducer = (state={}, action) => {
  if ((action.type === Action.SESSION_LOAD)
    || (action.type === Action.SESSION_END)) {
    return action.payload;
  } else {
    return state;
  }
};

export default combineReducers(
  {
    paper: paperReducer,
    papers: papersReducer,
    session: sessionReducer
  }
);
