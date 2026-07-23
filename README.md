# MOORE AG LOGISTICS — Editorial Design (pelvic-gazelle-style)

A second, standalone design of the MOORE AG LOGISTICS LLC site. Same content
and company info as the original; a fresh **light editorial + airy** visual
identity inspired by the standout, premium feel of gazellechair.com.

## Stack
- Vite + React 18 + react-router-dom
- Plain CSS (design system in `src/styles/global.css`)

## Design identity
- **Palette:** bone paper, deep pine-field green, sage, warm sand, harvest gold
- **Type:** Fraunces (display serif) · Inter (body) · IBM Plex Mono (data/eyebrows)
- **Signature:** the "field-ledger" — mono data annotations + a gold horizon
  rule under headlines, over big duotone photography.

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Pages
`/` Home · `/agronomic-services` · `/research-development` ·
`/photography` (Field Notes) · `/about` · `/contact`

## ⚠️ Before launch
All imagery is **TEMPORARY** stock (Unsplash) used only for preview — see the
`img` map in `src/data/site.js`. Swap for original MOORE AG media, and wire the
contact form (`src/pages/Contact.jsx`) to a real handler. Placeholder email /
phone in `src/data/site.js` should be replaced with real details.
