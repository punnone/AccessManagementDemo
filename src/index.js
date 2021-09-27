import React from 'react';
import ReactDOM from 'react-dom';
import Page from './pages';
import GlobalStyles from './assets/GlobalStyles'

import "./assets/css/tailwind.css"

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Page />
  </React.StrictMode>,
  document.getElementById('root')
);
