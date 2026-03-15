# Konfiguracja Cloudflare Workers dla Astro

## ✅ Twój projekt używa Cloudflare Workers (nie Pages)

### Krok 1: Dodaj Secret w Cloudflare Dashboard

1. **Zaloguj się**: https://dash.cloudflare.com
2. **Workers & Pages** → wybierz swój projekt "astro-kgw"
3. **Settings** → przewiń do **"Variables and Secrets"**
4. W sekcji **"Secrets"** kliknij **"Add"** lub **"Edit variables"**
5. Dodaj:
   - **Variable name**: `PUBLIC_GOOGLE_SHEETS_API_KEY`
   - **Value**: Twój klucz API z Google Cloud Console
   - **Type**: Secret (zaszyfrowany)
6. Kliknij **"Save"** lub **"Deploy"**

### Krok 2: Zweryfikuj deployment

1. Po zapisaniu secret, projekt automatycznie się przebuduje
2. Jeśli nie, kliknij **"Deploy"** ręcznie
3. Poczekaj na zakończenie deploymentu (1-2 minuty)

### Krok 3: Sprawdź czy działa

1. Otwórz swoją stronę: https://kgw.nadolicewielkie.org/warsztaty-swiece
2. Otwórz konsolę przeglądarki (F12 → Console)
3. Sprawdź logi:
   ```
   Runtime available: true
   API_KEY exists: true
   API_KEY source: runtime.env
   SHEET_ID: 1qttWNKzHdQJUnhzXTNENRxkFWoaJJTNBi3EhB4XwtAk
   RANGE: Odpowiedzi formularza 1!A2:D
   ```

Jeśli widzisz `API_KEY source: runtime.env` - działa! ✅

---

## 🔧 Jak to działa w Cloudflare Workers

### Różnica między Workers a Pages:

**Cloudflare Workers:**
- Zmienne w sekcji "Variables and Secrets"
- Dostępne przez `runtime.env` w kodzie
- Secrets są zaszyfrowane

**Cloudflare Pages:**
- Zmienne w sekcji "Environment variables"
- Dostępne przez `import.meta.env` podczas build time
- Publiczne zmienne wbudowane w kod

### W kodzie (ParticipantsList.astro):

```typescript
// Pobieranie z Cloudflare Workers runtime
const runtime = Astro.locals.runtime;
const API_KEY = runtime?.env?.PUBLIC_GOOGLE_SHEETS_API_KEY;
```

Kod automatycznie próbuje obu metod (Workers i Pages) jako fallback.

---

## 📝 Plik wrangler.toml

Utworzyłem plik `wrangler.toml` w głównym katalogu projektu. Jest to konfiguracja dla Cloudflare Workers.

**Ważne**: Secrets NIE są w `wrangler.toml` (to byłoby niebezpieczne). Są tylko w Cloudflare Dashboard.

---

## 🐛 Rozwiązywanie problemów

### Problem: "Runtime available: false"
- Projekt nie jest wdrożony jako Worker
- Sprawdź czy `astro.config.mjs` ma adapter `@astrojs/cloudflare`

### Problem: "API_KEY exists: false"
- Secret nie jest ustawiony w Cloudflare Dashboard
- Sprawdź czy nazwa to dokładnie `PUBLIC_GOOGLE_SHEETS_API_KEY`
- Przebuduj projekt po dodaniu secretu

### Problem: "API_KEY source: import.meta.env"
- Klucz pochodzi z lokalnego `.env`, nie z Cloudflare
- To OK lokalnie, ale na produkcji powinno być `runtime.env`

### Problem: Lista uczestników nie ładuje się
1. Sprawdź konsolę przeglądarki - jakie błędy?
2. Sprawdź czy arkusz Google Sheets jest publiczny
3. Sprawdź czy Google Sheets API jest włączone
4. Sprawdź czy klucz API ma uprawnienia

---

## 🚀 Deployment workflow

1. **Lokalnie** (development):
   - Utwórz plik `.env` z kluczem API
   - `npm run dev`
   - Kod używa `import.meta.env.PUBLIC_GOOGLE_SHEETS_API_KEY`

2. **Na Cloudflare** (production):
   - Ustaw Secret w Dashboard
   - Push do repo (auto-deploy) lub `wrangler deploy`
   - Kod używa `runtime.env.PUBLIC_GOOGLE_SHEETS_API_KEY`

---

## 📚 Przydatne linki

- **Cloudflare Workers Docs**: https://developers.cloudflare.com/workers/
- **Astro Cloudflare Adapter**: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- **Wrangler CLI**: https://developers.cloudflare.com/workers/wrangler/

---

## ✅ Podsumowanie

Twój projekt Astro jest wdrożony jako **Cloudflare Worker** z adapterem `@astrojs/cloudflare`.

**Aby dodać klucz API:**
1. Dashboard → Workers & Pages → astro-kgw
2. Settings → Variables and Secrets → Add Secret
3. Nazwa: `PUBLIC_GOOGLE_SHEETS_API_KEY`
4. Wartość: Twój klucz API
5. Save → Deploy

Kod automatycznie pobierze klucz z `runtime.env` i lista uczestników zadziała! 🎉
