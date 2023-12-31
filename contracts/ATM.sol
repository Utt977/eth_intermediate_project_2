// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ATM {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event FundsTransferred(address indexed recipient, uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 _previousBalance = balance;
        balance += _amount;
        emit Deposit(_amount);
        assert(balance == _previousBalance + _amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }
        balance -= _withdrawAmount;
        emit Withdraw(_withdrawAmount);
        assert(balance == (_previousBalance - _withdrawAmount));
    }

    function transferFunds(address payable recipient, uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        require(balance >= amount, "Insufficient balance in the contract");
        recipient.transfer(amount);
        balance -= amount;
        emit FundsTransferred(recipient, amount);
    }

    function checkBalance() public view returns (uint256) {
        return balance;
    }
}
