import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux';
import store from './reducers/index.js';
import {ApiProvider} from '@reduxjs/toolkit/query/react';
import {gamesApi} from './features/api/apiSlice.js'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider api={gamesApi}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApiProvider>
  </React.StrictMode>,
)
