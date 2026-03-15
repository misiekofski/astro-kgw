# Konfiguracja Google Sheets API dla listy uczestników

## Krok 1: Włącz Google Sheets API w Google Cloud Console

1. Przejdź na https://console.cloud.google.com
2. Utwórz nowy projekt lub wybierz istniejący:
   - Kliknij menu rozwijane projektu (u góry)
   - Kliknij "New Project" / "Nowy projekt"
   - Nazwij go np. "KGW Warsztaty"
   - Kliknij "Create" / "Utwórz"

3. Włącz Google Sheets API:
   - W menu bocznym wybierz "APIs & Services" → "Library"
   - Wyszukaj "Google Sheets API"
   - Kliknij na "Google Sheets API"
   - Kliknij "Enable" / "Włącz"

## Krok 2: Utwórz klucz API

1. W menu bocznym wybierz "APIs & Services" → "Credentials"
2. Kliknij "+ CREATE CREDENTIALS" / "+ UTWÓRZ DANE UWIERZYTELNIAJĄCE"
3. Wybierz "API key" / "Klucz API"
4. Klucz zostanie wygenerowany - **SKOPIUJ GO**
5. Opcjonalnie: Kliknij "Restrict Key" / "Ogranicz klucz" dla bezpieczeństwa:
   - W sekcji "API restrictions" wybierz "Restrict key"
   - Zaznacz tylko "Google Sheets API"
   - Kliknij "Save" / "Zapisz"

## Krok 3: Udostępnij arkusz Google Sheets publicznie

1. Otwórz swój arkusz Google Sheets (ID: `1qttWNKzHdQJUnhzXTNENRxkFWoaJJTNBi3EhB4XwtAk`)
2. Kliknij przycisk "Udostępnij" / "Share" w prawym górnym rogu
3. W sekcji "Ogólny dostęp" / "General access":
   - Zmień z "Restricted" na **"Anyone with the link"** / "Każdy, kto ma link"
   - Uprawnienia: **"Viewer"** / "Przeglądający" (tylko do odczytu!)
4. Kliknij "Done" / "Gotowe"

⚠️ **WAŻNE**: Upewnij się, że arkusz jest ustawiony jako "Viewer" (tylko odczyt), aby nikt nie mógł edytować danych!

## Krok 4: Sprawdź nazwę zakładki w arkuszu

1. W Google Sheets sprawdź nazwę zakładki z odpowiedziami formularza
2. Domyślnie nazywa się "Odpowiedzi formularza 1" lub "Form Responses 1"
3. Jeśli nazwa jest inna, zaktualizuj `sheetsRange` w pliku `src/consts.ts`:
   ```typescript
   sheetsRange: "TWOJA_NAZWA_ZAKLADKI!A2:F"
   ```

## Krok 5: Dodaj klucz API do projektu

1. W głównym katalogu projektu utwórz plik `.env`:
   ```bash
   # W terminalu:
   copy .env.example .env
   ```

2. Otwórz plik `.env` i wklej swój klucz API:
   ```
   PUBLIC_GOOGLE_SHEETS_API_KEY=AIzaSy...twój-klucz-api...
   ```

3. **WAŻNE**: Upewnij się, że `.env` jest w `.gitignore` (już powinien być)

## Krok 6: Zrestartuj serwer deweloperski

```bash
# Zatrzymaj serwer (Ctrl+C)
# Uruchom ponownie:
npm run dev
```

## Krok 7: Testowanie

1. Otwórz stronę `/warsztaty-swiece` w przeglądarce
2. Przewiń do sekcji "Lista uczestników"
3. Jeśli wszystko działa poprawnie, zobaczysz:
   - Liczbę wolnych miejsc
   - Tabelę z uczestnikami (jeśli ktoś się zapisał)
   - Lub komunikat "Bądź pierwszą osobą..."

## Rozwiązywanie problemów

### Problem: "Brak klucza API"
- Sprawdź czy plik `.env` istnieje w głównym katalogu
- Sprawdź czy klucz zaczyna się od `PUBLIC_GOOGLE_SHEETS_API_KEY=`
- Zrestartuj serwer deweloperski

### Problem: "HTTP error! status: 403"
- Arkusz nie jest udostępniony publicznie
- Przejdź do Krok 3 i ustaw "Anyone with the link"
- Uprawnienia muszą być "Viewer"

### Problem: "HTTP error! status: 400"
- Sprawdź nazwę zakładki w arkuszu (Krok 4)
- Zaktualizuj `sheetsRange` w `src/consts.ts`
- Upewnij się, że zakres to `A2:F` (od wiersza 2, bo wiersz 1 to nagłówki)

### Problem: "The caller does not have permission"
- Klucz API nie ma włączonego Google Sheets API
- Przejdź do Google Cloud Console → APIs & Services → Library
- Włącz "Google Sheets API"

### Problem: Lista jest pusta mimo zapisów
- Sprawdź czy dane są w arkuszu Google Sheets
- Sprawdź czy zakres `sheetsRange` jest poprawny
- Otwórz konsolę przeglądarki (F12) i sprawdź błędy

## Mapowanie kolumn

Google Forms zapisuje dane w następujących kolumnach:

| Kolumna | Dane |
|---------|------|
| A | Timestamp (data i czas zapisu) |
| B | Imię i Nazwisko |
| C | email lub nr telefonu |
| D | Zobowiązuję się wpłacić 30 zł... |
| E | (inne pola formularza) |
| F | (inne pola formularza) |

⚠️ **UWAGA**: Sprawdź w swoim arkuszu, w których kolumnach są dane i dostosuj kod w `ParticipantsList.astro` jeśli potrzeba:

```typescript
participants = data.values.map((row) => ({
    registeredAt: row[0],  // Kolumna A - timestamp
    firstName: row[1],      // Kolumna B - imię
    lastName: row[2],       // Kolumna C - nazwisko
    email: row[3],          // Kolumna D - email
    phone: row[4],          // Kolumna E - telefon
    paymentConsent: row[5]  // Kolumna F - zgoda
}));
```

## Bezpieczeństwo

✅ **Dobre praktyki**:
- Klucz API w pliku `.env` (nie w kodzie!)
- `.env` w `.gitignore`
- Arkusz tylko do odczytu (Viewer)
- Ogranicz klucz API tylko do Google Sheets API

❌ **NIE RÓB TEGO**:
- Nie commituj klucza API do Git
- Nie udostępniaj arkusza z prawami "Editor"
- Nie używaj klucza API bez ograniczeń

## Deployment (produkcja)

Jeśli wdrażasz stronę na hosting (np. Netlify, Vercel):

1. Dodaj zmienną środowiskową w panelu hostingu:
   - Nazwa: `PUBLIC_GOOGLE_SHEETS_API_KEY`
   - Wartość: Twój klucz API

2. Przebuduj aplikację po dodaniu zmiennej

## Automatyczne odświeżanie

Obecnie lista odświeża się przy każdym przeładowaniu strony. Jeśli chcesz automatyczne odświeżanie:

1. Dodaj JavaScript do odświeżania co X sekund
2. Lub użyj Astro Islands z React/Vue dla dynamicznego odświeżania
3. Lub ustaw cache w Astro na krótki czas (np. 1 minutę)

## Koszty

Google Sheets API ma darmowy limit:
- **100 zapytań na 100 sekund na użytkownika**
- **500 zapytań dziennie na projekt**

Dla małego projektu KGW to w zupełności wystarczy! 🎉
