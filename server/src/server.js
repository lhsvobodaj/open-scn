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
const cors = require('cors');

const papersRouter = require('./routes/papers');
const authorsRouter = require('./routes/authors');

const PORT = 3001;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/paper', papersRouter);
app.use('/author', authorsRouter);

app.listen(PORT);

console.log('Listening on port ' + PORT);
