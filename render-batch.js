const puppeteer = require('puppeteer');
const path = require('path');

// parse CLI args
let args = {};
for (let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('-')) {
        const next = process.argv[i+1];
        args[arg.substring(1)] = next.startsWith('-') ? true : (i++ && next);
    }
}

const defaults = {
    count: '10',
    format: 'png',
    out: './',
    size: '256',
    base: 'http://127.0.0.1:8080'
}

args = Object.assign(defaults, args);

console.log(`Rendering ${args.count} ${args.size}x${args.size} robohashes to ${args.out} as ${args.format}.`);
console.warn(`This process will fail unless ./render.html is being served to ${args.base}`);

// render out images
(async () => {
  let {
    count,
    format,
    out,
    size,
    base
  } = args;
  size = parseInt(size);
  count = parseInt(count);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: size,
    height: size,
  });
  for (let robot = 1; robot <= count; robot++ ) {
    await page.goto(`${base}/render.html`); // refresh for a new robohash
    await page.screenshot({
      path: path.resolve(__dirname, out, `robohash-${robot}.${format}`),
      type: format
    });
    console.log(`Rendered robohash to ${path.resolve(__dirname, out, `robohash-${robot}.${format}`)}`);
  }

  await browser.close();
})();