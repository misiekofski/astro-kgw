# Konfiguracja zmiennych środowiskowych na Cloudflare Pages

## Metoda 1: Przez Dashboard Cloudflare (Zalecana)

### Krok 1: Zaloguj się do Cloudflare Dashboard
1. Przejdź na https://dash.cloudflare.com
2. Zaloguj się na swoje konto

### Krok 2: Przejdź do swojego projektu
1. W menu bocznym wybierz **"Workers & Pages"**
2. Znajdź i kliknij na swój projekt (np. "astro-kgw")

### Krok 3: Dodaj zmienną środowiskową
1. Kliknij zakładkę **"Settings"** (Ustawienia)
2. Przewiń do sekcji **"Environment variables"** (Zmienne środowiskowe)
3. Kliknij **"Add variable"** lub **"Edit variables"**

### Krok 4: Dodaj klucz API
1. W polu **"Variable name"** wpisz:
   ```
   PUBLIC_GOOGLE_SHEETS_API_KEY
   ```

2. W polu **"Value"** wklej swój klucz API z Google Cloud Console:
   ```
   AIzaSy...twój-klucz-api...
   ```

3. Wybierz środowisko:
   - ✅ **Production** (Produkcja) - dla wersji live
   - ✅ **Preview** (Podgląd) - dla wersji testowych (opcjonalnie)

4. Kliknij **"Save"** / **"Zapisz"**

### Krok 5: Przebuduj projekt
1. Przejdź do zakładki **"Deployments"**
2. Kliknij **"Retry deployment"** na ostatnim wdrożeniu
   
   LUB
   
3. Wykonaj nowy commit do repozytorium (automatyczne wdrożenie)

### Krok 6: Weryfikacja
1. Otwórz swoją stronę w przeglądarce
2. Przejdź do `/warsztaty-swiece`
3. Przewiń do sekcji "Lista uczestników"
4. Jeśli wszystko działa, zobaczysz listę uczestników lub komunikat "Bądź pierwszą osobą..."

---

## Metoda 2: Przez Wrangler CLI (Zaawansowana)

Jeśli wolisz terminal:

### Instalacja Wrangler
```bash
npm install -g wrangler
```

### Logowanie
```bash
wrangler login
```

### Dodanie zmiennej
```bash
wrangler pages project create astro-kgw
wrangler pages secret put PUBLIC_GOOGLE_SHEETS_API_KEY
# Wklej klucz API gdy zostaniesz poproszony
```

---

## Metoda 3: Przez plik wrangler.toml (Nie zalecana dla sekretów)

⚠️ **NIE UŻYWAJ TEJ METODY DLA KLUCZY API** - pliki wrangler.toml są commitowane do Git!

Zamiast tego zawsze używaj Dashboard lub Wrangler CLI.

---

## Ważne uwagi dla Cloudflare Pages

### 1. Prefix `PUBLIC_`
W Astro zmienne środowiskowe dostępne w przeglądarce **MUSZĄ** zaczynać się od `PUBLIC_`:
```
PUBLIC_GOOGLE_SHEETS_API_KEY  ✅ Poprawne
GOOGLE_SHEETS_API_KEY         ❌ Nie zadziała w przeglądarce
```

### 2. Build vs Runtime
- Cloudflare Pages ustawia zmienne podczas **build time** (budowania)
- Zmienne z prefiksem `PUBLIC_` są wbudowane w kod JavaScript
- Po zmianie zmiennej **MUSISZ** przebudować projekt

### 3. Bezpieczeństwo
⚠️ Zmienne z prefiksem `PUBLIC_` są **widoczne w kodzie JavaScript** przeglądarki!
- To jest OK dla klucza API Google Sheets (z ograniczeniami)
- NIE używaj tego dla sekretów backendowych
- Ogranicz klucz API tylko do Google Sheets API w Google Cloud Console

### 4. Różne środowiska
Możesz ustawić różne wartości dla:
- **Production** - wersja live (np. https://ksnadolice.ovh)
- **Preview** - wersje testowe (np. pull requesty)

---

## Rozwiązywanie problemów

### Problem: Zmienna nie działa po dodaniu
**Rozwiązanie**: Przebuduj projekt
1. Cloudflare Dashboard → Deployments
2. Retry deployment
3. Lub zrób nowy commit do repo

### Problem: "Brak klucza API" mimo ustawienia
**Sprawdź**:
1. Czy nazwa zmiennej to dokładnie `PUBLIC_GOOGLE_SHEETS_API_KEY`
2. Czy przebudowałeś projekt po dodaniu zmiennej
3. Czy zmienna jest ustawiona dla środowiska "Production"

### Problem: Lista uczestników nie ładuje się
**Sprawdź**:
1. Czy arkusz Google Sheets jest udostępniony publicznie ("Anyone with the link")
2. Czy Google Sheets API jest włączone w Google Cloud Console
3. Czy klucz API ma uprawnienia do Google Sheets API
4. Otwórz konsolę przeglądarki (F12) i sprawdź błędy

---

## Przykładowa konfiguracja w Cloudflare Dashboard

```
┌─────────────────────────────────────────────────┐
│ Environment Variables                            │
├─────────────────────────────────────────────────┤
│ Variable name: PUBLIC_GOOGLE_SHEETS_API_KEY     │
│ Value: AIzaSy...                                 │
│ Environment: ☑ Production  ☑ Preview            │
│                                                  │
│ [Save]                                           │
└─────────────────────────────────────────────────┘
```

---

## Dodatkowe zmienne (opcjonalnie)

Jeśli w przyszłości będziesz potrzebować więcej zmiennych:

```bash
# Przykłady innych zmiennych
PUBLIC_SITE_URL=https://ksnadolice.ovh
PUBLIC_CONTACT_EMAIL=pieknieitworczo.kgw@gmail.com
```

Dodaj je w ten sam sposób przez Dashboard → Settings → Environment variables.

---

## Linki pomocnicze

- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **Dokumentacja Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **Zmienne środowiskowe w Astro**: https://docs.astro.build/en/guides/environment-variables/
- **Google Cloud Console**: https://console.cloud.google.com

---

## Podsumowanie

1. ✅ Cloudflare Dashboard → Workers & Pages → Twój projekt
2. ✅ Settings → Environment variables → Add variable
3. ✅ Nazwa: `PUBLIC_GOOGLE_SHEETS_API_KEY`
4. ✅ Wartość: Twój klucz API
5. ✅ Save i Retry deployment
6. ✅ Gotowe! 🎉
