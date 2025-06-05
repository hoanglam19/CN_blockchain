// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GuessNumber {
    uint private secretNumber;
    address public owner;

    event GuessResult(address indexed player, bool success, uint guessedNumber);

    constructor() {
        owner = msg.sender;
        secretNumber = 7; // Có thể thay đổi để test
    }

    function guess(uint number) public payable returns (bool) {
        require(msg.value >= 0.01 ether, "Need to send at least 0.01 ETH");

        bool success = (number == secretNumber);

        if (success) {
            payable(msg.sender).transfer(address(this).balance);
        }

        emit GuessResult(msg.sender, success, number);
        return success;
    }

    // 👉 Hàm test để lộ số đúng (chỉ nên dùng ở local test)
    function revealSecretNumber() public view returns (uint) {
        return secretNumber;
    }
}
