/* eslint-disable */
import { promisify } from 'util';
import { exec as execCb } from 'child_process';

const exec = promisify(execCb);

module.exports = async function () {
  console.log(globalThis.__TEARDOWN_MESSAGE__);

  try {
    // Run Docker Compose down
    await exec('docker compose -f packages/server-e2e/docker-compose.yml down');
  } catch (error) {
    console.log('Error during global setup: ', error);
    process.exit(1);
  }
};
