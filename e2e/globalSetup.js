/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { spawn } = require('child_process');
const kill = require('tree-kill');
const mongoGlobalSetup = require('@shelf/jest-mongodb/lib/setup');

const port = process.env.PORT || 8080;
const baseUrl = process.env.REMOTE_URL || `http://127.0.0.1:${port}`;

const __e2e = {
  port,
  baseUrl,
  testUserCredentials: {
    name: 'Name User',
    email: 'test@test.com',
    password: '123456',
  },
  testUserToken: null,
  childProcessPid: null,
};

const fetch = (url, opts = {}) => import('node-fetch')
  .then(({ default: fetch }) => fetch(`${baseUrl}${url}`, {
    ...opts,
    headers: {
      'content-type': 'application/json',
      ...opts.headers,
    },
    ...(
      opts.body && typeof opts.body !== 'string'
        ? { body: JSON.stringify(opts.body) }
        : {}
    ),
  }));

const fetchWithAuth = (token) => (url, opts = {}) => fetch(url, {
  ...opts,
  headers: {
    ...opts.headers,
    authorization: `Bearer ${token}`,
  },
});

const fetchAsTestUser = (url, opts) => fetchWithAuth(__e2e.testUserToken)(url, opts);

const createTestUser = () => fetch('/users', {
  method: 'POST',
  body: __e2e.testUserCredentials,
})
  .then((resp) => {
    if (resp.status !== 201) {
      throw new Error(`Error: Could not create test user - response ${resp.status}`);
    }

    return fetch('/login', { method: 'POST', body: __e2e.testUserCredentials });
  })
  .then((resp) => {
    if (resp.status !== 200) {
      throw new Error(`Error: Could not authenticate test user - response ${resp.status}`);
    }
    return resp.json();
  })
  .then((data) => {
    Object.assign(__e2e, { testUserToken: data.accessToken });
  });

const waitForServerToBeReady = (retries = 10) => new Promise((resolve, reject) => {
  if (!retries) {
    reject(new Error('Server took too long to start'));
  }

  setTimeout(() => {
    fetch('/')
      .then((resp) => (
        (resp.status !== 200)
          ? reject(new Error(`GET / responded with ${resp.status}`))
          : resolve()
      ))
      .catch(() => waitForServerToBeReady(retries - 1).then(resolve, reject));
  }, 1000);
});
module.exports = async () => {
  if (process.env.REMOTE_URL) {
    console.info(`Running tests on remote server ${process.env.REMOTE_URL}`);
    return;
  }

  try {
    await mongoGlobalSetup({ rootDir: __dirname });
    console.info('\n Starting local server...');

    const child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['start', port], {
      cwd: path.resolve(__dirname, '../'),
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { PATH: process.env.PATH, MONGO_URL: process.env.DB_URL },
    });

    Object.assign(__e2e, { childProcessPid: child.pid });

    child.stdout.on('data', (chunk) => {
      console.info(`\x1b[34m${chunk.toString()}\x1b[0m`);
    });

    child.stderr.on('data', (chunk) => {
      const str = chunk.toString();
      if (/DeprecationWarning/.test(str)) {
        return;
      }
      console.error('child::stderr', str);
    });

    process.on('uncaughtException', (err) => {
      console.error('UncaughtException!');
      console.error(err);
      kill(child.pid, 'SIGKILL', () => process.exit(1));
    });

    await waitForServerToBeReady();
    await createTestUser();
  } catch (error) {
    console.log('Error during global setup:', error);
    throw error;
  }
};

global.__e2e = __e2e;

process.baseUrl = baseUrl;
process.fetch = fetch;
process.fetchWithAuth = fetchWithAuth;
process.fetchAsTestUser = fetchAsTestUser;
