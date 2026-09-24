// Verify the artifact page renders mermaid diagrams with sane sizing.
// Mermaid runs with securityLevel:'sandbox', so rendered output is an <iframe>
// (data: URL) per diagram; inline <svg> is supported here too for completeness.
// Usage: node scripts/check-page.mjs [url]
import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = process.argv[2] ?? 'http://localhost:4322/id/artifacts/virtualbox-network-proxmox/';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  page.on('pageerror', (err) => console.log('[pageerror]', err.message));
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 120000 });
  await page
    .waitForFunction(() => document.querySelectorAll('pre.mermaid-rendered iframe, pre.mermaid-rendered svg').length > 0, {
      timeout: 60000,
    })
    .catch(() => console.log('no rendered diagram appeared'));
  await new Promise((r) => setTimeout(r, 4000));

  const readState = () =>
    page.evaluate(() => {
      const pres = [...document.querySelectorAll('pre.mermaid-rendered')];
      return {
        errors: document.querySelectorAll('pre.mermaid-error').length,
        diagrams: pres.map((pre) => {
          const iframe = pre.querySelector('iframe');
          const svg = pre.querySelector('svg');
          const el = iframe ?? svg;
          const box = el?.getBoundingClientRect();
          const style = el && el instanceof HTMLElement ? el.style : null;
          return {
            kind: iframe ? 'iframe' : svg ? 'svg' : 'none',
            aspectRatio: style?.aspectRatio ?? null,
            maxWidth: style?.maxWidth ?? null,
            box: box ? `${Math.round(box.width)}x${Math.round(box.height)}` : null,
            viewBox: svg?.getAttribute('viewBox') ?? null,
          };
        }),
      };
    });

  const desktop = await readState();
  console.log(`rendered: ${desktop.diagrams.length}, errors: ${desktop.errors}`);
  desktop.diagrams.forEach((d, i) => console.log(`diagram${i} [desktop]:`, JSON.stringify(d)));

  // On a narrow viewport the iframe must shrink with the container (fluid
  // height via aspect-ratio) instead of keeping its natural pixel height.
  await page.setViewport({ width: 390, height: 844 });
  await new Promise((r) => setTimeout(r, 1500));
  const narrow = await readState();
  narrow.diagrams.forEach((d, i) => console.log(`diagram${i} [mobile]:`, JSON.stringify(d)));

  const broken = narrow.diagrams.filter((d) => d.kind === 'none' || !d.aspectRatio);
  process.exitCode = broken.length > 0 || narrow.errors > 0 ? 1 : 0;
} finally {
  await browser.close();
}
