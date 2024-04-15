import * as React from 'react';
import {InstagramEmbed} from "react-social-media-embed";

export default function InstagramFeed(){
    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <InstagramEmbed url="https://www.instagram.com/p/CsBrpUmoUKh/" />
            <InstagramEmbed url="https://www.instagram.com/p/CzdXVR0MAFF/" />
        </div>
    );
}
