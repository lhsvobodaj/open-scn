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

    string id;
    string title;
    address author;

    constructor(string _id, string _title, address _author) public {
        id = _id;
        title = _title;
        author = _author;
    }

    function getId() public view returns(string) {
        return id;
    }

    function getTitle() public view returns(string) {
        return title;
    }

    function setTitle(string _title) public {
        require(msg.sender == author, "Only authors can change the title");

        title = _title;
    }

    function getAuthor() public view returns(address) {
        return author;
    }

}