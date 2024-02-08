import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';

import {roots} from "./vozdovacka-crkva/const";

import './index.css';
import "yet-another-react-lightbox/styles.css";

const PretragaParohija = lazy(() => import('./vozdovacka-crkva/components/pretraga-parohija/PretragaParohija'));

const Galerija = lazy(() => import('./vozdovacka-crkva/components/galerija/Galerija'));

const Bogosluzenja = lazy(() => import('./vozdovacka-crkva/components/bogosluzenja/Bogosluzenja'));

const Kalendar = lazy(() => import('./vozdovacka-crkva/components/kalendar/Kalendar'));

// const Obavestenja = lazy(() => import('./vozdovacka-crkva/components/obavestenja/Obavestenja'));

const wrappers: React.JSX.Element[] = [
    <PretragaParohija/>,
    <Galerija/>,
    <Bogosluzenja/>,
    <Kalendar/>,
    /*<InstagramFeed/>,*/
    // <Obavestenja/>
]
roots.map((root: ReactDOM.Root, index: number) => root.render(
    <React.StrictMode>
        {wrappers[index]}
    </React.StrictMode>
));
