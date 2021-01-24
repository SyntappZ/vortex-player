import React, {useEffect} from 'react';

import {Provider} from 'react-redux';
import configureStore from './store/store';
import AppContainer from './navigation/AppContainer';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
