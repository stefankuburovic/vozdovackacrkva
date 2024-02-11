import * as React from 'react';

import './LoadingScreen.scss';

export default function LoadingScreen() {
    return (
        <div id="loading-screen">
            <div className="loading-screen-inner">
                <img src="assets/crkva.svg" className="loading-svg"/>
                <div className="loading-inner-text">
                    <h1>Храм Светог цара Константина и царице Јелене</h1>
                </div>
            </div>
        </div>
    );
}