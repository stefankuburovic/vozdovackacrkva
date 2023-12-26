import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: '0',
        textAlign: 'left',
        outline: "none"
    },
    modalTitle: {
        fontSize: "24px",
        textAlign: 'center',
    },
    modalSignature: {
        fontSize: "16px",
    },
    button: {
        display: "block",
        margin: '16px 0 0 auto',
    },
}));

interface MyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCTAClick: () => void;
}

const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Prevent closing the modal on backdrop click
    event.stopPropagation();
};
const MyModal: React.FC<MyModalProps> = ({ isOpen, onClose, onCTAClick }) => {
    const classes = useStyles();

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={classes.modal}
            BackdropProps={{
                onClick: handleBackdropClick,
            }}
        >
            <div className={classes.modalContent}>
                <p id="modal-title" className={classes.modalTitle}>Обавештење:</p>
                <p id="modal-description">Од следеће године почев од датума <b>13. Јануара 2024.</b> године,<br/>
                    литургије Суботом ће почињати од <b>8:00</b>, уместо досадашњих <b>7:30</b>.</p>
                <span className={classes.modalSignature}><i>Братство храма</i></span>
                <Button variant="outlined" color="info" onClick={onCTAClick} className={classes.button}>
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
        const hasModalBeenDisplayed = localStorage.getItem('hasModalBeenDisplayed');

        if (!hasModalBeenDisplayed) {
            setIsModalOpen(true);
        }
    }, []);

    const handleCTAClick = () => {
        // Set a flag in local storage to indicate that the modal has been displayed
        localStorage.setItem('hasModalBeenDisplayed', 'true');
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
