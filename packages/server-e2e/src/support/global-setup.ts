/* eslint-disable */
import { promisify } from 'util';
import { exec as execCb } from 'child_process';

const exec = promisify(execCb);

let __TEARDOWN_MESSAGE__: string;
let __ORIGINAL__DATABASE_URL__: string;

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  try {
    // Build the server
    await exec('npx nx run server:build --bundle');

    // Run Docker Compose
    await exec('docker compose -f packages/server-e2e/docker-compose.yml up -d');

    // Give the DB container some time to initialize, if needed
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Reset the test database
    await exec('npx prisma migrate reset --force');

  } catch (error) {
    console.log('Error during global setup: ', error);
    process.exit(1);
  }

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
