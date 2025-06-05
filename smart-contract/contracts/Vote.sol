// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vote {
    address public owner;
    uint256 public votingDeadline;

    string[] public candidates;
    mapping(string => uint256) public votes;
    mapping(address => bool) public hasVoted;

    constructor(string[] memory _candidates, uint256 _durationInMinutes) {
        owner = msg.sender;
        candidates = _candidates;
        votingDeadline = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    function vote(string memory _candidate) public {
        require(block.timestamp <= votingDeadline, "Voting has ended");
        require(!hasVoted[msg.sender], "You have already voted");

        bool validCandidate = false;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i])) == keccak256(bytes(_candidate))) {
                validCandidate = true;
                break;
            }
        }
        require(validCandidate, "Invalid candidate");

        votes[_candidate]++;
        hasVoted[msg.sender] = true;
    }

    function getVotes(string memory _candidate) public view returns (uint256) {
        return votes[_candidate];
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= votingDeadline) {
            return 0;
        }
        return votingDeadline - block.timestamp;
    }

    function getAllCandidates() public view returns (string[] memory) {
        return candidates;
    }
}
