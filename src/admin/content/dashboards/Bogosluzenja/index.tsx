import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {Avatar, Box, Container, Divider, IconButton, Tooltip} from "@mui/material";
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
import {ApiUrlContext} from "../../../../index";
import {upucajKalendarUBazu} from "../../../../util/functions";
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Editor from "../../../components/Editor/Editor";

import './index.scss';
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

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
    datum: string | Date;
}

export interface Bogosluzenje {
    id: number;
    praznik: string;
    datum_bogosluzenja: string;
    vreme_bogosluzenja: string;
    datum_bdenija: string;
    vreme_bdenija: string;
    dodatne_informacije: string;
}

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props: any) {
    const {onClose, selectedValue, open} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: any) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{pt: 0}}>
                {emails.map((email) => (
                    <ListItem
                        onClick={() => handleListItemClick(email)}
                        key={email}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                                <PersonIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={email}/>
                    </ListItem>
                ))}

                <ListItem onClick={() => handleListItemClick('addAccount')}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account"/>
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
    const [kalendar, setKalendar] = useState([]);
    const [bogosluzenja, setBogosluzenja] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: any) => {
        setOpen(false);
        setSelectedValue(value);
    };

    const apiUrl = useContext(ApiUrlContext);

    const setDateParams = () => {
        // Get the current date
        const currentDate = new Date();

        // Calculate the date of the Monday of this week
        const day = currentDate.getDay();
        const diff = currentDate.getDate() - day + (day === 0 ? -7 : 1); // adjust when day is Sunday
        const sundayOfThisWeek = new Date(currentDate.setDate(diff));

        const first_param = sundayOfThisWeek.toISOString().split('T')[0];
        const second_param = new Date(sundayOfThisWeek.getTime() + 60 * 60 * 24 * 6 * 1000).toISOString().split('T')[0];
        return {startDate: first_param, endDate: second_param};
    }
    // const popuniKalendar = useCallback(() => {
    //     upucajKalendarUBazu(apiUrl);
    // }, []);
    useEffect(() => {
        const {startDate, endDate} = setDateParams();
        const fetchData = async () => {
            try {
                const dohvatiKalendar = await axios.get(`${apiUrl}/kalendar/start_date/${startDate}/end_date/${endDate}/`);
                setKalendar(dohvatiKalendar.data);
                const dohvatiBogosluzenja = await axios.get(`${apiUrl}/bogosluzenja/start_date/${startDate}/end_date/${endDate}/`);
                setBogosluzenja(dohvatiBogosluzenja.data);
            } catch (err) {
                console.warn(err);
            }
        };
        fetchData();
    }, [apiUrl]);

    return (
        <>
            <Helmet>
                <title>Богослужења (Админ Панел)</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader/>
            </PageTitleWrapper>
            <div className="admin-bogosluzenja-wrapper">
                <Accordion expanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <h2>Унесите богослужења за текућу недељу - <i>према празнику</i></h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Container maxWidth="lg">
                            {/*<Button sx={{ margin: 1 }} variant="contained" onClick={popuniKalendar}>*/}
                            {/*    Попуни календар*/}
                            {/*</Button>*/}
                            <Divider/>
                            {kalendar.map((item: any, index) => {
                                const bogosluzenje = bogosluzenja.find((bogosluzenje: any) => bogosluzenje.datum_bogosluzenja === item.datum);
                                return (
                                    <div key={index}>
                                        <PraznikComponent praznik={item} bogosluzenje={bogosluzenje}/>
                                    </div>
                                )
                            })}
                        </Container>
                    </AccordionDetails>
                </Accordion>
                <Accordion>

                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <h2>Унесите богослужења за текућу недељу - <i>свеобухватно</i></h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="bogosluzenja-uopsteno">
                            <h3>Додатне информације:</h3>
                            <Editor setContent={(content) => {
                            }} placeholder={
                                <div className="editor-placeholder">
                                    <h4>Унесите уоштено распоред богослужења за текућу недељу <i>нпр.</i></h4>
                                    <h5>Понедељак, 19.12.2024. Свети Никола</h5>
                                    <h6>18.12.2024.</h6>
                                    <ul>
                                        <li>17:00 - Света Литургија</li>
                                    </ul>
                                    <h6>19.12.2024.</h6>
                                    <ul>
                                        <li>8:00 - Света Литургија</li>
                                    </ul>

                                </div>
                            }/>
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>

                                <Tooltip title={"Oбриши богослужења за текућу недељу"}>
                                <span>
                                    <IconButton aria-label="Oбриши из распореда" sx={{margin: 1}} color="error">
                                        <DeleteIcon/>
                                    </IconButton>
                                </span>
                                </Tooltip>

                                <Tooltip title={"Сачувај богослужења за текућу недељу"}>
                                <span>
                                    <IconButton aria-label="Сачувај у распоред" sx={{margin: 1}} color="secondary">
                                        <SaveIcon />
                                    </IconButton>
                                </span>
                                </Tooltip>
                            </Box>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <Button variant="outlined" onClick={handleClickOpen} sx={{
                margin: '20px 0',
            }}>
                Прикажи ПДФ верзију
            </Button>
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