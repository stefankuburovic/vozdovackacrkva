import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {Avatar, Container, Divider} from "@mui/material";
import PageHeader from "./PageHeader";
import Footer from "../../../components/Footer";
import axios from 'axios';

import PraznikComponent from "./Praznik/Praznik";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import {blue} from "@mui/material/colors";

export interface Praznik {
    crveno_slovo: number;
    praznik: string;
    stari: number;
    novi: number;
    post: string;
    ime_dana: string;
    slava: string;
    mesec: string;
    ime_sedmice: string;
    godina: string;
    datum: string;
}

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props: any) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: any) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{ pt: 0 }}>
                {emails.map((email) => (
                    <ListItem
                        button
                        onClick={() => handleListItemClick(email)}
                        key={email}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={email} />
                    </ListItem>
                ))}

                <ListItem
                    autoFocus
                    button
                    onClick={() => handleListItemClick('addAccount')}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account" />
                </ListItem>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired
};


function DashboardBogosluzenja() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: any) => {
        setOpen(false);
        setSelectedValue(value);
    };


    useEffect(() => {
        const fetchData = async () => {

            // Get the current date
            const currentDate = new Date();

            // Calculate the date of the Monday of this week
            const day = currentDate.getDay();
            const diff = currentDate.getDate() - day + (day === 0 ? -7 : 1); // adjust when day is Sunday
            const sundayOfThisWeek = new Date(currentDate.setDate(diff));

            const first_param = sundayOfThisWeek.toISOString().split('T')[0];
            const second_param = new Date(sundayOfThisWeek.getTime() + 60 * 60 * 24 * 6 * 1000).toISOString().split('T')[0];


            try {
                const response = await axios.get(`http://localhost:3001/api/kalendar/${first_param}/${second_param}/`);
                setData(response.data);
            } catch (err) {
                console.warn(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Богослужења (Админ Панел)</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader/>
            </PageTitleWrapper>
            <Container maxWidth="lg">
                {/*<Button sx={{ margin: 1 }} variant="contained">*/}
                {/*    Попуни календар*/}
                {/*</Button>*/}
                <Divider/>
                {data.map((item: any, index) => (
                    <div key={index}>
                        <PraznikComponent data={item} />
                    </div>
                ))}
                <Button variant="outlined" onClick={handleClickOpen} sx={{
                    margin: '20px 0',
                }}>
                    Прикажи ПДФ верзију
                </Button>
            </Container>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
            <Footer/>
        </>
    );
}

export default DashboardBogosluzenja;