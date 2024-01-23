import * as React from 'react';
import {lazy} from "react";

const Hero = lazy(() => import('../../components/hero-swiper/Hero'));
const Riznica = lazy(() => import('../../components/riznica/Riznica'));
const Galerija = lazy(() => import('../../components/galerija/Galerija'));
const Kalendar = lazy(() => import('../../components/kalendar/Kalendar'));
const Obavestenja = lazy(() => import('../../components/obavestenja/Obavestenja'));
const Bogosluzenja = lazy(() => import('../../components/bogosluzenja/Bogosluzenja'));
const PretragaParohija = lazy(() => import('../../components/pretraga-parohija/PretragaParohija'));

export default function Home() {
    return (
        <>
            <Hero/>
            <section id="pretraga-parohija">
                <PretragaParohija/>
            </section>
            <Riznica/>
            <section id="galerija">
                <Galerija/>
            </section>
            <section id="bogosluzenja">
                <Bogosluzenja/>
            </section>
            <section id="kalendar-praznika">
                <Kalendar/>
            </section>
            <section id="obavestenja">
                <Obavestenja/>
            </section>
        </>
    );
}