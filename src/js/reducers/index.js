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

import { Error, Session, Papers, Paper } from '../actions';

const sessionReducer = (state={}, action) => {
  switch (action.type) {
  case Session.LOAD:
  case Session.END:
    return action.payload;
  default:
    return state;
  }
};

const papersReducer = (state=[], action) => {
  switch (action.type) {
  case Papers.LOAD:
    return action.payload;
  default:
    return state;
  }
};

const paperReducer = (state={}, action) => {
  switch (action.type) {
  case Paper.LOAD:
  case Paper.NEW:
    return action.payload;
  case Paper.ON_CHANGE: {
    let change = action.payload;
    state[change.field] = change.content;

    return state;
  }
  default:
    return state;
  }
};

const errorReducer = (state={}, action) => {
  switch (action.type) {
  case Error.SHOW:
    return action.payload;
  case Error.HIDE:
    return {};
  default:
    return state;
  }
};

export default combineReducers(
  {
    session: sessionReducer,
    papers: papersReducer,
    paper: paperReducer,
    error: errorReducer
  }
);
