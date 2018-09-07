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
    mapping(address => Author) public authors;
    address[] public authorRefs;

    /*
    MD5 used to address the content of the paper
    Function param input example:
      ["0x31", "0x32", "0x33", "0x34",
       "0x35", "0x36", "0x37", "0x38",
       "0x39", "0x30", "0x31", "0x32",
       "0x33", "0x34", "0x35", "0x36"]
    */
    mapping(bytes16 => Paper) public papers;
    bytes16[] public paperRefs;

    function registerAuthor(string name, uint8 h_index) public {
        require(!authors[msg.sender].exists, "Author already registered!");

        // Creates a temporary struct in memory - solidity will generate code
        // to copy the struct from memory to storage
        Author memory author = Author(true, name, h_index);

        authors[msg.sender] = author;
        authorRefs.push(msg.sender);
    }

    function createPaper(bytes16 md5) public returns (bool) {
        require(papers[md5].exists, "Paper already exists!");

        Paper memory paper = Paper(true, msg.sender, new address[](0), new address[](0));

        papers[md5] = paper;
        paperRefs.push(md5);
    }
}
