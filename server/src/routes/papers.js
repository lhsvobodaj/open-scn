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

const fs = require('fs');
const express = require('express');
// const crypto = require('crypto');
const router = express.Router();
const web3Client = require('../web3Client');
const PaperSchema = require('../schema/paper.json');
const { Validator } = require('express-json-validator-middleware');
const validator = new Validator({allErrors: true});
const validate = validator.validate;

router.get('/', async (req, res, next) => {
  try {
    const contract = await web3Client.getContract();
    const response = await contract.getPapers();
    const papers = [];

    for (let i = 0; i < response.length; i++) {
      const paper = await contract.getPaper(response[i]);

      papers.push({
        title: paper[0],
        description: paper[1],
        author: paper[2]
      });
    }

    res.status(200).json(papers);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contract = await web3Client.getContract();
    const paper = await contract.getPaper(req.params.id);
    const rawData = fs.readFileSync(`./papers/${req.params.id}.json`);
    const content = JSON.parse(rawData);

    content.title = paper[0];
    content.description = paper[1];
    content.author = paper[2];

    res.status(200).json(content);
  } catch (err) {
    next(err);
  }
});

router.post('/', validate({body: PaperSchema}), async (req, res, next) => {
  try {
    if (!req.header('X-Auth-Token'))
      throw Error('Missing X-Auth-Token header');

    const contract = await web3Client.getContract();

    // Creates the paper - write data to the blockchain
    await contract.createPaper(
      req.body.title,
      req.body.description,
      {from: req.header('X-Auth-Token'), gas: 3000000});

    const address = await contract.getCreatedPaper();

    const paper = {
      address: address,
      title: req.body.title,
      description: req.body.description,
      abstract: null,
      content: null
    };

    fs.writeFileSync(`./papers/${address}.json`, JSON.stringify(paper));

    res.status(201).json(paper);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
