import * as React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

import './Hero.scss';

// Import Swiper styles
import "swiper/css";

import Slide from "./slide/Slide";
import {HeroSlides} from "../../../const/hero/hero";
import type {Swiper as SwiperClass} from "swiper/types";

export default function Hero() {

    return (
        <>
            <div className="hero-text">
                <h1>Храм Светог цара Константина и царице Јелене</h1>
                <h2>- Вождовачка црква -</h2>
            </div>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper: SwiperClass) => console.log(swiper)}
                autoplay={
                    {
                        delay: 2500,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true
                    }
                }
                loop={true}
            >
                {HeroSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Slide slideImage={slide.slideImage} slideImageTitle={slide.slideImageTitle} title={slide.title}
                               description={slide.description}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
