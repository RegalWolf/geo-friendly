import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth';
import typesReducer from './store/reducers/types';
import scalesReducer from './store/reducers/scales';
import agesReducer from './store/reducers/ages';
import islandsReducer from './store/reducers/islands';
import racksReducer from './store/reducers/racks';
import usersReducer from './store/reducers/users';
import collectionsReducer from './store/reducers/collections';
import familiesReducer from './store/reducers/families';
import mapsReducer from './store/reducers/maps';
import drawersReducer from './store/reducers/drawers';
import acquisitionsReducer from './store/reducers/acquisitions';
import classificationsReducer from './store/reducers/classifications';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authReducer,
  typesReducer,
  scalesReducer,
  agesReducer,
  drawersReducer,
  islandsReducer,
  mapsReducer,
  familiesReducer,
  collectionsReducer,
  usersReducer,
  racksReducer,
  acquisitionsReducer,
  classificationsReducer
});

const store = createStore(reducer, composeEnhancer(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
