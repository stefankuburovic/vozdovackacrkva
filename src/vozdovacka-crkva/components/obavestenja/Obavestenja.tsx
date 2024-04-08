import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Slider, {Settings} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ArrowBackIos, ArrowForwardIos} from "@mui/icons-material";

import './Obavestenja.scss';
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: "white",
        padding: "40px 10px 10px 10px",
        borderRadius: '0',
        textAlign: 'left',
        outline: "none",
        border: "30px solid",
        borderImage: `url('/assets/border-background.png') 60 / 30px / 0 round repeat`
    },
    modalTitle: {
        marginBottom: "20px",
        textAlign: 'center',
    },
    button: {
        display: "block",
        margin: '16px 0 0 auto',
        color: "rgb(155,0,0)"
    },
}));

interface MyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCTAClick: () => void;
}

interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <ArrowForwardIos className={className} style={{ ...style, display: 'block', color: 'black' }} onClick={onClick} />
    );
};

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <ArrowBackIos className={className} style={{ ...style, display: 'block', color: 'black' }} onClick={onClick} />
    );
};

const MyModal: React.FC<MyModalProps> = ({ isOpen, onClose, onCTAClick }) => {
    const classes = useStyles();
    const [currentSlide, setCurrentSlide] = useState(0);
    // ... other states and functions

    const settings: Settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: 'slider',
        adaptiveHeight: true,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        customPaging: (i: number) => (
            <div
                style={{
                    margin: '10px 5px',
                    width: '10px',
                    height: '10px',
                    color: 'black',
                    borderRadius: '50%',
                    background: i === currentSlide ? 'goldenrod' : '#efefef',
                }}
            ></div>
        ),
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={classes.modal}
            slotProps={
                {
                    backdrop: {
                        onClick: onCTAClick,
                    }
                }
            }
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                '& .makeStyles-modalContent-2': {
                    backgroundColor: 'white',
                    padding: '40px 10px 10px 10px',
                    borderRadius: '0',
                    textAlign: 'left',
                    outline: 'none',
                    border: '30px solid',
                    borderImage: `url('/assets/border-background.png') 60 / 30px / 0 round repeat`,
                    maxWidth: '600px',
                },
            }}
        >
            <div className={classes.modalContent}>
                <h2 id="modal-title" className={classes.modalTitle}>Обавештењa и активности</h2>
                <Slider {...settings} beforeChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}>
                    <div className="slick-slide-inner">
                        <p>Драга браћо и сестре,<br/><br/>
                            почевши од <strong>7. Априла</strong> па све до <strong>29. Септембра</strong> време бденија и вечерњих служби ће се одржавати по распореду летњег времена, односно од <strong>18 часова</strong>.
                        </p>
                    </div>
                    <div className="slick-slide-inner">
                        <img src="/assets/images/aktivnosti/restuaracija_ikona.webp" alt="Restauracija Ikona"/>
                    </div>
                </Slider>
                <Button variant="text" color="info" onClick={onCTAClick} className={classes.button}>
                    Затвори
                </Button>
            </div>
        </Modal>
    );
};
const Obavestenja = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Check if the modal has been displayed before
        const hasModalBeenDisplayed = localStorage.getItem('hasModalApril');

        if (!hasModalBeenDisplayed) {
            setIsModalOpen(true);
        }
    }, []);

    const handleCTAClick = () => {
        // Set a flag in local storage to indicate that the modal has been displayed
        localStorage.clear()
        localStorage.setItem('hasModalApril', 'true');
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <MyModal isOpen={isModalOpen} onClose={handleCloseModal} onCTAClick={handleCTAClick} />
        </div>
    );
};

export default Obavestenja;
