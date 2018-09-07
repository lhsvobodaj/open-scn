pragma solidity ^0.4.23;

contract OpenSCN {

    struct Author {
        bool exists;
        string name;
        uint8 h_index;
    }

    struct Paper {
        address owner;
        address[] contributors;
        address[] reviewers;
        string content; // UUID for a file in the filesystem
    }

    mapping(address => Author) private authors;
    address[] private authorRefs;

    mapping(address => Paper) private papers;
    address[] private paperRefs;

    function getPapers() public view returns (address[]) {
        return paperRefs;
    }

    function getAuthors() public view returns (address[]) {
        return authorRefs;
    }

    function register(string name, uint8 h_index) public {
        if (authors[msg.sender].exists) {
            revert("Author already registered!");
        }
        // Creates a temporary struct in memory - solidity will generate code
        // to copy the struct from memory to storage 
        Author memory author = Author(true, name, h_index);
        
        authors[msg.sender] = author;
        
        authorRefs.push(msg.sender);
    }

}
