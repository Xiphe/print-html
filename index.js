'use strict';

const puppeteer = require('puppeteer');
const express = require('express');
const findFreePort = require('find-free-port');
const path = require('path');

function startServer(app, port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, (err) => {
      return err ? reject(err) : resolve(server);
    });
  });
}

function freePort() {
  return new Promise((resolve, reject) => {
    findFreePort(10000, (err, port) => {
      return err ? reject(err) : resolve(port);
    });
  });
}

async function getServer(input) {
  const port = await freePort();
  const app = express();

  if (typeof input === 'string') {
    app.get('/', (req, res) => res.sendFile(path.resolve(input)));
  } else if (typeof input === 'function') {
    app.use(input);
  } else {
    throw new Error(`Can not print input of type ${typeof input}.`);
  }

  return startServer(app, port);
}

module.exports = async function printHtml(
  input,
  savePage = (page) => page.pdf({ format: 'A4' }),
  puppeteerConfig = {},
) {
  const [server, browser] = await Promise.all([
    getServer(input),
    puppeteer.launch(puppeteerConfig),
  ]);

  const page = await browser.newPage();
  const res = await page.goto(`http://localhost:${server.address().port}/`, {
    waitUntil: 'networkidle0',
  });

  if (res.status() !== 200) {
    throw new Error(`Unable to load page: ${res.status()}`);
  }

  const result = await savePage(page);

  await Promise.all([server.close(), browser.close()]);

  return result;
};
