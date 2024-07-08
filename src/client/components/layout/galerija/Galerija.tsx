import * as React from 'react';
import {Divider} from "@mui/material";
import PhotoAlbum, {Photo} from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import {useWindowWidth} from "client/hooks/useWindowWidth";

import "./Galerija.scss";

import "yet-another-react-lightbox/plugins/captions.css";


interface GalerijaProps {
    slides: Array<Photo>,
    heading?: string
}
const Galerija: React.FC<GalerijaProps> = ({slides, heading}) => {
    const [index, setIndex] = React.useState(-1);
    const windowWidth = useWindowWidth();

    const targetRowHeight = windowWidth <= 768 ? 300 : 150;
    const columns = windowWidth <= 768 ? 2 : undefined; // Adjust this value as needed

    return (
        <div className="galerija">
            {
                heading &&
                <>
                    <h2>{heading}</h2>
                    <Divider/>
                </>
            }

            <PhotoAlbum
                layout="columns"
                photos={slides}
                columns={columns}
                targetRowHeight={targetRowHeight}
                onClick={({ index: current }) => setIndex(current)}
            />
            <Lightbox
                index={index}
                open={index >= 0}
                close={() => setIndex(-1)}
                slides={slides}
                plugins={[Captions]}
            />
        </div>
    );
}
export default Galerija;
