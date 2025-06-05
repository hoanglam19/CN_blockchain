// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vote {
    uint public yesVotes;
    uint public noVotes;
    uint public deadline;
    mapping(address => bool) public hasVoted;

    constructor(uint durationInSeconds) {
        deadline = block.timestamp + durationInSeconds;
    }

    function vote(bool voteYes) external {
        require(block.timestamp < deadline, "Voting ended");
        require(!hasVoted[msg.sender], "Already voted");

        if (voteYes) yesVotes++;
        else noVotes++;

        hasVoted[msg.sender] = true;
    }

    function getDeadline() external view returns (uint) {
        return deadline;
    }
}
