import * as React from 'react';
import {lazy} from 'react';

import './Home.scss';

import {slides} from "client/const/galerija/const";

const Hero = lazy(() => import('../../components/home/hero-swiper/Hero'));
const Galerija = lazy(() => import('../../components/layout/galerija/Galerija'));
const Kalendar = lazy(() => import('../../components/home/kalendar/Kalendar'));
const Bogosluzenja = lazy(() => import('../../components/home/bogosluzenja/Bogosluzenja'));
const PretragaParohija = lazy(() => import('../../components/home/pretraga-parohija/PretragaParohija'));
export default function Home() {
    return (
        <>
            <section id="hero">
                <Hero/>
            </section>
            <section id="pretraga-parohija">
                <PretragaParohija/>
            </section>
            <section id="galerija">
                <Galerija slides={slides} heading="Галерија"/>
            </section>
            <section id="bogosluzenja">
                <Bogosluzenja/>
            </section>
            <section id="kalendar-praznika">
                <Kalendar/>
            </section>
        </>
    );
}