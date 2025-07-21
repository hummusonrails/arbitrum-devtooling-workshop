// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 } from "forge-std/src/console2.sol";
import { StdCheats } from "forge-std/src/StdCheats.sol";
import { Counter } from "../src/Counter.sol";

contract CounterTest is PRBTest, StdCheats {
    Counter private counter;
    address owner = address(1);

    function setUp() public {
        counter = new Counter();
    }

    function testSetNumber() public {
        uint256 newNumber = 42;
        counter.setNumber(newNumber);
        assertEq(counter.number(), newNumber);
        console2.log("Set number to:", newNumber);
    }

    function testIncrement() public {
        // Test increment from 0
        counter.increment();
        assertEq(counter.number(), 1);
        
        // Test increment from existing value
        counter.setNumber(10);
        counter.increment();
        assertEq(counter.number(), 11);
        console2.log("Incremented to:", counter.number());
    }

    function testAddNumber() public {
        counter.setNumber(5);
        counter.addNumber(3);
        assertEq(counter.number(), 8);
        
        // Test adding zero
        counter.addNumber(0);
        assertEq(counter.number(), 8);
        console2.log("Added number, result:", counter.number());
    }

    function testMulNumber() public {
        counter.setNumber(5);
        counter.mulNumber(3);
        assertEq(counter.number(), 15);
        
        // Test multiplying by zero
        counter.mulNumber(0);
        assertEq(counter.number(), 0);
        
        // Test multiplying by one
        counter.setNumber(7);
        counter.mulNumber(1);
        assertEq(counter.number(), 7);
        console2.log("Multiplied number, result:", counter.number());
    }

    function testAddFromMsgValue() public {
        uint256 initialValue = 10;
        uint256 msgValue = 5 ether;
        
        counter.setNumber(initialValue);
        
        // Send ether with the call
        vm.deal(address(this), msgValue);
        counter.addFromMsgValue{value: msgValue}();
        
        assertEq(counter.number(), initialValue + msgValue);
        console2.log("Added msg.value, result:", counter.number());
    }

    function testInitialState() public {
        Counter newCounter = new Counter();
        assertEq(newCounter.number(), 0);
        console2.log("Initial counter value:", newCounter.number());
    }

    function testMultipleOperations() public {
        // Test a sequence of operations
        counter.setNumber(10);
        counter.increment();        // 11
        counter.addNumber(4);       // 15
        counter.mulNumber(2);       // 30
        
        assertEq(counter.number(), 30);
        console2.log("Final result after multiple operations:", counter.number());
    }

    function testFuzzSetNumber(uint256 randomNumber) public {
        counter.setNumber(randomNumber);
        assertEq(counter.number(), randomNumber);
    }

    function testFuzzAddNumber(uint256 initial, uint256 toAdd) public {
        vm.assume(initial <= type(uint256).max - toAdd); // Prevent overflow
        
        counter.setNumber(initial);
        counter.addNumber(toAdd);
        assertEq(counter.number(), initial + toAdd);
    }

    function testFuzzMulNumber(uint256 initial, uint256 multiplier) public {
        vm.assume(initial == 0 || multiplier <= type(uint256).max / initial); // Prevent overflow
        
        counter.setNumber(initial);
        counter.mulNumber(multiplier);
        assertEq(counter.number(), initial * multiplier);
    }

    function testGetNumber() public {
        // Test initial state
        assertEq(counter.getNumber(), 0);
        
        // Test after setting a value
        uint256 testValue = 42;
        counter.setNumber(testValue);
        assertEq(counter.getNumber(), testValue);
        assertEq(counter.getNumber(), counter.number()); // Should match public variable
        
        // Test after increment
        counter.increment();
        assertEq(counter.getNumber(), testValue + 1);
        
        console2.log("getNumber test passed, final value:", counter.getNumber());
    }
}
