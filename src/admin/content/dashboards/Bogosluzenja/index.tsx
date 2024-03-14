import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import axios from 'axios';
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import PageHeader from "./PageHeader";
import Footer from "../../../components/Footer";
import {ApiUrlContext} from "../../../../index";
import Accordion from "@mui/material/Accordion";
import PraznikComponent from "./Praznik/Praznik";
import Editor from "../../../components/Editor/Editor";
import SimpleDialog from "../../../components/SimpleDialog";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {Box, Container, Divider, IconButton, Tooltip} from "@mui/material";

import './index.scss';
import {SnackbarContext} from "../../../contexts/SnackbarContext";
import BogosluzenjaUopstenoService, {IBogosluzenjeUopsteno} from "../../../../shared/services/bogosluzenja_uopsteno";
import BogosluzenjaService, {IBogosluzenje} from "../../../../shared/services/bogosluzenja";
import {setCurrentWeekDateParams} from "../../../../util/functions";

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


function DashboardBogosluzenja() {
    /**
     * Create Context
     * */
    const apiUrl = useContext(ApiUrlContext);
    const {openSnackbar} = useContext(SnackbarContext);
    /**
     * Include Services
     * */
    const bogosluzenjeUopstenoService = BogosluzenjaUopstenoService.getInstance();
    const bogosluzenjaService = BogosluzenjaService.getInstance();
    /**
     * Create State
     */
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [kalendar, setKalendar] = useState([]);
    const [bogosluzenja, setBogosluzenja] = useState<Array<IBogosluzenje>>([]);
    const [bogosluzenjaUopsteno, setBogosluzenjaUopsteno] = useState<Array<IBogosluzenjeUopsteno>>([]);
    /**
     * Create Functions
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: any) => {
        setOpen(false);
    };

    // const popuniKalendar = useCallback(() => {
    //     upucajKalendarUBazu(apiUrl);
    // }, []);
    /*
    * Fetch Data
     */
    const fetchBogosluzenjaData = useCallback(async () => {
        let ignore = false;
        const {startDate, endDate} = setCurrentWeekDateParams();
        if (!ignore) {
            try {
                const dohvatiKalendar = await axios.get(`${apiUrl}/kalendar/start_date/${startDate}/end_date/${endDate}/`);
                setKalendar(dohvatiKalendar.data);
                await bogosluzenjaService.getRangeBogosluzenja(startDate, endDate, setBogosluzenja, apiUrl);
                console.log(bogosluzenja);
            } catch (err) {
                console.warn(err);
            }
        }

        return () => {
            ignore = true;
        }
    }, [apiUrl, bogosluzenjaService]);
    const fetchBogosluzenjaUopstenoData = useCallback(async () => {
        let ignore = false;
        if (!ignore) {
            try {
                bogosluzenjeUopstenoService.getBogosluzenjeUopsteno(apiUrl, setBogosluzenjaUopsteno);
            } catch (err) {
                console.warn(err);
            }
        }

        return () => {
            ignore = true;
        }
    }, [apiUrl, bogosluzenjeUopstenoService]);

    const deleteData = useCallback(async () => {
        const bogosluzenje: IBogosluzenjeUopsteno = {
            opis: content
        };
        bogosluzenjeUopstenoService.deleteBogosluzenjeUopsteno(fetchBogosluzenjaUopstenoData, openSnackbar, bogosluzenjaUopsteno[0].id, apiUrl);
    }, [
        apiUrl,
        content,
        openSnackbar,
        bogosluzenjaUopsteno,
        bogosluzenjeUopstenoService,
        fetchBogosluzenjaUopstenoData,
    ]);

    const saveData = useCallback(async () => {
        const bogosluzenje: IBogosluzenjeUopsteno = {
            opis: content
        };
        bogosluzenjeUopstenoService.saveOrUpdateBogosuzenjeUopsteno(
            bogosluzenje,
            bogosluzenjaUopsteno,
            fetchBogosluzenjaUopstenoData,
            openSnackbar,
            apiUrl
        );
    }, [
        apiUrl,
        content,
        openSnackbar,
        bogosluzenjaUopsteno,
        bogosluzenjeUopstenoService,
        fetchBogosluzenjaUopstenoData,
    ]);

    /*
    * Use Effects
     */
    useEffect(() => {
        fetchBogosluzenjaData();
        fetchBogosluzenjaUopstenoData();
    }, [
        apiUrl,
        bogosluzenjaService,
        fetchBogosluzenjaData,
        fetchBogosluzenjaUopstenoData
    ]);

    function Placeholder() {
        return (
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
        );
    }

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
                            <Editor setContent={setContent} placeholder={<Placeholder/>}/>
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>

                                <Tooltip title={"Oбриши богослужења за текућу недељу"}>
                                <span>
                                    <IconButton aria-label="Oбриши из распореда" sx={{margin: 1}} color="error"
                                                onClick={deleteData}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </span>
                                </Tooltip>

                                <Tooltip title={"Сачувај богослужења за текућу недељу"}>
                                <span>
                                    <IconButton
                                        aria-label="Сачувај у распоред"
                                        sx={{margin: 1}}
                                        color="info"
                                        onClick={saveData}
                                    >
                                        <SaveIcon/>
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
                open={open}
                onClose={handleClose}
            />
            <Footer/>
        </>
    );
}

export default DashboardBogosluzenja;