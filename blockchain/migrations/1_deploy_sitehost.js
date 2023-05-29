const SiteHostContract = artifacts.require('SiteHost');

module.exports = function (deployer) {
  deployer.deploy(SiteHostContract);
};
