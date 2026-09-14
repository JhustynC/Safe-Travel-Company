# Estado de entrega

## Completado

- [x] Arquitectura Angular standalone con TypeScript y templates estrictos.
- [x] Home, About, Pouches, Carvings, Vests, Contact y 404 con contenido editorial completo.
- [x] Versiones equivalentes en inglés y español con selector persistente por página.
- [x] Logo original entregado por la clienta en encabezado y pie.
- [x] Fotografías del sitio anterior optimizadas en WebP y galerías completas.
- [x] Formulario accesible con validación, prevención de doble envío y honeypot.
- [x] Cloudflare Pages Function para enviar mediante Resend sin exponer secretos.
- [x] Metadatos, canonical, Open Graph, `hreflang`, sitemap y robots bilingües.
- [x] Prerender de 14 rutas, 404 bilingüe, redirects y encabezados de seguridad.
- [x] Pruebas de rutas, formulario, transporte y SEO, más comprobación del backend.

## Para activar en producción

1. Verificar el dominio remitente en Resend y crear una API key.
2. Configurar `RESEND_API_KEY`, `CONTACT_TO` y `CONTACT_FROM` en Cloudflare.
3. Confirmar el correo receptor; el valor publicado actualmente es `contactsafetravelcompany@gmail.com`.
4. Desplegar y realizar una prueba real de entrega y respuesta.
5. Conectar el dominio definitivo sin alterar los registros MX del correo.
6. Añadir la cuenta oficial de Instagram cuando se confirme su URL.

La activación del proveedor de correo y el despliegue requieren acceso a las cuentas externas. El código y la configuración esperada están listos para esa operación.
