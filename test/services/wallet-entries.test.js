const app = require('../../src/app');

describe('\'walletEntries\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/wallets/:walletId/entries');
    expect(service).toBeTruthy();
  });
});
