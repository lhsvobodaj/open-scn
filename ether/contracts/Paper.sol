pragma solidity ^0.4.23;

contract Paper {

    address private author;

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

    constructor() public {
        author = msg.sender;
    }

}
