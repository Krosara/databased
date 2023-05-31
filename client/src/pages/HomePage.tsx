import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Request, RequestCategory } from '../types/RequestType';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';
import { Auth0Client } from '@auth0/auth0-spa-js';

const HomePage = () => {
    const {
        isAuthenticated,
        user,
        logout,
        loginWithRedirect,
        getIdTokenClaims,
        getAccessTokenSilently,
    } = useAuth0();

    return <></>;
};

export default HomePage;
