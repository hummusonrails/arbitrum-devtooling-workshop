// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * @title Counter
 * @dev A simple counter contract with various arithmetic operations
 * This is the Solidity equivalent of the Stylus counter contract
 */
contract Counter {
    uint256 public number;

    /**
     * @dev Sets the number to a new value
     * @param newNumber The new value to set
     */
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    /**
     * @dev Multiplies the current number by a new value
     * @param newNumber The value to multiply by
     */
    function mulNumber(uint256 newNumber) public {
        number = number * newNumber;
    }

    /**
     * @dev Adds a new value to the current number
     * @param newNumber The value to add
     */
    function addNumber(uint256 newNumber) public {
        number = number + newNumber;
    }

    /**
     * @dev Increments the number by 1
     */
    function increment() public {
        number++;
    }

    /**
     * @dev Adds the msg.value to the current number
     * This function is payable and adds the wei sent to the number
     */
    function addFromMsgValue() public payable {
        number = number + msg.value;
    }
}
