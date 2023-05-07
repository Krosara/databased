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
                <Route path="/login" element={<LoginPage />} />
            </Route>
        )
    );

    return (
        <div className="flex">
            <Menu
                model={pages}
                style={{ position: 'static', left: 0, height: '100%' }}
                className="flex-1 h-auto"
            />
            <div className="flex-2 h-auto">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
