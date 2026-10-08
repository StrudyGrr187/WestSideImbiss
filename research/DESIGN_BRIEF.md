# Design-Brief – Westside Imbiss (verbindlich)

## Aesthetic
Eine nächtliche Grill-Theke in Ottakring: warmes Schwarz, Licht kommt nur vom Spieß. Fotos glühen amber aus der Dunkelheit, Typo ist laut, kondensiert und in Versalien gesetzt wie ein Menüboard. Gold ist das Leitsignal (CTAs, Sterne, Status), Flammen-Rot nur als Funke (max. 1× pro Viewport). Rau durch Grain und harte Kanten, nicht durch Deko.

## Tokens (1:1 übernehmen, als CSS-Vars + Tailwind-Theme)
```
--bg:        #0B0A09   /* warmes Schwarz, nie #000 */
--surface:   #151311   /* Cards, Sheet */
--surface-2: #1F1B17   /* Hover, Menüboard-Zeilen */
--line:      rgba(245,239,228,0.10)
--line-strong: rgba(245,239,228,0.22)
--text:      #F5EFE4   /* Off-White */
--muted:     #A39B8F
--gold:      #F5B82E   /* Primär, Logo-Ring */
--gold-deep: #C98E0E   /* Hover/Pressed */
--flame:     #E8461E   /* Funke: Live-Dot geschlossen, Diavolo-Chili, 1 Wort Headline */
--ember:     #FF8A1F   /* nur in Bild-Verläufen */
--open:      #8BD17C   /* nur Status-Dot "Geöffnet" */
```
Text auf Gold: `--bg`. Kein Weiß-auf-Gold.

**Fonts** (selbst gehostet, `font-display: swap`, nur latin-Subset):
- Display: `@fontsource-variable/big-shoulders-display` (700–900), Fallback `"Arial Narrow", Impact, sans-serif`. Immer UPPERCASE, `letter-spacing: -0.01em`, `line-height: 0.88`.
- Text: `@fontsource-variable/dm-sans` (400/500/700), Fallback `system-ui, sans-serif`.
- Labels/Eyebrows: DM Sans 700, 12px, UPPERCASE, `letter-spacing: 0.18em`, `--gold`.

**Skala** (mobile → desktop, per `clamp`):
- Display XL (Hero): 64px → 168px · weight 900
- H2: 44px → 96px · 800
- H3/Card-Titel: 28px → 40px · 800
- Menüboard-Kategorie: 22px → 28px · 800
- Lead: 18px → 21px / 1.5 · 400
- Body: 16px → 17px / 1.6
- Small: 14px / 1.5

**Layout**: max-width 1280px, Gutter 20px mobile / 40px desktop, 12-Spalten-Grid ab `lg` (1024). Section-Padding 88px mobile / 160px desktop. Vertikaler Rhythmus 8px-Basis.

**Radius**: Buttons 999px (Pill), Cards 6px, Sheet 20px oben. Bewusst kantig – keine 24px-Bubble-Cards.
**Shadows**: keine grauen Drop-Shadows. Nur Glow auf Primär-CTA-Hover: `0 0 0 1px #F5B82E, 0 8px 32px -8px rgba(245,184,46,.45)`.

**Grain**: ein fixes Fullscreen-Overlay (`pointer-events:none`), SVG-feTurbulence als data-URI, `opacity: .06`, `mix-blend-mode: overlay`. Nicht animieren.

## Bildstil (alle Reel-Frames)
- Filter-Stack per CSS: `filter: saturate(1.08) contrast(1.06) brightness(.92)` + Overlay `linear-gradient(to top, #0B0A09 0%, rgba(11,10,9,.55) 35%, transparent 65%)` + zweites Overlay `radial-gradient(at 30% 20%, rgba(255,138,31,.18), transparent 60%)` mit `mix-blend-mode: soft-light`.
- Wasserzeichen `@westside_imbiss16` liegt unten mittig → bei Querformaten unteres ~12% wegcroppen (beim Export) bzw. vom Verlauf vollständig decken.
- Nie über native Auflösung strecken: Hochkant-Frames max. ~420px CSS-Breite, Querformate max. ~1280px. Export AVIF + WebP + JPG, 2 Größen.
- Chip „AUS UNSEREN REELS“ (Label-Stil, Instagram-Icon 14px, `--surface` 80% + `backdrop-blur`) oben links auf jedem Reel-Bild.
- `hero-spiess-landscape.jpg`: Preisschild „5,50“ ist sichtbar → `object-position` so wählen, dass es in den Schatten-Verlauf rutscht.

## Sections
1. **Navbar** – transparent, ab 24px Scroll `rgba(11,10,9,.72)` + `backdrop-blur(14px)` + Bottom-Line `--line`. Links Logo (40px, rund) + „WESTSIDE“ in Display; rechts Links (Label-Stil) + Gold-Pill „VORBEIKOMMEN“. Mobile: Hamburger → Fullscreen-Overlay mit Links in H2-Größe.
2. **Hero** (100svh, min 640px). Art Direction via `<picture>`: mobile `food-doener-spiess-2.jpg` (hochkant, Bild füllt alles, Text unten), desktop `hero-spiess-landscape.jpg` (Spieß links frei, Text-Block linksbündig unten über dem Verlauf, Spalten 1–7). Stapel: Live-Status-Pill → Headline „DEIN HUNGER. / UNSERE ANTWORT.“ (zweite Zeile in `--gold`) → Lead (1 Satz, Döner · Pizza · Snacks, Thaliastraße) → CTAs → Zeile „★★★★★ 5,0 auf Google · 6 Bewertungen“.
3. **Marquee** – volle Breite, `--gold`-Band, Text `--bg`, Display 28/40px, Trenner ✦ als Inline-SVG. Leicht rotiert (-1.5deg) überlappt es die Hero-Unterkante. 40s linear loop; reduced-motion: statisch.
4. **Food „WAS DICH ERWARTET“** – 3 Hochkant-Cards (4:5, Döner / Pizza / Frisch belegt=Salatbar). Mobile: horizontaler Snap-Scroller (Card 82vw, nächste lugt rein). Desktop: 3 Spalten, mittlere Card um 64px nach unten versetzt (asymmetrisch). Titel unten im Bild in H3, 1 Zeile Text.
   Darunter **Menüboard**: `--surface` mit 1px `--line-strong`-Rahmen, Kategorien 2-spaltig (desktop) / 1-spaltig mobile, Kategorie in Display + dünne Linie, Gerichte als Liste in Body, Varianten muted. Fußzeile: „Schnitzel & Falafel gibt’s im Lokal – frag an der Theke.“ Keine Preise, keine Punktlinien zu Preisen.
5. **Reviews „TAG 1“** – Desktop 2 Spalten: links riesige „5,0“ (Display 200px, gold) + Sterne + „6 Google-Bewertungen“ + beide CTAs; rechts `opening-queue.jpg` mit Zitat-Overlay unten, Attribution „— Westside Imbiss, Eröffnung 02.10.2026“. Mobile: Zahl → Bild → Zitat → CTAs. ReviewCard-Komponente (surface, 6px, Sterne gold, Name/Datum muted) nur rendern wenn `reviews.length > 0`.
6. **Instagram** – 3 Reel-Cards 9:16 (max 360px breit), Play-Kreis 64px gold-outline mittig, Datum-Label. Mobile Snap-Scroller, Desktop 3er-Reihe.
7. **About / Zeitstrahl** – vertikale Linie `--line-strong`, Knoten 10px gold, Datum in Display 32px, Text Body. 1€-Aktion als „Eröffnungsangebot (beendet)“ in muted.
8. **Location** – Desktop 5/7: links Adresse (H3), Live-Status, Öffnungszeiten-Tabelle, Buttons Route/Anrufen/Bestellen; rechts Map-Platzhalter (`storefront-street.jpg` gegradet + Button „KARTE LADEN“) → iframe erst nach Klick.
9. **CTA „HUNGER?“** – Display XL, zentriert, `--bg` mit großem radialem Ember-Glow dahinter.
10. **Footer** – `--surface`, 4 Spalten desktop, Legal-Links muted.
**Mobile Bottom-Bar** (< lg): fixiert, 64px + safe-area, `--surface` 92% + blur, 3 gleich breite Buttons Route · Anrufen · Bestellen (Icon 20px über Label 12px); Live-Dot neben „Route“. Bestellen öffnet Bottom-Sheet: Wolt / foodora als große Zeilen (64px) + Hinweis „Lieferung 11–22 Uhr“. Body bekommt `padding-bottom` entsprechend.

## Komponenten
- **Primary-Button**: Gold-Pill, 52px hoch, Padding 0 28px, DM Sans 700 15px UPPERCASE `letter-spacing .06em`, Icon rechts (ArrowUpRight 18px) rutscht bei Hover 3px nach rechts oben.
- **Secondary**: transparent, 1px `--line-strong`, Text `--text`; Hover Border `--gold`.
- **Live-Status-Pill**: 8px Dot (`--open` mit Pulse-Ring bzw. `--flame` ohne Pulse) + „JETZT GEÖFFNET · bis 22:00“ / „GESCHLOSSEN · öffnet 10:00“. Berechnung via `Intl` Europe/Vienna, Update alle 60s.
- **Food-Card**: 6px Radius, `overflow:hidden`, Hover: Bild scale 1.06 (600ms), Card hebt sich nicht.
- **Icons**: Lucide, `strokeWidth 1.75`, 20px Standard, nie farbig gefüllt.

## Motion (Framer Motion)
- Easing global: `[0.22, 1, 0.36, 1]` (easeOutQuint-artig). Hover 200ms, Reveal 700ms, Bild-Reveal 900ms.
- Reveal: `y: 24 → 0`, `opacity 0 → 1`, `whileInView`, `viewport { once: true, margin: "-10% 0px" }`. Stagger 0.08s.
- Bild-Reveal: `clip-path: inset(12% 0 0 0) → inset(0)` + scale 1.08 → 1.
- Hero: Headline-Zeilen nacheinander (0.1s Versatz), keine Parallax-Spielereien.
- Sheet: Spring `stiffness 380, damping 36`.
- `useReducedMotion()` → alle Transforms aus, nur Opacity 200ms; Marquee statisch, Pulse aus.

## No-Gos
1. Keine gleichförmigen weichen 3er-Card-Grids mit Shadow und 24px Radius, keine Glassmorphism-Cards überall – Blur nur Navbar, Bottom-Bar, Chips.
2. Kein Gold als Fläche für Sections (außer Marquee) und kein Rot für Buttons. Keine Emojis, keine Stock-/Wolt-Bilder, keine Preise.
3. Keine hochgezogenen, unscharfen Reel-Frames und keine ungegradeten hellen Bilder (Pizza-Frame ohne Overlay wirkt wie Handyschnappschuss).
