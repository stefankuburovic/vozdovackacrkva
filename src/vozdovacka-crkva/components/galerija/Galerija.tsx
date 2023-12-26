import * as React from 'react';
import {Divider} from "@mui/material";
import PhotoAlbum from "react-photo-album";
import Lightbox, {SlideImage} from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

import {slides} from "../../const/galerija/const";

import "yet-another-react-lightbox/plugins/captions.css";

interface Photo {
    height: number;
    width: number;
    src: string;
}
export default function Galerija() {
const [index, setIndex] = React.useState(-1);

    // const slidesWithDescription = (photos: Photo[]): SlideImage[] => {
    //     return photos.map(photo => ({...photo, description: }))
    //            // (photo: Photo): SlideImage => {
    //            //     return {...photo, description: "фото: ипођакон Војислав"}
    //            // }
    //     )
    // }
    return (
        <div>
            <h2>Галерија</h2>
            <Divider/>

            <PhotoAlbum
                layout="columns"
                photos={slides}
                targetRowHeight={150}
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
