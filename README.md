# React Native Reminder App

A React Native (Expo) mobile app to manage personal reminders with deadlines.
It is the mobile client of the [node-reminder](https://github.com/davidebalice/node-reminder) REST API.

## Features

- Login with JWT token saved in AsyncStorage; reminder screens are protected
- List of reminders with title, description, category and deadline
- Create a reminder with a date picker and a category picker
- Edit and delete reminders (with confirmation)
- Home page with carousel and info modal
- App bar, side drawer menu and bottom bar
- Selectable color themes

## Tech stack

- [React Native 0.72](https://reactnative.dev/) with [Expo SDK 49](https://expo.dev/)
- [React Navigation 6](https://reactnavigation.org/)
- [React Native Paper](https://reactnativepaper.com/) and [react-native-paper-dates](https://web-ridge.github.io/react-native-paper-dates/)
- [@react-native-picker/picker](https://github.com/react-native-picker/picker)
- [Axios](https://axios-http.com/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [date-fns](https://date-fns.org/)

## Getting started

### Requirements

- Node.js 18 or later
- npm
- Android Studio (Android SDK / emulator) or Xcode for iOS
- A running instance of the [node-reminder](https://github.com/davidebalice/node-reminder) API

### Installation

```bash
git clone https://github.com/davidebalice/react-native-reminder-app.git
cd react-native-reminder-app
npm install
```

### Configuration

Set the API base URL in `config.js`:

```js
const API_URLS = {
  reminderApi: "http://localhost:8001",
};
```

When testing on a physical device, use the LAN IP address of the machine running the API instead of `localhost`.

### Available scripts

| Command           | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm start`       | Start the Expo development server (dev client)    |
| `npm run android` | Build and run the app on Android                  |
| `npm run ios`     | Build and run the app on iOS                      |
| `npm run web`     | Start the web version                             |

## API endpoints used

| Method | Endpoint                     | Description                         |
| ------ | ---------------------------- | ----------------------------------- |
| POST   | `/api/login/`                | Login, returns a JWT                |
| GET    | `/api/reminders/`            | List reminders                      |
| GET    | `/api/add/reminder`          | Data for the new reminder form      |
| POST   | `/api/add/reminder`          | Create a reminder                   |
| GET    | `/api/reminder/:id`          | Reminder detail                     |
| POST   | `/api/update/reminder/:id`   | Update a reminder                   |
| POST   | `/api/reminder/delete/:id`   | Delete a reminder                   |

## Project structure

```
App.js          # Root component and providers
router/         # Navigator (drawer, app bar, stack, bottom bar)
screens/        # Home, reminders, edit, login and theme screens
components/     # Reminder list, card, add/edit forms and UI components
context/        # Auth and theme contexts
middlewares/    # Protected content wrapper
config.js       # API base URL
```

## Author

**Davide Balice** – [davidebalice.dev](https://www.davidebalice.dev)
