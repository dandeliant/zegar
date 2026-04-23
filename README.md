# Mówiący Zegar · PWA

Mówiący zegar po polsku — instalowalny jako aplikacja, z opcją blokady wygaszania ekranu.

## Szybki start (otwarcie od razu)

Podwójne kliknięcie na `index.html` wystarczy, żeby zegar działał w przeglądarce. Wszystko poza jedną rzeczą zadziała: **przycisk "Zainstaluj aplikację" się nie pojawi**, bo przeglądarki wymagają, żeby strona była serwowana przez serwer, a nie z dysku.

## Uruchomienie jako instalowalna aplikacja

Potrzebny jest lokalny serwer. Jedna linijka w terminalu (w folderze z plikami):

### Python (jest preinstalowany na Mac/Linux, na Windows zainstaluj z python.org)
```
python3 -m http.server 8080
```
Potem otwórz w przeglądarce: **http://localhost:8080**

### Node.js (jeśli masz npx)
```
npx serve -p 8080
```

### PHP
```
php -S localhost:8080
```

Na adresie `http://localhost:8080` zegar będzie w pełni instalowalny.

## Hosting zdalny (żeby używać na telefonie)

Żeby korzystać na telefonie jak z prawdziwej aplikacji (zainstalowanej na ekranie głównym), wrzuć folder na dowolny darmowy hosting:

- **GitHub Pages** — wrzuć folder do repo, włącz Pages, dostajesz adres `https://nazwa.github.io/...`
- **Netlify Drop** — przeciągnij folder na https://app.netlify.com/drop
- **Cloudflare Pages** — podobnie
- **Vercel** — `vercel` w terminalu

Po otwarciu adresu na telefonie (musi być **https**), pojawi się opcja "Dodaj do ekranu początkowego" / "Zainstaluj aplikację".

## Zapowiedź godziny przy zgaszonym ekranie

Włącz chip **"Nie pozwól zasnąć"** u góry aplikacji. Ekran nie zgaśnie i zegar będzie mówił według harmonogramu.

Dlaczego nie da się inaczej:

- **Android (zainstalowany PWA):** przy Media Session synteza mowy działa też z zablokowanym ekranem — to daje ten kod.
- **iOS (Safari/iPhone):** Apple wyłącza Web Speech API po zablokowaniu ekranu. Nie ma obejścia. Blokada wygaszania to jedyna pewna droga.
- **Desktop:** Wake Lock działa wszędzie — zegar mówi dalej mimo braku interakcji.

## Pliki

```
mowiacy-zegar/
├── index.html            główna aplikacja
├── manifest.json         manifest PWA
├── sw.js                 service worker (offline + cache)
├── icon-64.png           ikona 64×64
├── icon-180.png          apple-touch-icon
├── icon-192.png          ikona 192×192
├── icon-512.png          ikona 512×512
├── icon-maskable-512.png ikona maskable (Android)
└── README.md             ten plik
```

## Dostosowanie

Wszystko jest w jednym pliku `index.html`. Paleta w `:root` na górze pliku, lista głosów w funkcji `pickBestPolishVoice()`, interwały w `<select id="interval">`.
