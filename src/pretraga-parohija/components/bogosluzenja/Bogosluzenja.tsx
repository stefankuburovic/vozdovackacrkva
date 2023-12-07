import * as React from 'react';
import {Box, Button, Divider, Tab, Tabs} from "@mui/material";
import {useState} from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className="bogosluzenja-tab-panel"
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
    };
}

export default function Bogosluzenja() {
    const [value, setValue] = React.useState(0);
    const [success, setSuccess] = React.useState(false);
    const [calendarTabValue, setCalendarTabValue] = React.useState(0);
    const [fetchedHTML, setFetchedHTML] = useState('');
    const [danasnjiPraznik, setDanasnjiPraznik] = useState('');

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleCalendarTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCalendarTabValue(newValue);
    };

    const getDataFromApi = () => {
        fetch("https://api.allorigins.win/get?url=https://www.pravoslavno.rs/index.php?q=kalendar", {
            mode: 'cors',
            method: 'GET',
            headers: {}
        })
            .then(response => response.text())
            .then(data => {
                let parser = new DOMParser(),
                    dom = parser.parseFromString(data, "text/html");
                setSuccess(true);
                setDanasnjiPraznik(dom.querySelectorAll("tr[bgcolor='#fff9aa']")[0].outerHTML.replaceAll("href", "target='_blank' href").replace(/\\t|\\n|\/r|\\(?=")/g, '').replace(/\\[rn]/g, '').replaceAll("index.php", "https://www.pravoslavno.rs/index.php"));
                setFetchedHTML(dom.getElementsByTagName('table')[3].outerHTML.replaceAll("href", "target='_blank' href").replaceAll("index.php", "https://www.pravoslavno.rs/index.php").replace(/\\t|\\n|\\(?=")/g, '').replace(/\\[rn]/g, '').replace(danasnjiPraznik, ''));
            })
            .catch(error => {
                console.log(error);
                // this.setState({ error: error });
            });
    };

    getDataFromApi();
    return (
        <div>
            <h2>Распоред Богослужења</h2>
            <Divider/>
            <div className="container">
                <Box className="container-inner">
                    <Box className="bogosluzenja-container vremena">
                        <img src="/assets/images/logo-red.png" width={50} height={50} alt="Вождовачка Црква"/>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            className="bogosluzenja-tabs"
                            textColor="inherit"
                            centered
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#9b0000',
                                },
                            }}
                        >
                            <Tab label="Зимско време" {...a11yProps(0)} disableRipple/>
                            <Tab label="Летње време" {...a11yProps(1)} disableRipple/>
                            <Tab label="Текућа недеља" {...a11yProps(0)} disableRipple/>
                        </Tabs>
                        <CustomTabPanel index={0} value={value}>
                            <div data-mesh-id="comp-lo6y8a5kinlineContent-gridContainer"
                                 data-testid="mesh-container-content">
                                <div>
                                    <h4>
                                        <span>Зимско време (Октобар - Април)</span>
                                    </h4>
                                    <h5>
                                        <span>Свакодневно</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>08:00 - Јутрење</p>
                                        </li>
                                        <li>
                                            <p>17:00 - Вечерња</p>
                                        </li>
                                    </ul>
                                    <h5>
                                        <span>Субота</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>07:30 - Света Литургија</p>
                                        </li>
                                        <li>
                                            <p>17:00 - Бденије уочи празника</p>
                                        </li>
                                    </ul>
                                    <h5>
                                        <span>Недеља</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>9:00 - Света Литургија</p>
                                        </li>
                                        <li>
                                            <p>17:00 - Вечерња</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel index={1} value={value}>
                            <div data-mesh-id="comp-lo6y8a5kinlineContent-gridContainer"
                                 data-testid="mesh-container-content">
                                <div>
                                    <h4>
                                        <span>Летње време (Мај - Септембар)</span>
                                    </h4>
                                    <h5>
                                        <span>Свакодневно</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>07:30 - Јутрење</p>
                                        </li>
                                        <li>
                                            <p>18:00 - Вечерња</p>
                                        </li>
                                    </ul>
                                    <h5>
                                        <span>Субота</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>07:30 - Света Литургија</p>
                                        </li>
                                        <li>
                                            <p>18:00 - Бденије уочи празника</p>
                                        </li>
                                    </ul>
                                    <h5>
                                        <span>Недеља</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>9:00 - Света Литургија</p>
                                        </li>
                                        <li>
                                            <p>18:00 - Вечерња</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel index={2} value={calendarTabValue}>
                            <h4>Богослужења у текућој недељи</h4>
                        </CustomTabPanel>
                    </Box>
                </Box>
            </div>
            {success &&

            <Box className="kalendar-praznika">
                <h2>Календар</h2>
                <Box className="kalendar-praznika-inner">
                    <Box className="kalendar" dangerouslySetInnerHTML={{__html: fetchedHTML}}></Box>
                    <Box className="danasnji-praznik">
                        <h4>Данас</h4>
                        <Box dangerouslySetInnerHTML={{__html: danasnjiPraznik}}></Box>
                    </Box>
                </Box>
            </Box>
            }
        </div>
    );
}
