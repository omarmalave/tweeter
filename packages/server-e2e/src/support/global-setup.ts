/* eslint-disable */
import { promisify } from 'util';
import { exec as execCb } from 'child_process';

const exec = promisify(execCb);

module.exports = async function () {
  console.log('\nSetting up...\n');

  try {
    // Run Docker Compose
    await exec('docker compose -f packages/server-e2e/docker-compose.yml up -d');

    // Run migrations
    await exec('docker compose -f packages/server-e2e/docker-compose.yml exec server npx prisma migrate dev --skip-seed')

  } catch (error) {
    console.log('Error during global setup: ', error);
    process.exit(1);
  }

  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
