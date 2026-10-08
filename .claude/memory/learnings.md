# Team-Learnings (nur CEO schreibt, nur anhängen)

## 2026-10-08 — Westside Imbiss Website-MVP

**Entscheidung:** ✅ Ship it (als MVP/Staging). Go-Live erst nach Erledigung der offenen Punkte (siehe unten).

**Was gut lief:**
- Recherche vor Design: research/FACTS.md als Single Source of Truth. Keine erfundenen Review-Zitate, keine Preise, kein aggregateRating im JSON-LD. Standard-Pattern für Kleinbetriebe ohne Material.
- Lieferplattform-Bilder (Wolt) als Stock erkannt ("Symbolbild"-Wasserzeichen) und verworfen. Echte Food-Bilder stattdessen per ffmpeg als Frames aus öffentlichen Instagram-Reels extrahiert. Wiederholbar.
- Visionär-Ideen mit Substanz: Live-Öffnungsstatus (DST-Grenzfälle getestet), "Tag 1"-Reviews statt Fake-Zitaten, Mobile-Bar Route/Anrufen/Bestellen.
- Content zentral in src/data/westside.ts, Bild-Pipeline (AVIF/WebP/JPG responsive), Map erst nach Klick: Lighthouse 100/100/100, LCP 554 ms, CLS 0.
- QA im ersten Durchlauf grün, Fix-Loop auf 1 Runde (Reviewer-Blocker) begrenzt.

**Was beim nächsten Mal anders laufen soll:**
- Senior Dev: Jede Copy-Zeile gegen FACTS.md prüfen, bevor sie in den Code kommt. Die Sätze "aus dem Ofen", "frisch vom Spieß" und "Preise im Lokal" waren unbelegt und kosteten 3 Blocker. Im Zweifel neutral formulieren oder weglassen.
- Senior Dev: Display-Fonts wie Big Shoulders mit Umlauten (Ä/Ö/Ü) bei line-height unter ca. 1.0 immer visuell testen. 0.88 führte zu Kollisionen. Mindestens ca. 1.0 bei Umlaut-Headlines oder Umlaut-Text separat prüfen.
- Senior Dev: Preisschilder/Störelemente im Bildmaterial nicht mit Blur-Rechteck überdecken (rotes Blur-Rechteck im Hero/OG). Besseres Frame wählen, croppen oder echt retuschieren (Inpainting). Weicher Retusche-Fleck blieb auch nach Fix sichtbar.
- Senior Dev: Hero-Einstieg nie von einem async geladenen Motion-Chunk abhängig machen. Above-the-fold-Animation per CSS-Keyframes, framer nur für Below-the-fold. Bei reduced-motion auch animation-delay zurücksetzen (wurde vergessen).
- Senior Dev: Bildquellen mit niedriger Auflösung (Reel-Frames, 720px) nicht auf Mobile-Hero oder Tablet hochkant hochskalieren. Crop/Object-Position und Overlay-Stärke auf echten Viewports prüfen, bevor es zu QA geht.
- Head of Design / Senior Dev: Status-Indikatoren (Dot) so gestalten, dass sie nicht wie Notification-Badges wirken, z.B. mit Textlabel direkt daneben.
- QA: Visuelle Prüfung ergänzen (Screenshots Mobile/Tablet hochkant, Umlaut-Headlines, Hero-Bildqualität). Ein reiner Build/Lint/Asset-Check ließ 5 Blocker durch, die erst der Reviewer fand.
- Visionär: Bei Ideen mit Bildbedarf vorab Bildqualität/Auflösung der verfügbaren Quellen nennen.

**Technische Notizen für später:**
- Stack: Vite 8, React 19, TS, Tailwind 4, framer-motion (LazyMotion), lucide. Fonts self-hosted (Big Shoulders Display + DM Sans).
- Bildpipeline: ffmpeg Frames, dann cwebp/avifenc zu AVIF/WebP/JPG.
- Offen vor Go-Live: echte Domain (SITE_URL ist Platzhalter), Impressum/Datenschutz-Daten vom Betreiber (TODO-Platzhalter, rechtlich Pflicht in AT), ggf. echte Google-Review-Texte und professionelle Food-Fotos, Hosting mit echtem 404 für fehlende Assets.
- Google-Reviews ohne Login nicht abrufbar, Google-Suche zeigt Captcha. Review-Texte nur per Betreiber/Export beschaffen.
- Wolt-Preise stimmen nicht mit Lokalpreisen überein, nicht übernehmen.
