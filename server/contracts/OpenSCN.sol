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

contract OpenSCN {

    struct Author {
        bool exists;
        string name;
        uint8 h_index;
    }

    struct Paper {
        bool exists;
        address owner;
        address[] contributors;
        address[] reviewers;
    }

    // solidity generates a public getter (ex.: authors.Author(0x1234))
    mapping(address => Author) authors;
    address[] authorRefs;

    /*
    MD5 used to address the content of the paper
    Function param input example:
      ["0x31", "0x32", "0x33", "0x34",
       "0x35", "0x36", "0x37", "0x38",
       "0x39", "0x30", "0x31", "0x32",
       "0x33", "0x34", "0x35", "0x36"]
    */
    mapping(bytes16 => Paper) papers;
    bytes16[] paperRefs;

    function getAuthors() public view returns(address[]) {
        return authorRefs;
    }

    function registerAuthor(string name, uint8 h_index) public {
        require(!authors[msg.sender].exists, "Author already registered!");

        // Creates a temporary struct in memory - solidity will generate code
        // to copy the struct from memory to storage
        Author memory author = Author(true, name, h_index);

        authors[msg.sender] = author;
        authorRefs.push(msg.sender);
    }

    function getAuthor(address _address) public view returns (address, string, uint8) {
        require(authors[_address].exists, "Author not registered!");

        Author memory author = authors[_address];

        return (_address, author.name, author.h_index);
    }

    function getPapers() public view returns (bytes16[]) {
        return paperRefs;
    }

    function createPaper(bytes16 md5) public returns (bytes16) {
        require(!papers[md5].exists, "Paper already exists!");

        Paper memory paper = Paper(true, msg.sender, new address[](0), new address[](0));

        papers[md5] = paper;
        paperRefs.push(md5);

        return md5;
    }
}
