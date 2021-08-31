import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
import GlobalStyles from './assets/GlobalStyles'
// import "./assets/css/tailwind.css"
// import '@utils/assets/css/index.css';
import App from './components/App/App';
// import '@utils/assets/css/index.css';
// import App from '@components/App/App';
// import Button from './components/App/Button';

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyles />
        <App />
        {/* <Button/> */}
    </React.StrictMode>,
    document.getElementById('root')
);
