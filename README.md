# Safe Travel Company

Rediseño editorial multipágina en Angular. Base inicial y Home para revisión visual, siguiendo `target-design/safe-travel-redesign.png` y el contenido real del sitio anterior.

**Estado:** arquitectura y Home implementadas. `/about`, `/pouches`, `/carvings` y `/vests` tienen páginas provisionales explícitas; su desarrollo completo sigue después de revisar la Home. Contact incluye el formulario validado, pero no envía hasta configurar un endpoint. Esta versión no se ha publicado.

## Stack

- Angular 22, standalone components, lazy routes y prerender estático.
- TypeScript strict y strict templates; signals para estado de interfaz.
- SCSS, Grid, Flexbox, CSS custom properties y tipografía fluida.
- Reactive Forms, HttpClient y servicios separados de SEO/contacto.
- Vitest y entorno de pruebas oficial de Angular.
- Sin Bootstrap, Tailwind, Material, jQuery, Express ni servidor de producción.

## Requisitos e instalación

Node **22.22.3** (o una versión compatible de las ramas indicadas en `package.json`) y npm. El proyecto se verificó con Node 22.22.3 / npm 10.9.8.

```sh
npm install
npm run start
```

Desarrollo: `http://localhost:4200`. Para instalaciones reproducibles, usar `npm ci` con el lockfile incluido. Si npm 10 presenta el error interno `edgesOut`, reintentar con `npm install --legacy-peer-deps`; no se necesita cambiar las dependencias de Angular.

```sh
npm test
npm run build
npm run preview
```

`preview` sirve la salida estática en `http://127.0.0.1:4200`, incluidos errores HTTP 404. Detener el servidor de desarrollo antes de usar ese puerto. El servidor de preview es una herramienta local y no se despliega.

## Estructura

```text
src/app/
  core/
    config/site.config.ts
    layout/header/ + footer/
    services/seo.service.ts + contact.service.ts
  shared/components/
    page-hero/ section-heading/ image-content-section/
    category-card/ quote-block/ gallery/ primary-button/ contact-form/
  pages/home/ about/ pouches/ carvings/ vests/ contact/ not-found/
  data/navigation.ts + site-content.ts + products.ts
  app.routes.ts + app.routes.server.ts
src/assets/fonts/
src/assets/images/brand/ home/ about/ pouches/ carvings/ vests/
public/                 robots, sitemap, redirects, headers, favicon
scripts/                comprobación postbuild y preview local
reference/              capturas y originales; no se publican
target-design/          mockup; no se publica
docs/                   fuentes y plan de implementación
```

Las rutas son `/`, `/about`, `/pouches`, `/carvings`, `/vests`, `/contact` y `/404`, además del wildcard. La navegación comparte header/footer y vuelve al inicio al cambiar de ruta. El menú móvil soporta Escape, ciclo de foco y bloqueo/restauración de scroll.

## Contenido e imágenes

Editar `src/app/data/site-content.ts` para marca, contacto, presentación y metadatos. Editar `products.ts` para tarjetas y `navigation.ts` para navegación. El idioma solicitado del sitio es inglés.

El correo y la descripción de Margaret proceden de la web real. Instagram permanece vacío y se oculta hasta confirmar su URL. El monograma ST es provisional; falta el logo aislado aprobado. Fuentes, imágenes y pendientes están documentados en [CONTENT-SOURCES.md](docs/CONTENT-SOURCES.md).

Los originales quedan archivados fuera de la salida pública. La aplicación sirve WebP, con dimensiones y textos alternativos; el hero tiene una variante responsive, prioridad alta y no usa lazy loading. Las demás imágenes se cargan de manera diferida. Cormorant Garamond e Inter se alojan localmente con sus licencias.

## Formulario

`ContactFormComponent` valida nombre obligatorio, email válido y mensaje de 20–5000 caracteres, elimina espacios externos y evita envíos duplicados. Tiene estados de carga, éxito, error y servicio no configurado. Ante fallo conserva el mensaje. El éxito solo se muestra tras una respuesta HTTP satisfactoria.

El endpoint público se configura en `src/app/core/config/site.config.ts`, mediante el token `CONTACT_CONFIG`. El valor inicial es vacío; no se ejecuta ninguna petición y se ofrece el correo real como alternativa.

Contrato inicial: `POST` JSON `{ firstName, lastName, email, message }`, `Accept: application/json`, respuesta 2xx cuando el proveedor acepta el mensaje y error HTTP cuando no lo acepta. El timeout es 15 segundos. Una respuesta HTTP exitosa no garantiza por sí sola la entrega final del correo.

Puede conectarse a Formspree, una Cloudflare Function o una API propia. Si se elige Web3Forms u otro proveedor con campos/respuestas diferentes, adaptar únicamente `ContactService`. Configurar CORS y protección contra spam en el proveedor. Las claves secretas pertenecen al servidor/proveedor, nunca al código frontend. Esta fase no incluye backend ni creación de cuentas.

## SEO y salida estática

Cada ruta define title, description, canonical, Open Graph y Twitter cards. Las URLs canónicas usan el dominio existente `https://safetravelcompany.com`. Si cambia el dominio, actualizar `SITE.url`, `public/robots.txt` y `public/sitemap.xml`.

`angular.json` usa `outputMode: static`; `app.routes.server.ts` prerenderiza las rutas. `scripts/postbuild.mjs` comprueba las siete páginas, un H1 y metadatos, y copia `/404/index.html` a `/404.html`. No es necesario mantener Node en producción.

Salida exacta para publicación:

```text
dist/safe-travel-company/browser
```

El archivo `404.html` evita el fallback automático a Home para URLs desconocidas en Cloudflare. No agregar una regla `/* /index.html 200`. El antiguo `/bags` redirige a `/pouches` mediante `public/_redirects`.

## Cloudflare Pages

Preparar la publicación después de aprobar Home, completar las páginas interiores y configurar el contacto.

1. Crear un repositorio en GitHub y subir el proyecto, incluyendo `package-lock.json`, sin `node_modules`, `dist`, `.env` ni credenciales. Esta carpeta todavía no tiene repositorio Git inicializado.
2. En Cloudflare, abrir **Workers & Pages**, crear un proyecto **Pages** y conectar el repositorio de GitHub.
3. Seleccionar la rama de producción. Build command: **`npm run build`**. Build output directory: **`dist/safe-travel-company/browser`**. Root directory: la raíz del proyecto. Si el preset Angular propone otra carpeta, reemplazarla por esta salida.
4. Configurar `NODE_VERSION=22.22.3` en el entorno de build (también se incluye `.node-version`). Comprobar que la instalación y prerender terminan correctamente.
5. Revisar el dominio `pages.dev`: cargar cada ruta directamente, refrescarla y probar una URL inexistente. Las previews incompletas no deben indexarse; conservar la protección de indexación que Cloudflare aplica a previews y no apuntar aún el dominio público.
6. En **Custom domains**, agregar el dominio aprobado. Seguir las instrucciones DNS de Cloudflare: para un dominio raíz normalmente se administra la zona en Cloudflare; para un subdominio se puede configurar el CNAME correspondiente. No cambiar DNS de correo ajeno al sitio.
7. Esperar la activación del dominio y certificado. Verificar HTTPS, redirección de HTTP, canonical, sitemap, imágenes y formulario desde el dominio definitivo. Comprobar también variantes `www` si se usan.

Documentación oficial: [Angular static rendering](https://angular.dev/guide/ssr), [Cloudflare build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), [404 y rutas estáticas](https://developers.cloudflare.com/pages/configuration/serving-pages/), [dominios personalizados](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Verificación y fases siguientes

`npm test` cubre rutas, wildcard, validaciones, envíos duplicados, endpoint ausente, éxito, errores y actualización de canonical/robots. El postbuild verifica el HTML real generado. La validación visual inicial cubre Home y Contact; las páginas interiores deberán pasar sus propias revisiones cuando estén completas.

El plan y sus pendientes están en [IMPLEMENTATION-PLAN.md](docs/IMPLEMENTATION-PLAN.md). Las puntuaciones Lighthouse son objetivos hasta medir cada versión; no constituyen una garantía permanente después de cambiar contenido, imágenes o proveedores.

## Out of scope

E-commerce, pagos, carrito, login, cuentas, administración, CMS, base de datos, inventario, precios, pedidos online, blog y múltiples idiomas. Los productos conducen a una consulta, sin compra online.
