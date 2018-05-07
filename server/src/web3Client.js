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

const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');

if (provider.sendAsync !== 'function') {
  provider.sendAsync = provider.send.bind(provider);
}

const truffleContract = require('truffle-contract');
const PapersJSON = require('../build/contracts/Papers.json');
const Papers = truffleContract(PapersJSON);

Papers.setProvider(provider);

const web3 = new Web3(provider);

module.exports = web3;

module.exports.getPapersContract = async () => {
  try {
    return await Papers.deployed();
  } catch (err) {
    console.error('Could not fetch Papers contract instance');
    throw err;
  }
};
