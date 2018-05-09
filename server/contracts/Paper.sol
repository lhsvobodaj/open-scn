pragma solidity ^0.4.23;

contract Paper {

    struct Author {
        address addr;
        string name;
    }

    Author private author;
    string private title;
    string private summary;

    // FIXME [svoboda] content should be saved in a git repository
    string private content;

    struct Contributor {
        address author;
        string content;
    }

    struct Reviewer {
        address author;
        string review;
    }

    modifier checkAuthor {
        require(author.addr == msg.sender);
        _;
    }

    constructor(address owner, string name, string newTitle) public {
        author = Author(owner, name);
        title = newTitle;
    }

    function getAuthor() public view returns (string) {
        return author.name;
    }

    function getTitle() public view returns (string) {
        return title;
    }

    function setSummary(string newSummary) external checkAuthor {
        summary = newSummary;
    }

    function getSummary() public view returns (string) {
        return summary;
    }

    function setContent(string newContent) external checkAuthor {
        content = newContent;
    }

    function getContent() public view returns (string) {
        return content;
    }

}
