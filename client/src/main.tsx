import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:9000';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
