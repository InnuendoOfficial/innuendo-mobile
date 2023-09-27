# Innuendo mobile app

<img align="right" src="./src/assets/logos/round.png" alt="Innuendo logo" width="50" height="50"/>

Innuendo is an health mobile app for women diagnosed with endometriosis.
Our goal is to reduce the time of diagnosis by allowing easier and
clearer communication between women and health professionals.

## Table of content
1. [Run Locally](#run-locally)
2. [Available scripts](#available-scripts)
3. [Tech Stack](#tech-stack)
4. [Color Reference](#color-reference)
5. [Roadmap](#roadmap)

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  (android) npm run android
  (ios) npm run ios
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts a metro server

### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner.

### `npm lint`

Runs [eslint](https://eslint.org/) to format all source files according to the rules defined in .eslintrc.js and .prettierrc.js

## Tech Stack

- React Native
- Typescript
- [NativeBase](https://nativebase.io/)

## Color Reference

| Color                                                                      | Hex     | RGB           |
| -------------------------------------------------------------------------- | ------- | --------------|
| ![#776CCB](https://via.placeholder.com/10/776CCB?text=+) Primary           | #776CCB | 119, 108, 203 |
| ![#ECEAFF](https://via.placeholder.com/10/ECEAFF?text=+) Primary variant   | #ECEAFF | 236, 234, 255 |
| ![#3C3B40](https://via.placeholder.com/10/3C3B40?text=+) Secondary         | #3C3B40 | 60, 59, 64    |
| ![#AFACC6](https://via.placeholder.com/10/AFACC6?text=+) Secondary variant | #AFACC6 | 175, 172, 198 |
| ![#FFFFFF](https://via.placeholder.com/10/FFFFFF?text=+) Background        | #FFFFFF | 255, 255, 255 |
| ![#3C3B40](https://via.placeholder.com/10/3C3B40?text=+) On background     | #3C3B40 | 60, 59, 64    |
| ![#776CCB](https://via.placeholder.com/10/776CCB?text=+) Surface           | #776CCB | 119, 108, 203 |
| ![#FFFFFF](https://via.placeholder.com/10/FFFFFF?text=+) On Surface        | #FFFFFF | 255, 255, 255 |
| ![#27AE60](https://via.placeholder.com/10/27AE60?text=+) Success           | #27AE60 | 39, 174, 96   |
| ![#E74C3C](https://via.placeholder.com/10/E74C3C?text=+) Error             | #E74C3C | 231, 76, 60   |
| ![#E67E22](https://via.placeholder.com/10/E67E22?text=+) Warning           | #E67E22 | 230, 126, 34  |
| ![#F1C40F](https://via.placeholder.com/10/F1C40F?text=+) Other             | #F1C40F | 241, 196, 15  |

## Roadmap

- [ ] définir le Semantic versionning
- [x] intégrer un store globale
  - [Zustand](https://github.com/pmndrs/zustand)
- [x] setup un linter et son CI / CD lors du push sur main
  - eslint
  - prettier
- [ ] créer un document d'exigences de qualité de code
  - linter
  - taux de couverture de tests supérieurs à 80%
  - Gitflow et [Conventional commits](https://www.conventionalcommits.org/en/)
- [x] notifications
- [x] tests
  - jest
- [ ] monitoring et analytics
  - [LogRocket](https://logrocket.com/)
  - [React navigation screen tracker](https://reactnavigation.org/docs/screen-tracking)
- [x] [App intro slider](https://github.com/Jacse/react-native-app-intro-slider)
- [ ] internationalization
  - i18n
- [ ] dark et light theme
- [ ] animations
  - [React native Lottie](https://github.com/lottie-react-native/lottie-react-native)