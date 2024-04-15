import * as React from 'react';

import './Slide.scss';

export interface SlideProps {
    slideImage: string;
    slideImageTitle: string;
    title?: string;
    description: string;
}
export default function Slide({slideImage, slideImageTitle, title, description}: SlideProps) {
    return (
        <>
            <img src={slideImage} alt={title} title={slideImageTitle}/>
            <div className="swiper-slide-content">
                {title && <h2>{title}</h2>}
                <p>{description}</p>
            </div>
        </>
    );
}