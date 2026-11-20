# GO! — strona internetowa v3 (GitHub Pages)

Landing page zgodny z wyglądem aplikacji GO!. Znak jest bezpośrednią, pomniejszoną kopią dostarczonego `logoGo.png` (bez ponownego rysowania liter). Inne ikony są lekkie i funkcjonalne.

## Struktura — wszystkie pliki należy zachować w tych ścieżkach

```
index.html
styles.css
script.js
config.js
README.md
assets/
  logo-go.png
  favicon.png
  og-cover.png
  coffee-meet.svg
  screen-actions.webp
  screen-map.webp
  screen-details.webp
```

## Publikacja na GitHub Pages

1. Utwórz osobne, publiczne repozytorium, np. `go-landing`.
2. Prześlij `index.html`, `styles.css`, `script.js`, `config.js` do katalogu głównego repozytorium.
3. Stwórz folder `assets` i wgraj tam **wszystkie** pliki graficzne według powyższych nazw.
4. W `Settings → Pages` wybierz `Deploy from a branch`, gałąź `main`, folder `/(root)` i zapisz.
5. Otwórz stronę przez wygenerowany adres GitHub Pages; upewnij się, że grafiki się wyświetlają.

Nie jest potrzebny backend, hosting płatny, React ani instalacja zależności. Podgląd akcji i animacja działają lokalnie w przeglądarce i wykorzystują **dane demonstracyjne**. Nie zapisują nikogo na realne wydarzenia, nie komunikują się z Supabase.

## Link do testów

W `config.js` znajdują się ustawienia:

```js
window.GO_CONFIG = {
  testsOpen: false,
  testUrl: ""
};
```

Gdy testy będą rzeczywiście otwarte, wstaw **prawdziwy adres HTTPS** i ustaw `testsOpen: true`. Do tego czasu przycisk pozostaje ukryty. Nie umieszczaj w `config.js` haseł, tokenów ani kluczy administracyjnych.

## Podgląd społecznościowy

Plik `assets/og-cover.png` jest gotowy. Po wybraniu ostatecznej publicznej domeny dodaj w `index.html` pełny adres HTTPS w metadanych `og:image`, np. `<meta property="og:image" content="https://TWOJA-DOMENA/assets/og-cover.png">`. Wcześniej usunęliśmy sztywno wpisany adres poprzedniego repozytorium, aby nie wysyłać ruchu pod błędny link.

## Testy

Warto sprawdzić na desktopie i telefonie: przełączanie kategorii, powtórzenie animacji, menu mobilne, brak poziomego scrollowania, widoczność realnego logo, niewidoczny link do testów przy `testsOpen: false`.
