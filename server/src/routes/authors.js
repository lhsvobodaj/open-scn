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
const web3Client = require('../web3Client');
const AuthorSchema = require('../schema/author.json');
const { Validator } = require('express-json-validator-middleware');
const validator = new Validator({allErrors: true});
const validate = validator.validate;

router.get('/', async (req, res, next) => {
  try {
    const contract = await web3Client.getContract();
    const authors = await contract.getAuthors();

    res.status(200).json({authors});
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contract = await web3Client.getContract();
    const author = await contract.getAuthor(req.params.id);

    res.status(200).json({
      id: author[0],
      name: author[1],
      h_index: author[2]
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', validate({body: AuthorSchema}), async (req, res, next) => {
  try {
    if (!req.header('X-Auth-Token'))
      throw Error('Missing X-Auth-Token header');

    const address = req.header('X-Auth-Token');
    const contract = await web3Client.getContract();
    const body = req.body;

    await contract.registerAuthor(body.name, body.h_index,
      {from: req.header('X-Auth-Token'), gas: 3000000});

    res.status(200).json({
      id: address,
      name: body.name,
      h_index: body.h_index
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
