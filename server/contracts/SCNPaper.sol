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

pragma solidity ^0.4.23;

contract SCNPaper {

    string title;
    string description;
    address author;

    modifier onlyAuthor(address _address) {
        require(msg.sender == _address, "Sender not authorized!");
        _;
    }

    constructor(string _title, string _description, address _author) public {
        title = _title;
        description = _description;
        author = _author;
    }

    function getTitle() public view returns(string) {
        return title;
    }

    function setTitle(string _title) public onlyAuthor(author) {
        title = _title;
    }

    function getDescription() public view returns(string) {
        return description;
    }

    function setDescription(string _description) public onlyAuthor(author) {
        description = _description;
    }

    function getAuthor() public view returns(address) {
        return author;
    }

}