// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "KGW Pięknie i Twórczo";
export const SITE_DESCRIPTION = "Koło Gospodyń Wiejskich w Nadolicach Wielkich - tradycja, wspólnota i twórczość";

// Dane kontaktowe KGW
export const KGW_DATA = {
	name: "Koło Gospodyń Wiejskich Pięknie i Twórczo w Nadolicach Wielkich",
	shortName: "KGW Pięknie i Twórczo",
	address: {
		street: "ul. Brzozwa 43 / 1",
		postalCode: "55-003",
		city: "Nadolice Wielkie",
		voivodeship: "dolnośląskie"
	},
	nip: "8961590952",
	regon: "384717476",
	phone: "+48 512 471 936",
	phones: [
		{ label: "Przewodnicząca", number: "Natalia Howis" },
		{ label: "Zastępca", number: "Michał Dobrzycki" },
        { label: "Skarbnik", number: "Dagmara Czechowska" }
	],
	email: "pieknieitworczo.kgw@gmail.com",
	bankAccount: "41 1600 1462 1882 8103 0000 0001"
};

// Konfiguracja warsztatów
export const WORKSHOP_CONFIG = {
	candles: {
		title: "Warsztaty tworzenia świec",
		description: "Naucz się tworzyć piękne, ręcznie robione świece!",
		price: 30,
		maxParticipants: 20,
		// URL do Google Form - należy utworzyć formularz i wkleić tutaj URL
		googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSePZsQEJNDmQ1yZmR05f3Y49tfKhY1dngJ7fTaO2mJGSd87xw/viewform?embedded=true",
		// ID Google Sheets do pobierania listy uczestników (opcjonalne)
		googleSheetsId: "1qttWNKzHdQJUnhzXTNENRxkFWoaJJTNBi3EhB4XwtAk",
		// Zakres danych w arkuszu (np. "Odpowiedzi formularza 1!A2:F")
		sheetsRange: "Odpowiedzi formularza 1!A2:D"
	}
};
