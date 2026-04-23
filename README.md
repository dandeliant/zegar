# Mówiący Zegar

> Dwujęzyczny mówiący zegar · minutnik · alarmy z własnymi frazami.
> Progressive Web App — działa offline, instaluje się na telefonie i komputerze.

![PL](https://img.shields.io/badge/PL-Polski-f4a737) ![EN](https://img.shields.io/badge/EN-English-f4a737) ![PWA](https://img.shields.io/badge/PWA-installable-b54a37) ![license](https://img.shields.io/badge/license-MIT-cdc4ad)

## Co to jest

Mówiący zegar w przeglądarce — czyta godzinę po polsku ("*godzina siódma trzydzieści pięć*") lub po angielsku w stylu brytyjskim ("*it's twenty-five to eight*"). Trzy narzędzia w jednym:

- **Zegar** — analogowa tarcza + duży cyfrowy wyświetlacz, auto-zapowiedź w wybranym interwale
- **Minutnik** — odliczanie z zapowiedzią co minutę, ostrzeżeniami 30s/10s, odliczaniem końcowym
- **Alarmy** — ustawiasz godzinę, wybierasz dni tygodnia, wpisujesz dowolną frazę ("*Dzień dobry, pora wstawać*") — zegar ją powie

## Funkcje

- 🕐 **Dwujęzyczny** — pełne tłumaczenie PL/EN z jednego przełącznika
- 🎙️ **Głos brytyjski dla EN** — automatyczny wybór najlepszego dostępnego głosu (Google UK, Microsoft Libby/Sonia itp.)
- ⏱️ **Minutnik z głosem** — presety 1/3/5/10/15/30 min lub własna wartość, zapowiedź co minutę
- 🔔 **Alarmy z własnymi frazami** — każdy alarm ma swoje dni (Pn–Nd), swój język i swoją wiadomość
- 🎨 **Analogowa tarcza SVG** — płynny ruch wskazówki sekundowej (requestAnimationFrame)
- 💾 **Pamięć ustawień** — wszystko w `localStorage`, przetrwa zamknięcie przeglądarki
- 📱 **PWA** — instaluje się jak natywna aplikacja, działa offline, Wake Lock API
- 🌙 **Editorial dark design** — Fraunces + JetBrains Mono, paleta amber/burgundy/cream

## Jak uruchomić

### Lokalnie (do testów)

PWA wymaga http/https, nie `file://`. Najprostszy sposób:

```bash
# Python 3 (preinstalowany na większości systemów)
python3 -m http.server 8000

# Albo Node.js
npx serve .

# Albo PHP
php -S localhost:8000
```

Otwórz `http://localhost:8000`.

### Na własnej domenie / GitHub Pages

1. Zaimportuj repo do GitHuba
2. **Settings → Pages → Source: `main` branch, root `/`**
3. Po kilku minutach aplikacja jest pod `https://<user>.github.io/<repo>/`

Działa też na Netlify, Vercel, Cloudflare Pages — wrzucasz folder, gotowe.

## Jak zainstalować jako aplikację

**Android (Chrome / Edge)**
Stuknij chip *Zainstaluj aplikację* u góry, albo menu przeglądarki → *Dodaj do ekranu głównego*.

**iPhone / iPad (Safari)**
Przycisk *Udostępnij* (kwadrat ze strzałką) → *Do ekranu początkowego*.

**Desktop (Chrome / Edge)**
Ikona ⊕ w prawej części paska adresu.

Po instalacji zegar ma własne okno bez paska przeglądarki, długie przytrzymanie ikony daje skróty do Minutnika i Alarmów.

## Mówienie przy zgaszonym ekranie

- Włącz chip **Nie pozwól zasnąć** u góry (Wake Lock API)
- Na **iOS** to **jedyna pewna droga** — Apple wyłącza Web Speech API po zablokowaniu ekranu
- Na **Androidzie** zainstalowana aplikacja mówi też w tle

## Struktura plików

```
.
├── index.html              # Cała aplikacja (HTML + CSS + JS w jednym pliku)
├── manifest.json           # PWA manifest z shortcuts
├── sw.js                   # Service Worker (cache-first, offline-ready)
├── icon-64.png             # Ikony w różnych rozmiarach
├── icon-180.png            # (Apple touch icon)
├── icon-192.png
├── icon-512.png
├── icon-maskable-512.png   # Adaptive icon dla Androida
└── README.md
```

Zero dependencies, zero build step, zero frameworks. Czysty HTML + CSS + vanilla JS.

## Technologie

- **Web Speech API** — synteza mowy (nie ResponsiveVoice, nie external API)
- **Wake Lock API** — blokada wygaszania ekranu
- **Media Session API** — metadata dla systemu operacyjnego
- **Service Worker** — cache-first, offline fallback
- **Web Audio API** — dzwonki dla minutnika i alarmów
- **localStorage** — persystencja stanu
- **SVG** — analogowa tarcza zegara
- **Google Fonts** — Fraunces (serif) + JetBrains Mono (monospace)

## Liczebniki po polsku

Zegar buduje frazę zgodnie z polską gramatyką:

> **godzina** + *liczebnik porządkowy* + *liczebnik główny*
>
> `godzina siódma trzydzieści pięć`

- **Porządkowe** dla godzin: *pierwsza, druga, ..., dwudziesta czwarta*
- **Główne** dla minut: *jeden, dwa, ..., dziewiętnaście, dwadzieścia, ..., pięćdziesiąt dziewięć*
- Pełna godzina mówiona bez minut: `godzina siódma`

Liczba mnoga *minuta/minuty/minut* i *sekunda/sekundy/sekund* wyliczana poprawnie przez helper `plForm()`.

## Format angielski

Brytyjski styl `past/to`:

- `:00` → *it's seven o'clock*
- `:15` → *it's a quarter past seven*
- `:30` → *it's half past seven*
- `:45` → *it's a quarter to eight*
- Wielokrotność 5 → *it's twenty past seven*
- Inne → *it's twenty-three minutes past seven*

## Licencja

MIT — rób z tym co chcesz, tylko nie obwiniaj mnie jak coś się zepsuje :)

---

*Zegar powstał iteracyjnie przy pomocy Claude. Design: editorial dark, inspirowany nocnym radiem.*
