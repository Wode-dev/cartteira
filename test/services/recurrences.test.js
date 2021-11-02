const app = require('../../src/app');

describe('\'recurrences\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/recurrences');
    expect(service).toBeTruthy();
  });
});
