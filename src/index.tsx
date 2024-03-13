import React, {lazy} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "yet-another-react-lightbox/styles.css";
import {BrowserRouter, Route, Routes, useRoutes} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import ThemeProvider from "./admin/theme/ThemeProvider";
import {CssBaseline} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {SnackbarProvider} from "./admin/contexts/SnackbarContext";
import {AuthProvider} from "./admin/contexts/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";

import admin_router from "./admin/router";
import client_router from "./client/router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Login from "./admin/content/pages/Login/Login";

export const ApiUrlContext = React.createContext<string | undefined>('');

const AdminRoutes = () => {
    const content = useRoutes(admin_router);

    return (
        <AuthProvider>
            <SnackbarProvider>
                <HelmetProvider>
                    <ProtectedRoute>
                        <ThemeProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <CssBaseline/>
                                {content}
                            </LocalizationProvider>
                        </ThemeProvider>
                    </ProtectedRoute>
                </HelmetProvider>
            </SnackbarProvider>
        </AuthProvider>
    );
}
const ClientRoutes = () => {
    const content = useRoutes(client_router);

    return (
        <HelmetProvider>
            {content}
        </HelmetProvider>
    );
}

function App() {
    const queryClient = new QueryClient()
    return (
        <ApiUrlContext.Provider value={process.env.REACT_APP_API_URL}>

            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<ClientRoutes/>}/>
                        <Route path="/vzdadmin/*" element={<AdminRoutes/>}/>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ApiUrlContext.Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);