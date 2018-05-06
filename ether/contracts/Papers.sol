pragma solidity ^0.4.23;

import "./Paper.sol";

contract Papers {

    mapping(address => Paper) private papers;
    address[] refs;

    function createPaper(string title) public {
        Paper p = new Paper(msg.sender, title);

        refs.push(p.getAddress());
        papers[p.getAddress()] = p;
    }

    function getPapers() public view returns (address[]) {
        return refs;
    }

}
