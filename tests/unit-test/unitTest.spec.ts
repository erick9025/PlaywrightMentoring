import { expect, test } from '@playwright/test';
import { configParameters } from '../../config/loadedConfig'
import { TestUtilities } from '../../utils/testUtilities';

test.describe('Unit Test', () => {

  function print(message: string = "") {
    TestUtilities.logToConsole(message);
  }

  test('JUST PRINT EVERYTHING', async () => {
    print("Base URL: " + configParameters.baseURL);
    print("erickVar: " + configParameters.erickVar);
    print("erickVarString: " + configParameters.erickVarString);
    print("erickVarInt: " + configParameters.erickVarInt);
    print("erickVarFloat: " + configParameters.erickVarFloat);
    print("erickVarBoolean: " + configParameters.erickVarBoolean);

    print("✅How many users found: " + configParameters.users.length);
    print("✅Users information below: ");

    // For each user
    configParameters.users.forEach(user => {

      print("...username: " + user.username);
      print("...password: " + user.password);
      print("...role: " + user.role);

      print("...✅How many accounts found: " + user.accounts.length);
      print("...✅Accounts information below: ");

      // For each account
      user.accounts.forEach(account => {
        print(".......accountNumber: " + account.accountNumber);
        print(".......nickname: " + account.nickname);
        print();
      })

      print();
    });
  });

  test('Compare against expected', async () => {
    expect(configParameters.baseURL).toBe('https://qa.ejimenez.com');
    expect(configParameters.erickVar).toBe('zwei');
    expect(configParameters.erickVarString).toBe('stringQA');
    expect(configParameters.erickVarInt).toBe(2);
    expect(configParameters.erickVarFloat).toBe(2.2);
    expect(configParameters.erickVarBoolean).toBe(true);

    expect(configParameters.users).toHaveLength(2);

    const expectedUsers = [
      {
        username: 'erick.1@test.com',
        password: 'Pass1',
        role: 'Admin',
        accounts: [
          { accountNumber: '0001', nickname: 'ONE' },
          { accountNumber: '0002', nickname: 'TWO' }
        ]
      },
      {
        username: 'erick.2@test.com',
        password: 'Pass2',
        role: 'Regular User',
        accounts: [
          { accountNumber: '0003', nickname: 'THREE' },
          { accountNumber: '0004', nickname: 'FOUR' }
        ]
      }
    ];

    configParameters.users.forEach((user, userIndex) => {
      expect(user.username).toBe(expectedUsers[userIndex].username);
      expect(user.password).toBe(expectedUsers[userIndex].password);
      expect(user.role).toBe(expectedUsers[userIndex].role);
      expect(user.accounts).toHaveLength(expectedUsers[userIndex].accounts.length);

      user.accounts.forEach((account, accountIndex) => {
        expect(account).toEqual(expectedUsers[userIndex].accounts[accountIndex]);
      });
    });
  });
});