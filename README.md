# Projekt aplikacje mobilne

## Uruchamianie

Aby uruchomić projekt, zainstaluj zależności:

```bash
npm i
```

Następnie, aby uruchomić aplikację:

```bash
npm run start
```

Po wciśnięciu `W` aplikacja otworzy się z wykorzystaniem przeglądarki pod adresem [http://localhost:8081](http://localhost:8081).

## To - do

-   [ ] Konfiguracja projektu (`prettier`, `eslint`)

## O projekcie

**Temat projektu:** Aplikacja do treningu

#### Funkcjonalności:

-   logowanie, rejestracja
-   edycja danych logowania
-   śledzenie statystyk dotyczących ćwiczeń i treningów
-   przeglądanie predefiniowanych ćwiczeń
-   tworzenie treningu z gotowych ćwiczeń
-   zapisywanie treningów w kalendarzu

#### Ekrany:

1.  **Logowanie / rejestracja**

    -   formularz login/hasło
    -   przełączenie na ekran rejestracji

2.  **Ekran główny**

    -   ostanie treningi
    -   przycisk do rozpoczęcia nowego treningu

3.  **Aktualny trening**

    -   przycisk początkujący ćwiczenia
    -   wpisywanie obciążenia i ilości powtorzeń
    -   dodawanie serii ćwiczeń
    -   wynik/podsumowanie z ostatniego treningu
    -   licznik czasu treningu
    -   dodawanie zdjęcia po zakończeniu treningu
    -   odliczanie czasu odpoczynku

4.  **Wykonany trening**

    -   lista wykonanych ćwiczeń
    -   ilości serii, powtórzeń i waga
    -   czas treningu
    -   zdjęcie z treningu

5.  **Ćwiczenia**

    -   lista predefiniowanych ćwiczeń
    -   krótkie opisy (po kliknięciu)

6.  **Kalendarz**

    -   zaznaczone dni treningowe
    -   ilość tygodni treningowych pod rząd
    -   ilość dni odpoczynku

7.  **Profil ze statystykami**

    -   wykres podsumowujący czas treningów
    -   wykres pokazujący rozkład ćwiczeń na partie mięśniowe
    -   łączna ilość treningów
    -   łączny czas treninów

8.  **Ustawienia**

    -   zmiana loginu
    -   zmiana hasła
    -   zmiana motywu aplikacji
    -   wylogowanie

#### Sensory:

-   **Aparat** - dodawanie swoich zdjęć do
    śledzenia progresu

-   **Wibracje** - telefon wibruje kiedy czas
    odpoczynku podczas treningu dobiegnie końca
