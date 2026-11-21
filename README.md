# MOBILOOK — Landing Page (Ancón, Lima Norte - Perú)

Landing page comercial para **MOBILOOK** (*"Estilo y Protección para tu celular"*), construida **100% en HTML5, CSS3 y JavaScript Vanilla** sin frameworks ni paso de compilación, lista para desplegar en **Cloudflare Pages**.

## Características principales

- Identidad visual basada en el logotipo oficial (vectorizado en SVG en `assets/img/mobilook-logo.svg` y `assets/img/favicon.svg`).
- Localización para **Perú (`es-PE`)**: precios en Soles (`S/`), medios de pago **Yape / Plin / Tarjetas**, WhatsApp `+51` y enfoque local en el distrito de **Ancón, Lima Norte**.
- Buscador por marca y modelo de celular, catálogo interactivo con swatches de color y vista rápida.
- **Studio "Arma tu MOBILOOK"**: vista previa interactiva en tiempo real con **15% OFF** automático por combo.
- Carrito deslizable persistente (`localStorage`) con pedido formateado listo para enviar por **WhatsApp**.
- Optimizada para **SEO** (JSON-LD `MobilePhoneStore` + `FAQPage`, Open Graph con `assets/img/og-cover.jpg`, `robots.txt`, `sitemap.xml`) y **Cloudflare Pages** (`_headers`).

## Cómo editar datos de la tienda

Todos los textos clave de contacto, dirección, horarios, catálogo y precios se editan en un solo archivo:

- [`assets/js/config.js`](assets/js/config.js)

## Despliegue en Cloudflare Pages

1. Conecta este repositorio en **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**.
2. Configuración de compilación:
   - **Framework preset:** `None`
   - **Build command:** *(dejar vacío)*
   - **Build output directory:** `/` *(raíz del repositorio)*
3. Cuando tengas tu URL definitiva (ej. `https://tu-proyecto.pages.dev/`), actualiza la URL base en `index.html` (`canonical`, `og:url`, `og:image`), `robots.txt` y `sitemap.xml`.
