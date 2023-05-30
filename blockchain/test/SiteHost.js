// Import the assert module
const assert = require('assert');
const SiteHost = artifacts.require('SiteHost');

contract('SiteHost', (accounts) => {
  it('should allow a user to upload a site', async () => {
    const siteHost = await SiteHost.deployed();

    const user = accounts[0];
    const siteToken = 'testSiteToken';

    // User uploads a site
    await siteHost.uploadSite(siteToken, { from: user });

    // Get the sites of the user
    const userSites = await siteHost.getSites();

    // Check if the uploaded site is in the user's sites
    assert.strictEqual(userSites[0].siteToken, siteToken);
  });
});
