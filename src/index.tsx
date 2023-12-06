import React from 'react';
import ReactDOM from 'react-dom/client';
// import InstagramFeed from "./pretraga-parohija/components/footer/Footer";
import Galerija from "./pretraga-parohija/components/galerija/Galerija";
import Bogosluzenja from "./pretraga-parohija/components/bogosluzenja/Bogosluzenja";
import PretragaParohija from './pretraga-parohija/components/pretraga-parohija/PretragaParohija';

import {roots} from "./pretraga-parohija/const";

import './index.css';
import "yet-another-react-lightbox/styles.css";

const wrappers:React.JSX.Element[] = [<PretragaParohija/>, <Galerija/>, <Bogosluzenja/>, /*<InstagramFeed/>*/]

roots.map((root: ReactDOM.Root, index: number) => root.render(
    <React.StrictMode>
        {wrappers[index]}
    </React.StrictMode>
));