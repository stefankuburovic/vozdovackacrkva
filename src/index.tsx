import React from 'react';
import ReactDOM from 'react-dom/client';
// import InstagramFeed from "./vozdovacka-crkva/components/footer/Footer";
import Galerija from "./vozdovacka-crkva/components/galerija/Galerija";
import Bogosluzenja from "./vozdovacka-crkva/components/bogosluzenja/Bogosluzenja";
import PretragaParohija from './vozdovacka-crkva/components/pretraga-parohija/PretragaParohija';

import {roots} from "./vozdovacka-crkva/const";

import './index.css';
import "yet-another-react-lightbox/styles.css";
import Kalendar from "./vozdovacka-crkva/components/kalendar/Kalendar";

const wrappers: React.JSX.Element[] = [
    <PretragaParohija/>,
    <Galerija/>,
    <Bogosluzenja/>,
    <Kalendar/>/*<InstagramFeed/>*/
]

roots.map((root: ReactDOM.Root, index: number) => root.render(
    <React.StrictMode>
        {wrappers[index]}
    </React.StrictMode>
));