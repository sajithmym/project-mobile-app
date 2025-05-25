# My React Native App

This is a fully functional React Native application that implements Firebase authentication. The app includes several screens: Login, Sign Up, Home, and Settings, designed with a clean and modern UI.

## Features

- **User Authentication**: Secure login and signup using Firebase.
- **Role-Based Authorization**: Different user roles with specific permissions.
- **Responsive Design**: The app is designed to work on various screen sizes and devices.
- **Dark Mode and Light Mode**: Users can toggle between dark and light themes.
- **Smooth Transitions and Animations**: Enhanced user experience with smooth navigation.
- **Profile Management**: Users can view and edit their profile details.
- **Settings Screen**: Options for logging out, switching themes, and selecting language preferences.
- **Route Protection**: Ensures that only authenticated users can access certain routes.

## Project Structure

```
my-react-native-app
├── src
│   ├── components
│   ├── constants
│   ├── navigation
│   ├── screens
│   ├── services
│   ├── store
│   ├── utils
│   ├── App.tsx
│   └── theme
├── app.json
├── babel.config.js
└── package.json
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-react-native-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project and add your app.
   - Update the `src/services/firebaseConfig.ts` file with your Firebase configuration.

4. Run the app:
   ```
   npm start
   ```

## Usage

- **Login**: Users can log in using their credentials.
- **Sign Up**: New users can create an account.
- **Home**: The main screen with navigation options.
- **Profile**: View and edit user details.
- **Settings**: Manage app settings, including logout and theme preferences.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.