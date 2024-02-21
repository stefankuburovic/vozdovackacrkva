import React, {lazy} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "yet-another-react-lightbox/styles.css";
import {BrowserRouter, Route, Routes, useRoutes} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import router from "./admin/router";
import ThemeProvider from "./admin/theme/ThemeProvider";
import {CssBaseline} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Layout = lazy(() => import('./vozdovacka-crkva/pages/Layout/Layout'));
const Home = lazy(() => import('./vozdovacka-crkva/pages/Layout/Home/Home'));
const Riznica = lazy(() => import('./vozdovacka-crkva/pages/Layout/Riznica/Riznica'));

const AuthRoutes = () => {
    const content = useRoutes(router);

    return (
        <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                {content}
            </LocalizationProvider>
        </ThemeProvider>
    );
}
export default function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/riznica" element={<Riznica/>}/>
                    </Route>
                    <Route path="/auth/*" element={<AuthRoutes />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);