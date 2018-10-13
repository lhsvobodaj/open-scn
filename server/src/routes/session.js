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
const SessionSchema = require('../schema/session.json');
const { Validator } = require('express-json-validator-middleware');
const validator = new Validator({allErrors: true});
const validate = validator.validate;

router.post('/', validate({body: SessionSchema}), async (req, res, next) => {
  try {
    const contract = await web3Client.getContract();
    const author = await contract.getAuthorByEmail(req.body.email);

    res.status(200).json({
      name: author[0],
      email: author[1],
      h_index: author[2],
      token: author[3]
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
