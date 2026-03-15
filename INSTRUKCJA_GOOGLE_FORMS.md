# Instrukcja konfiguracji Google Forms dla warsztatów

## Krok 1: Utwórz Google Form

1. Przejdź na https://forms.google.com
2. Kliknij "+" aby utworzyć nowy formularz
3. Nazwij formularz: "Warsztaty tworzenia świec - KGW Pięknie i Twórczo"

## Krok 2: Dodaj pola formularza

Dodaj następujące pytania (wszystkie jako "Krótka odpowiedź" lub odpowiedni typ):

1. **Imię** (Krótka odpowiedź, wymagane)
2. **Nazwisko** (Krótka odpowiedź, wymagane)
3. **Email** (Krótka odpowiedź, wymagane, walidacja email)
4. **Telefon** (Krótka odpowiedź, opcjonalne)
5. **Potwierdzam wpłatę 30 zł** (Pole wyboru, wymagane)
   - Tekst: "Potwierdzam, że zobowiązuję się do wpłaty 30 zł na konto KGW w ciągu 3 dni"
6. **Zgoda RODO** (Pole wyboru, wymagane)
   - Tekst: "Wyrażam zgodę na przetwarzanie danych osobowych"

## Krok 3: Skonfiguruj ustawienia formularza

1. Kliknij ikonę koła zębatego (Ustawienia)
2. W zakładce "Ogólne":
   - ✅ Zbieraj adresy e-mail
   - ✅ Ogranicz do 1 odpowiedzi (wymaga logowania Google)
   - ✅ Edycja po wysłaniu (opcjonalnie)
3. W zakładce "Prezentacja":
   - Ustaw komunikat potwierdzenia: "Dziękujemy za rejestrację! Pamiętaj o wpłacie 30 zł w ciągu 3 dni."

## Krok 4: Pobierz URL formularza

1. Kliknij "Wyślij" w prawym górnym rogu
2. Wybierz ikonę łańcucha (link)
3. Opcjonalnie: zaznacz "Skróć adres URL"
4. **Skopiuj URL** - będzie wyglądał mniej więcej tak:
   ```
   https://forms.gle/xxxxxxxxxxxxx
   ```

## Krok 5: Skonfiguruj Google Sheets (automatyczne)

1. W formularzu kliknij zakładkę "Odpowiedzi"
2. Kliknij ikonę Google Sheets (zielona ikona arkusza)
3. Wybierz "Utwórz nowy arkusz kalkulacyjny"
4. Arkusz zostanie automatycznie utworzony i połączony z formularzem

## Krok 6: Pobierz ID Google Sheets

1. Otwórz utworzony arkusz Google Sheets
2. Skopiuj ID z URL arkusza:
   ```
   https://docs.google.com/spreadsheets/d/[TO_JEST_ID]/edit
   ```
3. ID to długi ciąg znaków między `/d/` a `/edit`

## Krok 7: Zaktualizuj konfigurację w projekcie

Otwórz plik `src/consts.ts` i zaktualizuj sekcję `WORKSHOP_CONFIG`:

```typescript
export const WORKSHOP_CONFIG = {
	candles: {
		title: "Warsztaty tworzenia świec",
		description: "Naucz się tworzyć piękne, ręcznie robione świece!",
		price: 30,
		maxParticipants: 20,
		// Wklej URL formularza tutaj:
		googleFormUrl: "https://forms.gle/xxxxxxxxxxxxx",
		// Wklej ID arkusza tutaj:
		googleSheetsId: "twoje-id-arkusza-tutaj",
		// Zakres danych (zazwyczaj nie trzeba zmieniać):
		sheetsRange: "Odpowiedzi formularza 1!A2:F"
	}
};
```

## Krok 8: Opcjonalnie - Skonfiguruj Google Sheets API (dla listy uczestników)

Aby automatycznie wyświetlać listę uczestników na stronie:

### 8.1. Włącz Google Sheets API

1. Przejdź do https://console.cloud.google.com
2. Utwórz nowy projekt lub wybierz istniejący
3. Włącz "Google Sheets API"
4. Utwórz klucz API (Credentials → Create Credentials → API Key)

### 8.2. Udostępnij arkusz publicznie (opcja prosta)

1. Otwórz arkusz Google Sheets
2. Kliknij "Udostępnij" w prawym górnym rogu
3. Zmień na "Każdy, kto ma link - Przeglądający"
4. Skopiuj link

### 8.3. Zaktualizuj komponent ParticipantsList.astro

W pliku `src/components/ParticipantsList.astro` dodaj kod pobierający dane:

```typescript
// Przykład pobierania danych z Google Sheets API
const SHEETS_API_KEY = 'twój-klucz-api';
const SHEET_ID = workshop.googleSheetsId;
const RANGE = workshop.sheetsRange;

let participants = [];

if (SHEET_ID && SHEETS_API_KEY) {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${SHEETS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.values) {
      participants = data.values.map((row, index) => ({
        firstName: row[1] || '',
        lastName: row[2] || '',
        email: row[3] || '',
        phone: row[4] || '',
        registeredAt: row[0] || new Date().toISOString()
      }));
    }
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
  }
}
```

## Krok 9: Testowanie

1. Otwórz stronę `/warsztaty-swiece` w przeglądarce
2. Wypełnij formularz testowymi danymi
3. Sprawdź czy dane pojawiają się w Google Sheets
4. Sprawdź czy lista uczestników się aktualizuje (jeśli skonfigurowałeś API)

## Alternatywa: Osadzenie formularza jako iframe

Jeśli wolisz osadzić formularz bezpośrednio na stronie:

1. W Google Forms kliknij "Wyślij"
2. Wybierz ikonę `< >` (Osadź HTML)
3. Skopiuj kod iframe
4. W pliku `WorkshopRegistrationForm.astro` zamień formularz na:

```html
<iframe 
  src="https://docs.google.com/forms/d/e/xxxxx/viewform?embedded=true" 
  width="100%" 
  height="1200" 
  frameborder="0" 
  marginheight="0" 
  marginwidth="0">
  Ładowanie…
</iframe>
```

## Wskazówki

- **Limit miejsc**: Możesz ustawić limit odpowiedzi w Google Forms (Ustawienia → Ogólne → "Ogranicz liczbę odpowiedzi")
- **Powiadomienia**: Włącz powiadomienia email o nowych odpowiedziach (w arkuszu: Narzędzia → Reguły powiadomień)
- **Automatyzacja**: Użyj Google Apps Script do automatycznego wysyłania emaili potwierdzających

## Bezpieczeństwo

⚠️ **Ważne**: Nie udostępniaj klucza API publicznie w kodzie! Użyj zmiennych środowiskowych:

1. Utwórz plik `.env` w głównym katalogu projektu:
   ```
   PUBLIC_SHEETS_API_KEY=twój-klucz-api
   ```

2. W komponencie użyj:
   ```typescript
   const SHEETS_API_KEY = import.meta.env.PUBLIC_SHEETS_API_KEY;
   ```

3. Dodaj `.env` do `.gitignore`
