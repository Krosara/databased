import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import axios from 'axios';
import { Auth0Provider } from '@auth0/auth0-react';

axios.defaults.baseURL = import.meta.env.VITE_API_GATEWAY;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            }}
            useRefreshTokens
            cacheLocation="localstorage"
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>
);
