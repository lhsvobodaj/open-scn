pragma solidity ^0.4.23;

contract Paper {

    address private author;
    string private title;

    struct Contributor {
        address author;
        string content;
    }

    struct Reviewer {
        address author;
        string review;
    }

    modifier checkAuthor {
        require(author == msg.sender);
        _;
    }

    constructor(address owner, string paperTitle) public {
        author = owner;
        title = paperTitle;
    }

    function getAddress() public view returns (address) {
        return this;
    }

}
