# Content and assets

Reviewed against the public site on 12–13 September 2026.

## Editorial sources

- https://safetravelcompany.com/ — the brand introduction, Margaret's name, published contact email, Cuenca location, category meanings, and footer text.
- https://safetravelcompany.com/about/ — environmental science work, travel in the Americas, Navajo/Pueblo/Salish influences. The Home preview is an edited summary of this text.
- `reference/*.png` — user-supplied screenshots of the original site.
- `target-design/safe-travel-redesign.png` — visual reference only. Contact information shown in the mockup is not treated as verified.

The public email is **contactsafetravelcompany@gmail.com**. No Instagram account has been confirmed. The UI omits that link until `SITE.instagram` is supplied.

## Photographs

These originals were downloaded through the WordPress image CDN. Copies are preserved in `reference/original-assets/`; optimized WebP files are served from `src/assets/images/`.

| Local image                   | Original public upload                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| `brand/original-header.webp`  | `https://safetravelcompany.com/wp-content/uploads/2025/06/HEADER3-1.png`            |
| `home/prayer-feathers.webp`   | `https://safetravelcompany.com/wp-content/uploads/2026/07/3blwh-PF-no-bckg.1-1.png` |
| `carvings/carvings-main.webp` | `https://safetravelcompany.com/wp-content/uploads/2026/07/IMG_3876.png`             |
| `pouches/pouches-main.webp`   | `https://safetravelcompany.com/wp-content/uploads/2026/06/IMG_2227.jpg`             |
| `vests/orange-vest.webp`      | `https://safetravelcompany.com/wp-content/uploads/2026/06/IMG_2626-scaled.png`      |
| `about/founder.webp`          | `https://safetravelcompany.com/wp-content/uploads/2026/07/IMG_3907a-3-scaled.png`   |

Only resizing and WebP compression were applied; no generated product or founder imagery is used. A 480px alternative is included for the hero. The original header is used as the initial Open Graph image.

The small ST wordmark/favicon is an interim typographic treatment, not the original client logo. **TODO(content): replace it with the approved isolated logo.**

## Fonts

Cormorant Garamond and Inter are served locally as Latin WOFF2 fonts. License notices are included in `src/assets/fonts/`. There are no Google Fonts requests at runtime.

## Pending client content

- TODO(content): supply the approved isolated logo and, if available, a light footer variant.
- TODO(content): confirm the official Instagram URL.
- TODO(content): approve final page copy and photographs for the four interior editorial/collection pages.
- TODO(content): confirm the published email and Cuenca display before launch.

No prices, phone numbers, biographies or social handles have been invented.
