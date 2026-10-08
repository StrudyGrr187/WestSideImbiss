# Kundenbriefing (Zusammenfassung des Original-Prompts) – Westside Imbiss Website MVP

Rolle: Senior Frontend Dev + Web Designer. Moderne, hochwertige, conversion-optimierte One-Page für Westside Imbiss Wien.
KEINE Halluzinationen: keine erfundenen Gerichte, Preise, Reviews, Öffnungszeiten, Telefonnummern, Firmengeschichte, Lieferdienste, Bestellsysteme. Verifizierte Fakten: research/FACTS.md

Ziele: sofort verstehen was angeboten wird; Essen visuell im Mittelpunkt; Vertrauen durch Google-Rating; Instagram/Reels; schnelle Actions: anrufen, Standort, Essen, Instagram, bestellen (Wolt/foodora sind via Google bestätigt). Mobile extrem gut.

Design: Modern Urban Streetfood / Premium Imbiss. Dunkel (Schwarz/Anthrazit), Off-White Text, Akzent aus Branding (Gold/Amber, sparsam Feuer-Rot). Große Typografie, starke Food-Fotografie, subtile Animationen, leicht rau/urban, hochwertige Microinteractions. NICHT: generisches Template, Corporate, überladen, AI-Template-Look. Niveau: Wiener Digitalagentur, mehrere tausend Euro.

Stack: React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide. Keine unnötigen Dependencies.

Sections:
- Sticky Navbar (HOME, FOOD, REVIEWS, INSTAGRAM, LOCATION + CTA "VORBEIKOMMEN"), Glass/Blur beim Scrollen, Hamburger auf Mobile
- HERO full-screen, beste Food-Fotografie, Headline z.B. "DEIN HUNGER. / UNSERE ANTWORT.", kurze Beschreibung, CTAs "JETZT VORBEIKOMMEN" (Maps) + "INSTAGRAM", "★★★★★ 5,0 auf Google"
- "WAS DICH ERWARTET" – Food Cards (großes Bild, Name, kurze Beschreibung, KEINE Preise da nicht bestätigt), Hover scale + Bildzoom
- "WESTSIDE AUF INSTAGRAM" – 3 echte Reels, 9:16 Cards, Play-Icon, Hover, Link zum Reel; CTA "MEHR AUF INSTAGRAM →". Keine Fake-Reels.
- "DAS SAGEN UNSERE GÄSTE" – ★★★★★ 5,0 / 5, "Bewertungen unserer Gäste"; Review-Cards NUR mit echten Texten (aktuell keine abrufbar → keine Cards, stattdessen ehrliche starke Rating-Darstellung + "ALLE GOOGLE-BEWERTUNGEN ANSEHEN →"); Datenstruktur für spätere echte Reviews vorbereiten
- "DU FINDEST UNS HIER" – Thaliastraße 148, 1160 Wien, Map/Location-Block, Buttons "ROUTE PLANEN" + "ANRUFEN" (tel:+436606513300), Öffnungszeiten Täglich 10:00–22:00
- About – kurze authentische Story NUR aus echten Infos (neu eröffnet 02.10.2026 in Ottakring, Claims aus FACTS.md)
- CTA-Section "HUNGER?" / "Du weißt, wo du uns findest." + "JETZT VORBEIKOMMEN", "INSTAGRAM CHECKEN"
- Footer: Name, Adresse, Telefon, Instagram, Maps, Öffnungszeiten, Impressum/Datenschutz als Platzhalter-Struktur (nichts erfinden)
- Mobile: Sticky Bottom CTA "📍 ROUTE" / "📞 ANRUFEN" (Lucide-Icons statt Emojis)

Animationen (Framer Motion, subtil, Performance first, prefers-reduced-motion respektieren): Hero fade/slide, Food stagger, Image reveal, Reviews fade, Instagram reveal, Hover, Navbar transition.

Responsive Mobile-First (iPhone, Android, Tablet, Desktop, große Screens). Food-Bilder auf Mobile groß. Daumenfreundliche Buttons (min 48px).

SEO: Title "Westside Imbiss Wien – Thaliastraße 148", Meta Description, Open Graph, LocalBusiness/Restaurant JSON-LD nur mit echten Daten (Name, Adresse, Geo, Telefon, Öffnungszeiten, servesCuisine, sameAs Instagram; KEIN aggregateRating im Schema für Self-Serving-Reviews vermeiden).

Performance: Lighthouse 90+ in allen Kategorien. Lazy loading, responsive images, AVIF/WebP, self-hosted Fonts (z.B. @fontsource), minimales JS, keine Hintergrundvideos, Map-Embed erst nach Klick.

Content zentral in src/data/westside.ts (Name, Adresse, Telefon, Öffnungszeiten, URLs, Reviews, Food Items, Social Links, Bilder) – leicht austauschbar.

Arbeitsweise: implementieren, Dev-Server starten, im Browser prüfen, Layout/Responsive/Console-Fehler fixen, Mobile prüfen, Design/UX polieren. Am Ende fertiger, funktionsfähiger MVP.
