# Safe Travel Company

Sitio editorial bilingüe en Angular para Safe Travel Company. Incluye todo el contenido público de Home, About, Pouches, Carvings, Vests y Contact, conserva el logo entregado por la clienta y genera páginas estáticas listas para Cloudflare Pages.

## Desarrollo

Requiere Node 22.22.3 o una versión compatible indicada en `package.json`.

```sh
npm ci
npm run start
```

La aplicación local se abre en `http://localhost:4200`. Comprobación completa:

```sh
npm run verify
```

La salida publicable queda en `dist/safe-travel-company/browser`. `npm run preview` sirve esa salida en `http://127.0.0.1:4200`, incluidas las respuestas 404.

## Rutas e idiomas

Las páginas en inglés son `/`, `/about`, `/pouches`, `/carvings`, `/vests`, `/contact` y `/404`. Las equivalentes en español comienzan con `/es`. El selector EN/ES conserva la página actual. Cada versión tiene `lang`, canonical, Open Graph y enlaces `hreflang` propios; el sitemap incluye ambas variantes.

El contenido vive en `src/app/data/content.ts`, los metadatos en `site-content.ts`, las categorías en `products.ts` y la navegación en `navigation.ts`. Las fuentes y fotografías verificadas se describen en `docs/CONTENT-SOURCES.md`.

## Envío del formulario

El navegador envía `POST /api/contact` a una Cloudflare Pages Function incluida en `functions/api/contact.ts`. La Function valida los campos y el honeypot antispam, y llama a Resend desde el servidor. La clave nunca se expone en Angular. El destinatario recibe el mensaje y puede responder directamente a la dirección escrita por el visitante mediante `reply_to`.

Configurar en **Cloudflare > Workers & Pages > safe-travel-company > Settings > Variables and Secrets**:

| Variable | Tipo | Valor |
| --- | --- | --- |
| `RESEND_API_KEY` | Secret | Clave creada en Resend |
| `CONTACT_TO` | Text | Correo que recibirá consultas, inicialmente `contactsafetravelcompany@gmail.com` |
| `CONTACT_FROM` | Text | Remitente de un dominio verificado, por ejemplo `Safe Travel Company <website@safetravelcompany.com>` |

Antes de activar el envío hay que agregar y verificar el dominio remitente en Resend. Después de configurar las variables, desplegar de nuevo y enviar una consulta de prueba. En producción conviene añadir una regla de rate limiting o Cloudflare Turnstile si aparece spam. La respuesta visual de éxito solo se muestra cuando Resend acepta la solicitud; si falla, el formulario conserva el mensaje para reintentar.

Payload interno:

```json
{
  "firstName": "Margaret",
  "lastName": "",
  "email": "visitor@example.com",
  "message": "I would like to ask about a custom vest.",
  "company": ""
}
```

## Cloudflare Pages

- Build command: `npm run build`
- Build output: `dist/safe-travel-company/browser`
- Root directory: `/`
- Node: `22.22.3`

Para un despliegue manual:

```sh
npm run verify
npx wrangler pages deploy dist/safe-travel-company/browser --project-name safe-travel-company --branch main
```

Wrangler detecta `functions/` desde la raíz y publica `/api/contact` junto con los archivos estáticos. El repositorio incluye 404 separados para inglés y español, redirects de `/bags` y encabezados de seguridad. No se debe agregar un fallback `/* /index.html 200`, porque convertiría rutas inexistentes en falsos 200.

## Estructura

```text
src/app/
  core/       layout, idioma, SEO y transporte de contacto
  data/       contenido completo EN/ES, navegación y metadatos
  pages/      Home, About, Pouches, Carvings, Vests, Contact y 404
  shared/     bloques editoriales, galería, botones y formulario
src/assets/   logo, fotografías optimizadas y fuentes locales
functions/    endpoint de correo para Cloudflare Pages
public/       sitemap, robots, redirects, headers y favicon
reference/    originales y referencias; no se publican
docs/         trazabilidad del contenido y estado de entrega
```

El proyecto no incluye pagos, carrito, cuentas, CMS, precios ni pedidos online. Las consultas de producto se gestionan por el formulario o por email.
