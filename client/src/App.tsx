import './App.css';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    useNavigate,
    Navigate,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AssetsPage from './pages/AssetsPage';
import RequestsPage from './pages/RequestsPage';
import LoginPage from './pages/LoginPage';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
// import { AuthenticatedRoute } from './components/AuthenticatedRoute/AuthenticatedRoute';

function App() {
    const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

    let pages: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: (e) => (window.location.pathname = '/'),
        },
        {
            label: 'Assets',
            icon: 'pi pi-fw pi-desktop',
            command: (e) => (window.location.pathname = '/assets'),
        },
        {
            label: 'Requests',
            icon: 'pi pi-fw pi-phone',
            command: (e) => (window.location.pathname = '/requests'),
        },
    ];

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/assets" element={<AssetsPage />} />

                <Route path="/requests" element={<RequestsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        )
    );

    return (
        <div>
            <div className="app-topbar sticky ">
                {isAuthenticated ? (
                    <Button
                        className=""
                        label="Logout"
                        onClick={() =>
                            logout({
                                logoutParams: {
                                    return: window.location.origin,
                                },
                            })
                        }
                    />
                ) : (
                    <Button label="Login" onClick={() => loginWithRedirect()} />
                )}
            </div>
            <div className="app-container">
                <div className="app-menu">
                    <Menu model={pages} className="w-auto h-full " />
                </div>
                <div className="app-content">
                    <RouterProvider router={router} />
                </div>
            </div>
        </div>
    );
}

export default App;
