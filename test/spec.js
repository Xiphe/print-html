'use strict';

const printHtml = require('../index.js');

async function setViewportToPageSize(page) {
  return page.setViewport(
    await page.evaluate(() => {
      /* eslint-disable no-undef */
      return {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight,
      };
      /* eslint-enable no-undef */
    }),
  );
}

describe('printHtml', () => {
  it('creates a pdf', async () => {
    const pdf = await printHtml('test/example.html');

    expect(
      pdf
        .toString()
        .replace(/\/CreationDate \(.*\)/, '/CreationDate...')
        .replace(/\/ModDate \(.*\)/, '/ModDate...'),
    ).toMatchSnapshot();
  });

  it('creates screenshots via custom savePage hook', async () => {
    const png = await printHtml('test/example.html', async (page) => {
      await setViewportToPageSize(page);
      return page.screenshot();
    });

    expect(png.toString()).toMatchSnapshot();
  });

  it('supports custom middleware instead of static files', async () => {
    const pdf = await printHtml((req, res) => {
      res.send('<h1>Hello from Middleware</h1>');
    });

    expect(
      pdf
        .toString()
        .replace(/\/CreationDate \(.*\)/, '/CreationDate...')
        .replace(/\/ModDate \(.*\)/, '/ModDate...'),
    ).toMatchSnapshot();
  });

  it('fails when middleware fails', () => {
    return expect(
      printHtml((req, res) => {
        res.sendStatus(500);
      }),
    ).rejects.toThrow('Unable to load page: 500');
  });
});
