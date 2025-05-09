import * as React from 'react';
import {Box, Divider, Tab, Tabs} from "@mui/material";

import Lightbox from "yet-another-react-lightbox";
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
                <Box component="div" sx={{p: 3}}>
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
    const [index, setIndex] = React.useState(-1);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <h2>Распоред Богослужења</h2>
            <Divider/>
            <div className="container">
                <Box component="div" className="container-inner">
                    <Box component="div" className="bogosluzenja-container vremena">
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
                            <Tab label="Промоција књиге" {...a11yProps(1)} disableRipple/>
                            <Tab label="Зимско време" {...a11yProps(2)} disableRipple/>
                            <Tab label="Летње време" {...a11yProps(3)} disableRipple/>
                        </Tabs>
                        <CustomTabPanel index={0} value={value}>
                            <h3>
                                <span>Побусани понедељак</span>
                            </h3>
                            <div>
                                <div className="praznicni-dani">
                                    <ul>
                                        <li>
                                            <p><strong>08:00 - Св. Литургија</strong> - <i>После литургије,
                                                парастос.</i></p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel index={1} value={value}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: 'center'}}>
                                <div className="video" style={{maxWidth: '100%', overflow: 'hidden'}}>
                                    <h3>Промоција књиге - Болесно дете, казна или благослов</h3>
                                    <div>
                                        <div className="praznicni-dani">
                                            <ul>
                                                <li>
                                                    <img src="/assets/images/aktivnosti/aktivnost-04-04.png"
                                                         alt="Уређење порте храма"
                                                    />
                                                </li>
                                            </ul>
                                            <Lightbox
                                                index={index}
                                                open={index >= 0}
                                                close={() => setIndex(-1)}
                                                slides={[{src: "/assets/images/aktivnosti/aktivnost-04-04.png"}]}
                                            />
                                        </div>
                                    </div>
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
                        <CustomTabPanel index={3} value={value}>
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
                        <span style={{fontSize: '14px'}}><i>Црква је отворена од јутрења до вечерње службе.</i></span>

                        <span style={{fontSize: '14px'}}><i>За више информација о богослужењима и активностима цркве,
                            придурижите се нашој <a style={{fontSize: 'inherit'}}
                                                    href="https://invite.viber.com/?g2=AQB8CsQuus0jbFMoM045RUGpzeYHc7XB5NrBo%2F6eKHT%2FdHJ0dKu2IzYVydrB4RTx"
                                                    target="_blank" rel="noreferrer"><strong>вибер</strong></a> заједници</i></span>
                    </Box>
                </Box>
            </div>
        </div>
    );
}
