import * as React from 'react';
import InstagramFeed from "./components/instagram-feed/InstagramFeed";
export default function FooterWithFeed() {


    return (
        <div className="footer">
            <div></div>
            <div>
                <InstagramFeed/>
            </div>
        </div>
    );
}
