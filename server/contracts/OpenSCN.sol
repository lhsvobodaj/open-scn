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

import "./SCNPaper.sol";

contract OpenSCN {

    struct Author {
        // flag to indicate whether the struct is valid
        bool exists;

        string name;
        uint8 h_index;
    }

    mapping(address => SCNPaper) papers;
    mapping(address => bool) papersInitialized;
    address[] paperRefs;

    // solidity generates a public getter when marked with public
    // (ex.: authors.Author(0x1234))
    mapping(address => Author) authors;
    address[] authorRefs;

    function getAuthors() public view returns(address[]) {
        return authorRefs;
    }

    function registerAuthor(string name, uint8 h_index) public {
        require(!authors[msg.sender].exists, "Author already registered");

        // Creates a temporary struct in memory - solidity will generate code
        // to copy the struct from memory to storage
        Author memory author = Author(true, name, h_index);

        authors[msg.sender] = author;
        authorRefs.push(msg.sender);
    }

    function getAuthor(address authorAddress) public view returns (address, string, uint8) {
        require(authors[authorAddress].exists, "Author not registered");

        Author memory author = authors[authorAddress];

        return (authorAddress, author.name, author.h_index);
    }

    function getPapers() public view returns(address[]) {
        return paperRefs;
    }

    function getPaper(address _address) public view returns(string, address) {
        require(papersInitialized[_address], "Paper doesn't exist");

        SCNPaper paper = papers[_address];

        return (paper.getTitle(), paper.getAuthor());
    }

    function createPaper(string title) public {
        require(authors[msg.sender].exists, "Cannot create paper - author not registered");

        SCNPaper paper = new SCNPaper(title, msg.sender);

        papers[paper] = paper;
        papersInitialized[paper] = true;
        paperRefs.push(paper);

        // Functions that write data to the blockchain don't return values.
        // Instead, they return the result of the transaction
        //return paper;
    }

    function getCreatedPaper() public view returns(address) {
        return paperRefs[paperRefs.length - 1];
    }

}
