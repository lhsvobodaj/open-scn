pragma solidity ^0.4.23;

import "./Paper.sol";
//import "browser/Paper.sol";

contract Papers {

    mapping(address => Paper) private papers;
    address[] refs;

    function createPaper(string author, string title) public {
        Paper p = new Paper(msg.sender, author, title);

        refs.push(p);
        papers[p] = p;
    }

    function getPapers() public view returns (address[]) {
        return refs;
    }

    function getPaper(address paperAddress) external view returns (Paper) {
        return papers[paperAddress];
    }

}
