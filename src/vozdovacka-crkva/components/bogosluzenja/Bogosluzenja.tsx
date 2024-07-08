import * as React from 'react';
import {Box, Divider, Tab, Tabs} from "@mui/material";

import "yet-another-react-lightbox/plugins/captions.css";

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

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <h2>Распоред Богослужења</h2>
            <Divider/>
            <div className="container">
                <Box className="container-inner">
                    <Box className="bogosluzenja-container vremena">
                        <img src="/assets/images/logo-red.webp" width={50} height={50} alt="Вождовачка Црква"
                             className="logo"/>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            className="bogosluzenja-tabs"
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            textColor="inherit"
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#9b0000',
                                },
                            }}
                        >
                            <Tab label="Текућа недеља" {...a11yProps(0)} disableRipple/>
                            <Tab label="Летње време" {...a11yProps(1)} disableRipple/>
                            <Tab label="Зимско време" {...a11yProps(2)} disableRipple/>
                            {/*<Tab label="Активности" {...a11yProps(3)} disableRipple/>*/}
                        </Tabs>
                        <CustomTabPanel index={0} value={value}>
                            <h3>
                                <span>Петровдан</span>
                            </h3>
                            <h4>
                                <span>Четвртак - 11.06.</span>
                            </h4>
                            <div>
                                <div className="praznicni-dani">
                                    <ul>
                                        <li>
                                            <p>18:00 - Празнично Бденије</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <h4>
                                <span>Петак - 12.07.</span>
                            </h4>
                            <div>
                                <div className="praznicni-dani">
                                    <ul>
                                        <li>
                                            <p>09:00 - Св. Литургија</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel index={1} value={value}>
                            <div>
                                <div>
                                    <h3>
                                        <span>Летње време (Април - Септембар)</span>
                                    </h3>
                                    <h5>
                                        <span>Свакодневно</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>08:00 - Јутрење</p>
                                        </li>
                                        <li>
                                            <p>18:00 - Вечерња</p>
                                        </li>
                                    </ul>
                                    <h5>
                                        <span>Петак</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>18:00 - Акатист Часном Крсту или Св. Василију Острошком са читањем имена
                                                за здравље.</p>
                                        </li>
                                    </ul>
                                    <h5>
                                        <span>Субота</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>08:00 - Света Литургија</p>
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
                        <CustomTabPanel index={2} value={value}>
                            <div>
                                <h3>
                                    <span>Зимско време (Октобар - Март)</span>
                                </h3>
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
                                    <span>Петак</span>
                                </h5>
                                <ul>
                                    <li>
                                        <p>17:00 - Акатист Часном Крсту или Св. Василију Острошком са читањем имена за
                                            здравље.</p>
                                    </li>
                                </ul>
                                <h5>
                                    <span>Субота</span>
                                </h5>
                                <ul>
                                    <li>
                                        <p>08:00 - Света Литургија</p>
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
                        </CustomTabPanel>
                        {/*<CustomTabPanel index={3} value={value}>*/}
                        {/*    <div style={{display: "flex", alignItems: "center", justifyContent: 'center'}}>*/}
                        {/*        <div className="video" style={{maxWidth: '100%', overflow: 'hidden'}}>*/}
                        {/*            <h3>Недеља, 31.3.2024.</h3>*/}
                        {/*            <p>Предавање на тему: <strong>Сведоци светлости из Капернаума, тумачење Јеванђеља по*/}
                        {/*                Марку <i>2,1-12</i></strong></p>*/}
                        {/*            <p>Предавач: <strong>Професор Предраг Драгутиновић</strong></p>*/}
                        {/*            <iframe*/}
                        {/*                style={{display: 'flex', margin: '0 auto'}}*/}
                        {/*                width="420"*/}
                        {/*                height="236"*/}
                        {/*                src="https://www.youtube.com/embed/8_H7qi6eoN8"*/}
                        {/*                title="YouTube video player"*/}
                        {/*                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
                        {/*                referrerPolicy="strict-origin-when-cross-origin"*/}
                        {/*                allowFullScreen*/}
                        {/*            >*/}
                        {/*            </iframe>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</CustomTabPanel>*/}
                        <span style={{fontSize: '14px'}}><i>Црква је отворена од јутрења до вечерње службе.</i></span>
                    </Box>
                </Box>
            </div>
        </div>
    );
}
