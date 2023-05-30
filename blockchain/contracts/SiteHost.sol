// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract SiteHost {
    struct Site {
        string siteToken;
        uint createdAt;
    }

    mapping(address => Site[]) public sites;

    function uploadSite(string memory _siteToken) public {
        Site memory newSite = Site(_siteToken, block.timestamp);
        sites[msg.sender].push(newSite);
    }

    function getSites() public view returns (Site[] memory) {
        return sites[msg.sender];
    }
}
