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
const crypto = require('crypto');
const router = express.Router();
const web3Client = require('../web3Client');
const PaperSchema = require('../schema/paper.json');
const { Validator } = require('express-json-validator-middleware');
const validator = new Validator({allErrors: true});
const validate = validator.validate;

router.get('/', async (req, res) => {
  const contract = await web3Client.getContract();
  const papers = await contract.getPapers.call();

  res.status(200).json({papers});
});

router.get('/:id', async (req, res) => {
  const contract = await web3Client.getContract();
  const paper = await contract.getPaper(req.params.id).call();

  //TODO (svoboda) add support to load content from fs

  res.status(200).json({paper});
});

router.post('/', validate({body: PaperSchema}), async (req, res) => {
  const contract = await web3Client.getContract();

  const md5_created = crypto.createHash('md5').update(req.body.title).digest('hex');

  const md5_returned = await contract.createPaper(md5_created).call(
    {from: req.header('X-Auth-Token')});

  //TODO (svoboda) add support to create content in local fs

  res.status(200).json({id: md5_returned});
});

module.exports = router;
