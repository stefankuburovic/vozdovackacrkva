import React, {lazy} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "yet-another-react-lightbox/styles.css";
import {BrowserRouter, Navigate, useRoutes} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import router from "./admin/router";
import ThemeProvider from "./admin/theme/ThemeProvider";
import {CssBaseline} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {SnackbarProvider} from "./admin/contexts/SnackbarContext";
import {RouteObject} from "react-router";

const Layout = lazy(() => import('./vozdovacka-crkva/layouts/Layout'));
const Home = lazy(() => import('./vozdovacka-crkva/pages/Home/Home'));
const Riznica = lazy(() => import('./vozdovacka-crkva/pages/Riznica/Riznica'));
const Login = lazy(() => import('./vozdovacka-crkva/pages/Login/Login'));

interface ProtectedRouteProps {
    routes: RouteObject[];
}

export const ApiUrlContext = React.createContext<string | undefined>('');

const AuthRoutes = () => {
    const content = useRoutes(router);

    return (
        <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline/>
                {content}
            </LocalizationProvider>
        </ThemeProvider>
    );
}
export default function App() {
    const isAuthenticated = false;

    const routes = [
        { path: '/', element: <Layout/>,
            children: [
                { index: true, element: <Home/> },
                { path: 'riznica', element: <Riznica/> },
            ]
        },
        { path: 'login', element: <Login/> },
        { path: '*', element: <Navigate to="/login" replace /> },
        {path:"vzdadmin/*", element: isAuthenticated ?  <AuthRoutes/> : <Navigate to="/login" replace /> }
    ];

    return (
        <ApiUrlContext.Provider value={process.env.REACT_APP_API_URL}>
            <SnackbarProvider>
                <HelmetProvider>
                    <BrowserRouter>
                        <RoutesComponent routes={routes} />
                    </BrowserRouter>
                </HelmetProvider>
            </SnackbarProvider>
        </ApiUrlContext.Provider>
    );
}

const RoutesComponent = ({ routes }: ProtectedRouteProps) => {
    return useRoutes(routes);
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);