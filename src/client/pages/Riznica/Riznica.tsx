import * as React from 'react';
import { useEffect, useState } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';

import './Riznica.scss';
// import Panorama from "@client/components/riznica/Panorama";

// Assuming you have an array of image names in the directory
const imageNames = ['IMG_0073.jpg', 'IMG_0075.jpg', 'IMG_0082.jpg', /*...*/];
const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Riznica() {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const loadedImages = imageNames.map(name => `assets/images/riznica/${name}`);
        setImages(loadedImages);
    }, []);

    const layout = images.map((_, index) => ({
        i: index.toString(),
        x: index % 3 * 4, // Place items in 3 columns
        y: Math.floor(index / 3) * 4, // Place items in rows, each item spans 4 rows
        w: 4, // Each item spans 4 columns
        h: 6, // Each item spans 4 rows
    }));

    return (
        <>
            <section id="o-hramu">
                <div className="container">
                    <h2>О Храму</h2>
                    <hr/>
                    <p>
                        <span>Црква Светог цара Константина и царице Јелене (или Вождовачка црква) је православни саборни храм насеља Вождовац у Београду. Добио је свој назив почетком 20. века, тачније од 1903, након доласка на престо краља Петра I Карађорђевића. На овом месту је вожд Карађорђе са својим устаницима у току 1806. логоровао, окупљао војску и са овог предграђа полазио на Београдску тврђаву приликом њеног освајања.</span>
                        <span>Храм је сазидан 1911. године на данашњем месту, након извесног застоја у градњи услед неспоразума око одабира места градње. Нажалост, храм је у периоду од 1912–1919. делио судбину свог народа. Био је опљачкан, однесено је једно звоно, кров је брзо попустио, зидови су се размакли, а мало кубе на средини крова је утонуло и претило да се сруши.</span>
                        <span>Обновом цркве је руководио архитекта Драгомир Тадић. Цркву је живописао академски сликар Милић од Мачве, по благослову патријарха Германа. Историчари уметности су овај рад окарактерисали као увод у ренесансу управо зато што су Милићеве фигуре ослобођене било каквог шематизма и школе. У потпуности је негирао традицију иконописа.</span>
                        <span>Живопис парохијског дома осликао је Војислав Луковић, дипл. сликар из Београда, а освештао Патријарх Иринеј на стогодишњицу храма, 2011. године.</span>
                        <span>Црква Светог Константина и Јелене слави 27. септембра Крстовдан као преславу храмовне славе светитеља захваљујући чијој ревности је и пронађен часни крст на ком је распет Господ Исус Христос, јер чува велику светињу-частицу Часног и Животворног Крста која је уграђена у повећи Крст. Патријарх Герман је након обиласка Свете Земље у току Страсне седмице и Ускрса 1959. године даровао Вождовачку цркву овом драгоценошћу</span>
                    </p>
                </div>
            </section>
            {/*<div>*/}
            {/*    <Panorama />*/}
            {/*</div>*/}
            <section id="riznica">
                <ResponsiveGridLayout className="layout" layouts={{lg: layout}} breakpoints={{lg: 1200}} cols={{lg: 12}}
                                      isDraggable={false}>
                    {images.map((src, index) => (
                        <div key={index} style={{background: `url(${src}) center/cover`}}/>
                    ))}
                </ResponsiveGridLayout>
            </section>
        </>
    )
        ;
}