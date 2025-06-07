# Grocery Assistant (React Native)

This project is a **mobile grocery shopping assistant** built with **React Native** using the Expo framework. It was migrated from a previous Next.js web version to a fully mobile-first architecture.

## Architecture

- **Framework:** React Native (Expo)
- **Navigation:** React Navigation (Bottom Tab + Stack)
- **Main Screens:**
  - **Stores:** Find stores and browse store products
  - **Scanner:** Scan barcodes to add products
  - **Cart:** Manage your shopping cart
  - **Profile:** User profile and settings

## Directory Structure

```
grocery-assistant-rn/
  ├── assets/           # Images and static assets
  ├── screens/          # Main app screens
  ├── App.tsx           # App entry point
  ├── package.json      # Dependencies and scripts
  └── ...
```

## Getting Started

### 1. Install Dependencies

Navigate to the project directory and install dependencies:

```bash
cd grocery-assistant-rn
npm install
# or
yarn
```

### 2. Start the Development Server

```bash
npm start
# or
yarn start
# or using Expo CLI
npx expo start
```

### 3. Run on Device or Emulator

- **Android:**
  ```bash
  npm run android
  ```
- **iOS:**
  ```bash
  npm run ios
  ```
- **Web:**
  ```bash
  npm run web
  ```

> You can also use the Expo Go app to scan the QR code and preview the app on your mobile device (make sure your phone and computer are on the same network).

## Dependencies

- `expo`: React Native development platform
- `@react-navigation/*`: Navigation
- `@expo/vector-icons`: Icon library
- See `package.json` for the full list

## Notes

- All image assets should be placed in the `assets/` directory.
- Main screen code is in the `screens/` directory.
- To customize or add features, refer to the navigation structure in `App.tsx`.

---

Feel free to open issues or contribute! 