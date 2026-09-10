import { test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

test.describe('Unit Test', () => {

  test('Testing environment variables', async () => {
    const qaEnvPath = path.resolve(__dirname, '../../QA.env');
    const qaEnvVariables = readFileSync(qaEnvPath, 'utf8')
      .split(/\r?\n/)
      .filter(line => line.trim() && !line.trim().startsWith('#'));

    for (const variable of qaEnvVariables) {
      console.log(variable);
    }
  });

  test('Testing environment variables SPECIFIC', async () => {
    console.log('USER:', process.env.USER);
    console.log('MY_CHAMPIONS_TEAM:', process.env.MY_CHAMPIONS_TEAM);
  });
});