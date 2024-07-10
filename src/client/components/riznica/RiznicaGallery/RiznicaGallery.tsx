import {Photo} from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "./Galerija.scss";
import "yet-another-react-lightbox/plugins/captions.css";
import React from "react";

interface GalerijaProps {
    slides: Array<Photo>
}

const RiznicaGalerija: React.FC<GalerijaProps> = ({slides}) => {
    const [index, setIndex] = React.useState(-1);

    return (
        <section id="galerija-inovacija">
            <ul className="results">
                {
                    slides.map((item, index) => (
                        <li key={index} className="result" onClick={() => setIndex(index)}>
                            <img src={item.src} width="500" height="500" alt={item.title}/>
                        </li>
                    ))
                }
            </ul>
            <Lightbox
                index={index}
                slides={slides}
                open={index >= 0}
                plugins={[Captions]}
                close={() => setIndex(-1)}
                animation={
                    {
                        fade: 500,
                        swipe: 1000
                    }
                }
            />
        </section>
    );
}

export default RiznicaGalerija;