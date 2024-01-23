import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';


import './index.css';
import "yet-another-react-lightbox/styles.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const Home = lazy(() => import('./vozdovacka-crkva/pages/Home/Home'));
const Auth = lazy(() => import('./vozdovacka-crkva/pages/Auth/Auth'));

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/auth" element={<Auth/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
