const app = require('../../src/app');

describe('\'wallets\' service', () => {
  it('registered the service', () => {
    const service = app.service('wallets');
    expect(service).toBeTruthy();
  });
});
