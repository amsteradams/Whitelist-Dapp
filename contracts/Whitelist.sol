// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitelist is Ownable{
    mapping(address => bool) public whitelist;
    address[] private Members;

    event MemberAdded(address indexed _addressAdded);

    constructor(){
        whitelist[msg.sender] = true;
        Members.push(msg.sender);
        emit MemberAdded(msg.sender);
    }

    function addMember(address _address)external onlyOwner{
        require(!whitelist[_address], "Address is already registered");
        whitelist[_address] = true;
        Members.push(_address);
        emit MemberAdded(_address);
    }

    function getMember(address _address)external view returns(bool){
        if(whitelist[_address]){
            return true;
        }
            return false;
    }

    function getMembers()external view returns(address[] memory){
        address[] memory tmpMembers = new address[](Members.length);
        for(uint i; i < Members.length; i++){
            tmpMembers[i] = Members[i];
        }
        return tmpMembers;
    }
    /*
    function delMember(address _address)external onlyOwner{
        require(whitelist[_address], "Member not registered");
        whitelist[_address] = false ;
        uint index;
        
        for(uint i; i < Members.length; i++){
            if(Members[i] == _address){
               index = i;
            }
        }
        //Members.pop();
    }
    */
}