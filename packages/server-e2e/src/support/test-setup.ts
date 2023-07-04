/* eslint-disable */

import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config();

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '4000';
  axios.defaults.baseURL = `http://${host}:${port}/graphql`;

  // Set the database to use for tests.
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
};
