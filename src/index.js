import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from './store/reducers/authReducer';
import prodReducer from './store/reducers/productsReducer';
import searchReducer from './store/reducers/searchReducer';
import { CookiesProvider } from 'react-cookie';

const store = configureStore({
  reducer:{
    auths:authReducer,
    products:prodReducer,
    search:searchReducer,
  }
})

// const store = createStore(authReducer, window.__REDUX__DEVTOOLS__EXTENSIONS__ &&
//   window.__REDUX__DEVTOOLS__EXTENSION__())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
