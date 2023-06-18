import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Request, RequestCategory } from '../types/RequestType';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { Card } from 'primereact/card';

const HomePage = () => {
    const { isAuthenticated, user, loginWithRedirect } = useAuth0();

    return (
        <div>
            {isAuthenticated ? (
                <Card
                    title={`Hello, ${user?.nickname}`}
                    className="w-4 mx-auto mt-8"
                >
                    <p className="m-0">
                        Please submit any incidents or service requests in the
                        Requests Menu.
                    </p>
                </Card>
            ) : (
                <Card title={`Login Required`} className="w-2 mx-auto mt-8">
                    <Button
                        size="small"
                        label="Login"
                        className="bg-primary-reverse"
                        onClick={() => loginWithRedirect()}
                    />
                </Card>
            )}
        </div>
    );
};

export default HomePage;
