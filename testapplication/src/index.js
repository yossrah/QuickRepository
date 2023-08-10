import React from 'react';
import ReactDOM from 'react-dom/client';
import "bulma/css/bulma.css";
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
 import store from './redux/store';
// import store from './reduxToolkit/store'
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <Router>
    <App />
    </Router>
  </Provider>
);


