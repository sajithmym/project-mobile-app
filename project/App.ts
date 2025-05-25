import 'react-native-url-polyfill/auto';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { ExpoRoot } from 'expo-router';

// Ignore specific warnings that are not relevant
LogBox.ignoreLogs([
  'Constants.platform.ios.model has been deprecated',
  'ViewPropTypes will be removed from React Native',
]);

export function App() {
  // Initialize any global app configuration here
  useEffect(() => {
    // Add any global initialization logic
  }, []);

  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

export default App;