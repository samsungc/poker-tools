import { readFile, writeFile } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';

const svg = await readFile(new URL('../public/og-image.svg', import.meta.url), 'utf8');

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  background: '#0E0E0E',
  font: { loadSystemFonts: true, defaultFontFamily: 'Helvetica' },
});

const png = resvg.render().asPng();
await writeFile(new URL('../public/og-image.png', import.meta.url), png);
console.log(`og-image.png written (${png.byteLength} bytes)`);
