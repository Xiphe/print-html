# @xiphe/print-html

jet another html to image/pdf generator.
Most of the code shamelessly copied from [lassediercks/printme](https://github.com/lassediercks/printme)

I wanted this specific API to automate creation of pdf files from local
html files or react apps.

## Install

`npm install @xiphe/print-html`

## API

```js
const printHtml = require('@xiphe/print-html');

const pdfBlob = await printHtml('./some.html');
/* fs.writeFileSync('./some.pdf', pdfBlob) */
```

`printHtml(input [, savePage][, puppeteerConfig])`

### `input` - required

- path to `.html` file that should be printed
- or [express.js middleware](https://expressjs.com/en/guide/writing-middleware.html)
  serving the the `html` that should be printed on `/`

### `savePage` - optional

function that receives a [puppeteer page object](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page)
the return value of this is passed through as the return val of `printHtml`

By default this calls `page.pdf({ format: 'A4' })`.

[page.pdf](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions)
and [page.screenshot](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions)
are probably make the most sense here.

### `puppeteerConfig` - optional

config for [`puppeteer.launch`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)

## License

> The MIT License
>
> Copyright (C) 2018 Hannes Diercks
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of
> this software and associated documentation files (the "Software"), to deal in
> the Software without restriction, including without limitation the rights to
> use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
> of the Software, and to permit persons to whom the Software is furnished to do
> so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
> FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
> IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
