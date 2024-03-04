import React, {useCallback, useContext, useEffect, useState} from 'react';
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
import {ApiUrlContext} from "../../../../index";

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
    //     const godine = [2024, 2025, 2026];
    //     const meseci = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    //     const imeMeseca = {
    //         1: 'Јануар',
    //         2: 'Фебруар',
    //         3: 'Март',
    //         4: 'Април',
    //         5: 'Мај',
    //         6: 'Јун',
    //         7: 'Јул',
    //         8: 'Август',
    //         9: 'Септембар',
    //         10: 'Октобар',
    //         11: 'Новембар',
    //         12: 'Децембар'
    //     }
    //     godine.forEach(godina => {
    //         meseci.forEach(mesec => {
    //             axios.get(`https://pravoslavno.rs/v1/kalendar/${godina}-${mesec}`)
    //                 .then(async (response) => {
    //                     // @ts-ignore
    //                     console.log(response, imeMeseca[Number(mesec)]);
    //                     // @ts-ignore
    //                     for (const praznik of response.data[imeMeseca[Number(mesec)]]) {
    //                         const unosUkalendar: Praznik = {} as Praznik;
    //                         unosUkalendar['crveno_slovo'] = praznik.crveno_slovo && 1 || 0;
    //                         unosUkalendar['praznik'] = praznik.opis;
    //                         unosUkalendar['stari'] = praznik.brojDanaStari;
    //                         unosUkalendar['novi'] = praznik.brojDana;
    //                         unosUkalendar['post'] = praznik.post;
    //                         unosUkalendar['ime_dana'] = praznik.imeDana;
    //                         unosUkalendar['slava'] = praznik.slava;
    //                         // @ts-ignore
    //                         unosUkalendar['mesec'] = imeMeseca[Number(mesec)];
    //                         unosUkalendar['ime_sedmice'] = praznik.imeSedmice;
    //                         unosUkalendar['godina'] = String(godina);
    //                         // @ts-ignore
    //                         unosUkalendar['datum'] =`${godina}-${mesec}-${Number(praznik.brojDana) < 10 ? '0' + praznik.brojDana : praznik.brojDana}`;
    //                         axios.post(`${apiUrl}/kalendar`, unosUkalendar)
    //                             .then((response) => {
    //                                 console.log(response);
    //                             })
    //                             .catch((error) => {
    //                                 console.error(error);
    //                             });
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.error(error);
    //                 });
    //         });
    //     });
    //
    // }, []);
    useEffect(() => {
        const{startDate, endDate} = setDateParams();
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
                {/*<Button sx={{ margin: 1 }} variant="contained" onClick={popuniKalendar}>*/}
                {/*    Попуни календар*/}
                {/*</Button>*/}
                <Divider/>
                {kalendar.map((item: any, index) => {
                    const bogosluzenje = bogosluzenja.find((bogosluzenje: any) => bogosluzenje.datum_bogosluzenja === item.datum);
                    console.log(item);
                    return (
                        <div key={index}>
                            <PraznikComponent data={item} bogosluzenje={bogosluzenje}/>
                        </div>
                    )
                })}
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