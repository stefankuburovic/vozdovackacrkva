import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

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
                onClick: onCTAClick,
            }}
        >
            <div className={classes.modalContent}>
                <img src=" /assets/images/aktivnosti/aktivnost_31_3.jpg" alt="Сведоци светлости из Капернаума - Тумачење Јеванђеља по Марку" style={{maxWidth: '400px', maxHeight: '100vh'}}/>
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
        const hasModalBeenDisplayed = localStorage.getItem('hasModalMarch');

        if (!hasModalBeenDisplayed) {
            setIsModalOpen(true);
        }
    }, []);

    const handleCTAClick = () => {
        // Set a flag in local storage to indicate that the modal has been displayed
        localStorage.clear()
        localStorage.setItem('hasModalMarch', 'true');
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
