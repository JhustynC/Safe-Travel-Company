import { copyFile, readFile, access } from 'node:fs/promises';
const output = 'dist/safe-travel-company/browser';
await copyFile(output + '/404/index.html', output + '/404.html');
for (const route of ['', 'about', 'pouches', 'carvings', 'vests', 'contact', '404']) {
  const html = await readFile(output + '/' + (route ? route + '/' : '') + 'index.html', 'utf8');
  if ((html.match(/<h1[ >]/g) ?? []).length !== 1)
    throw new Error(route + ': expected exactly one H1');
  if (!html.includes('rel="canonical"') || !html.includes('property="og:title"'))
    throw new Error(route + ': missing SEO tags');
}
await access(output + '/sitemap.xml');
await access(output + '/robots.txt');
console.log('Verified seven prerendered pages; Cloudflare 404.html prepared.');
