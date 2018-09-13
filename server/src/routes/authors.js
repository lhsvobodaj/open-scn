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

router.get('/', async (req, res) => {
  try {
    const contract = await web3Client.getContract();
    const authors = await contract.getAuthors.call();

    res.status(200).json({authors});
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving authors',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const contract = await web3Client.getContract();
    const author = await contract.getAuthor(req.params.id).call();

    res.status(200).json({author});
  } catch (error) {
    // TODO (svoboda) here we can also have 404
    res.status(500).json({
      message: 'Error retrieving author',
      error: error.message
    });
  }
});

router.post('/', validate({body: AuthorSchema}), async (req, res) => {
  const contract = await web3Client.getContract();
  const body = req.body;

  let address = await contract.registerAuthor(body.name, body.h_index).call(
    {from: req.header('X-Auth-Token')});

  res.status(200).json({
    id: address,
    name: body.name,
    h_index: body.h_index
  });
});

module.exports = router;
