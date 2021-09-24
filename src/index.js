import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/index';
import GlobalStyles from './assets/GlobalStyles'

import "./assets/css/tailwind.css"

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
