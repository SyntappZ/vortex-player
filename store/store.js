import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './reducers/themeReducer';
import playerReducer from './reducers/playerReducer';
import globalReducer from './reducers/globalReducer';

const rootReducer = combineReducers({
  playerReducer: playerReducer,
  themeReducer: themeReducer,
  globalReducer: globalReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
