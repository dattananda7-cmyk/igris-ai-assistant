import React from 'react';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import store from './redux/store';
import RootNavigator from './navigation/RootNavigator';
import { colors } from './theme/colors';

const App = () => {
  const theme = {
    colors: {
      primary: colors.primary,
      background: colors.background,
      surface: colors.surface,
      error: colors.error,
      text: colors.text,
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <RootNavigator />
      </PaperProvider>
    </Provider>
  );
};

export default App;
