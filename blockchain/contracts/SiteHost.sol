// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract SiteHost {
    struct Site {
        string siteToken;
    }

    mapping(address => Site[]) public sites;

    function uploadSite(string memory _siteToken) public {
        Site memory newSite = Site(_siteToken);
        sites[msg.sender].push(newSite);
    }

    function getSites(address _user) public view returns (Site[] memory) {
        return sites[_user];
    }
}
