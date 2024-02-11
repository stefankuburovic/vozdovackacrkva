import * as React from 'react';
import {lazy, Suspense, useRef} from "react";
import {Outlet} from "react-router-dom";

import './Layout.scss';
import ResponsiveAppBar from "./Layout/ResponsiveAppBar";
import LoadingScreen from "./Layout/LoadingScreen";

const Obavestenja = lazy(() => import('../components/layout/obavestenja/Obavestenja'));
const Footer = lazy(() => import('../components/layout/footer/Footer'));

export default function Layout() {
    return (
        <>
            <Suspense fallback={<LoadingScreen />}>
                <ResponsiveAppBar />
                <Outlet/>
                <Footer/>
                <section id="obavestenja">
                    <Obavestenja/>
                </section>
            </Suspense>
        </>
    );
}