# Projekt aplikacje mobilne

## Uruchamianie

Aby uruchomić projekt, zainstaluj zależności:

```bash
npm i
```

Następnie, aby uruchomić aplikację:

```bash
npm start
```

Po wciśnięciu `w` aplikacja otworzy się z wykorzystaniem przeglądarki pod adresem [http://localhost:8081](http://localhost:8081).

## Info

#### Typowanie nawigacji

##### Jak zdefiniować typy parametrów przekazywanych do ekranu?

W pliku [types.ts](https://github.com/kurczakooo/React-Native-Project/blob/main/src/types.ts) dla każdego stack navigatora (dla każdej zakładki - `Home`, `Exercises`, `Profile` i stacka z logowaniem `AuthStack`) określone są typy parametrów w postaci:

```
type <Nazwa stacka> = {
    <Nazwa ekranu>: <Obiekt z parametrami>
}
```

Przykład:

```ts
export type ExecisesStackParamList = {
    Debug: { exercises: PredefinedExercise[] } | undefined;
    Exercises: { mode: 'select' | 'view' } | undefined;
    Settings: undefined;
};
```

Parametry te są dostępne w obiekcie `route.params` (jak dostać obiekt `route` z określonymi typami? _Patrz poniżej_).

Gdy dodamy nowy ekran do danej zakładki, należy również dodać wpis w odpowiednim typie. `undefined` oznacza, że ekran nie przyjmuje żadnych parametrów.

##### Jak zrobić typowanie nawigacji w komponencie?

1. W zależności w jakiej zakładce komponent się znajduje trzeba zaimporować typy `HomeTabScreenProps`, `ProfileTabScreenProps` lub `ExercisesTabScreenProps`. Dla ekranów logowania które nie są w zakładce jest `AuthStackScreenProps`.
2. Dajemy odpowiedni typ propsom komponentu ekranu. W template trzeba dać nazwę ekranu.

Przykład:

```ts
export default function ExercisesScreen(props: ExercisesTabScreenProps<'Exercises'>) {
    const { navigation, route } = props;
    // ...
}
```

Od teraz, przykładowo `navigation.navigate()` będzie miał podpowiedzi, do jakich ekranów można nawigować.

> [!CAUTION]
> Jeżeli chcemy nawigować do innej zakładki, trzeba określić screen.
> W przeciwnym razie typescript wyrzuci błąd.
> Dostaniemy błąd również jeżeli ekran nie istnieje w danym stacku.
>
> Przykład:
>
> ```ts
> navigation.navigate('HomeTab', { screen: 'Home' });
> ```
>
> Poruszając się wewnątrz danego stacka, składnia zostaje domyślna:
>
> ```ts
> navigation.navigate('Settings');
> ```

## Testowe API

Aby uruchomić proces z testowym API:

```bash
npm run api
```

Endpointy będą wówczas dostępne pod adresem [http://localhost:3000](http://localhost:3000).

Dostępne metody HTTP i opcje wyszukiwania/sortowania opisane są na stronie pakietu [json-server](https://www.npmjs.com/package/json-server).

> [!NOTE]  
> Definicje typów obiektów używanych przez API znajdują się w pliku [types.ts](https://github.com/kurczakooo/React-Native-Project/blob/main/src/types.ts).

#### Tworzone endpointy

| Endpoint                | Opis                                                        | Typ rekordu ([types.ts](https://github.com/kurczakooo/React-Native-Project/blob/main/src/types.ts)) |
| ----------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `/users`                | Użytkownicy aplikacji.                                      | `User`                                                                                              |
| `/workouts`             | Wykonane treningi użytkownika.                              | `Workout`                                                                                           |
| `/exercises`            | Ćwiczenia wykonane w ramach treningu.                       | `WorkoutExercise`                                                                                   |
| `/sets`                 | Serie ćwiczenia treningowego.                               | `WorkoutSet`                                                                                        |
| `/predefined-exercises` | Predefiniowane ćwiczenia do przeglądania przez użytkownika. | `PredefinedExercise`                                                                                |

## Uwagi i linki

-   [JSON i obrazki z ćwiczeniami](https://github.com/yuhonas/free-exercise-db)
-   [Dokumentacja komponentów](https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator)
-   [Komponenty dla Figmy](https://www.figma.com/community/file/1035203688168086460)

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
