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

'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const papersRouter = require('./routes/papers');
const authorsRouter = require('./routes/authors');
const sessionRouter = require('./routes/session');

const PORT = 3001;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/papers', papersRouter);
app.use('/author', authorsRouter);
app.use('/session', sessionRouter);

// Default error handler
app.use(function (err, req, res, next) { //eslint-disable-line no-unused-vars
  console.error('[stack]: \n' + err.stack);

  //FIXME (svoboda) proper error handling
  res.status(500).json({
    message: 'Service error',
    error: err.message
  });
});

app.listen(PORT);

console.log('Listening on port ' + PORT);
