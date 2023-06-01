// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract SiteHost {
    mapping(address => bytes32[]) public sites;

    function uploadSite(bytes32 siteToken) public {
        sites[msg.sender].push(siteToken);
    }

    function getSites() public view returns (bytes32[] memory) {
        return sites[msg.sender];
    }
}
