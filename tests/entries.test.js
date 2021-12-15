const { wallets } = require('../src/core');

test('Calculate total of wallet - correct values', () => {
  let entries1 = [
    {
      value: 0
    },
    {
      value: 1.5
    },
    {
      value: 2
    },
    {
      value: 3
    }
  ]
  let total1 = wallets.entries.countEntriesTotal(entries1)
  expect(total1).toBe(6.5)
});

test('Calculate total of wallet - error values', () => {
  let entries1 = [
    {
      value: ''
    },
    {
      value: 1.5
    },
    {
      value: 2
    },
    {
      value: 3
    }
  ]
  let total1 = wallets.entries.countEntriesTotal(entries1)
  expect(total1).toBe(6.5)
});