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

const express = require('express');
const router = express.Router();

// [FIXME] static sample data
const data = require('../../papers.json');

const web3Client = require('../web3Client');

router.get('/', async (req, res) => {
  const papersContract = await web3Client.getPapersContract();

  console.log(papersContract);
  console.log('carregou o contrato com sucesso');

  res.json(data);
});

module.exports = router;
