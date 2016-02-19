import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './containers/App';
import socket from './middleware/socket';

const initialState = {};

const store = createStore(reducer, initialState);

socket(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
