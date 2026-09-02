import { FullConfig } from '@playwright/test';
import { env } from '../../playwright.config';

// Ensure environment variables are loaded using require
// .env files are loaded in order of precedence: .env.local overrides .env
// .env derived variables supercede variables set in the system or CI/CD pipeline

//require('dotenv').config({ path: require('path').resolve(__dirname, '.env.local') });
//require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

async function globalSetup(config?: FullConfig) {

  // Environment variables from Azure DevOps
  // These match one to one variable names from the Azure DevOps variable group referenced in the pipeline
  // or inline variables defined in the pipeline itself
  const environment = env;
  const DEBUG = process.env.DEBUG || false;

  console.log(`Building Config for Test Run against: ${environment}`);

  // Store environment config globally
  process.env.PLAYWRIGHT_ENV_VAR_CONFIG = JSON.stringify({
    environment,
    DEBUG,
  });
}

export default globalSetup;