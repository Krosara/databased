import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
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
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

function App() {
    // const navigate = useNavigate();

    let pages: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: (e) => (window.location.pathname = '/'),
        },
        {
            label: 'Assets',
            icon: 'pi pi-fw pi-trash',
            command: (e) => (window.location.pathname = '/assets'),
        },
        {
            label: 'Requests',
            icon: 'pi pi-fw pi-trash',
            command: (e) => (window.location.pathname = '/requests'),
        },
    ];

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/assets" element={<AssetsPage />} />
                <Route path="/requests" element={<RequestsPage />} />
            </Route>
        )
    );

    return (
        <>
            <Menu model={pages} />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
