import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {makeStyles} from '@mui/styles';

import './Obavestenja.scss';

const useStyles = makeStyles(() => ({
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
        borderImage: `url('/assets/border-background.png') 60 / 30px / 0 round repeat`,
        display: "flex",
        flexDirection: "column",
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

const MyModal: React.FC<MyModalProps> = ({isOpen, onClose, onCTAClick}) => {
    const classes = useStyles();

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
                <img src="/assets/images/uredjenjeporte.jpg"
                     alt="Уређење порте цркве"
                     style={{maxWidth: '500px'}}/>
                <Button variant="text" color="info" onClick={onCTAClick} className={classes.button}>
                    Затвори
                </Button>
            </div>
        </Modal>
    );
};

const Obavestenja = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        // Check if the modal has been displayed before
        const hasModalBeenDisplayed = localStorage.getItem('hasModalApril');

        if (hasModalBeenDisplayed) {
            setIsModalOpen(false);
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
            <MyModal isOpen={isModalOpen} onClose={handleCloseModal} onCTAClick={handleCTAClick}/>
        </div>
    );
};

export default Obavestenja;
