import React from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider value={{
dark: false,
colors: {
primary: '',
background: '',
card: '',
text: '',
border: '',
notification: ''
}
}} children={undefined}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;