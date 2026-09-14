import { copyFile, readFile, access } from 'node:fs/promises';
const output = 'dist/safe-travel-company/browser';
await copyFile(output + '/404/index.html', output + '/404.html');
await copyFile(output + '/es/404/index.html', output + '/es/404.html');
const routes = [
  '',
  'about',
  'pouches',
  'carvings',
  'vests',
  'contact',
  '404',
  'es',
  'es/about',
  'es/pouches',
  'es/carvings',
  'es/vests',
  'es/contact',
  'es/404',
];
for (const route of routes) {
  const html = await readFile(output + '/' + (route ? route + '/' : '') + 'index.html', 'utf8');
  if ((html.match(/<h1[ >]/g) ?? []).length !== 1)
    throw new Error(route + ': expected exactly one H1');
  if (!html.includes('rel="canonical"') || !html.includes('property="og:title"'))
    throw new Error(route + ': missing SEO tags');
  if (!html.includes('hreflang="en"') || !html.includes('hreflang="es"'))
    throw new Error(route + ': missing language alternatives');
  const expectedLanguage = route === 'es' || route.startsWith('es/') ? 'es' : 'en';
  if (!html.includes(`<html lang="${expectedLanguage}"`))
    throw new Error(route + ': incorrect document language');
}
await access(output + '/sitemap.xml');
await access(output + '/robots.txt');
console.log(`Verified ${routes.length} prerendered pages and bilingual Cloudflare 404 files.`);
