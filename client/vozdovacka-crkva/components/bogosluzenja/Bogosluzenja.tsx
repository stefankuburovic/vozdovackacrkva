import * as React from 'react';
import {Box, Divider, Tab, Tabs} from "@mui/material";
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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <h2>Распоред Богослужења</h2>
            <Divider/>
            <div className="container">
                <Box className="container-inner">
                    <Box className="bogosluzenja-container vremena">
                        <img src="/assets/images/logo-red.webp" width={50} height={50} alt="Вождовачка Црква"/>
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
                            <Tab label="Зимско време" {...a11yProps(1)} disableRipple/>
                            <Tab label="Летње време" {...a11yProps(2)} disableRipple/>
                        </Tabs>
                        <CustomTabPanel index={0} value={value}>
                            <h3>Богослужења у текућој недељи</h3>
                            <div>
                                <div className="praznicni-dani">
                                    <h5>
                                        <span>Петак, 05.01.2024 у 8:30 ч. - Царски Часови</span>
                                    </h5>
                                </div>
                                <div className="praznicni-dani">
                                    <h5>
                                        <span>Субота, 06.01.2024 - Бадњи Дан</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>9:00 - Света Литургија</p>
                                        </li>
                                        <li>
                                            <p>16:00 - Празнично Бденије</p>
                                        </li>
                                        <li>
                                            <p>17:00 - Паљење бадњака у порти цркве</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="praznicni-dani">
                                    <h5>
                                        <span>Недеља, 07.01.2024 - Божић</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>00:00 - Прва празнична литургија</p>
                                        </li>
                                        <li>
                                            <p>09:00 - Друга празнична литургија</p>
                                        </li>
                                        <li>
                                            <p>17:00 - Празнично бденије</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="praznicni-dani">
                                    <h5>
                                        <span>Понедељак, 08.01.2024. - Сабор Пресвете Богородице</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>09:00 - Света Литургија</p>
                                        </li>
                                        <li>
                                            <p>17:00 - Празнично бденије</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="praznicni-dani">
                                    <h5>
                                        <span>Уторак, 09.01.2024. - Св. Првомученик и Архиђакон Стефан</span>
                                    </h5>
                                    <ul>
                                        <li>
                                            <p>7:00 - 8:00 - Резање славских колача</p>
                                        </li>
                                        <li>
                                            <p>09:00 - Света Литургија</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel index={1} value={value}>
                            <div data-mesh-id="comp-lo6y8a5kinlineContent-gridContainer"
                                 data-testid="mesh-container-content">
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
                                            <p>17:00 - Акатист Часном Крсту или Св. Василију Острошком са читањем имена за здравље.</p>
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
                        <CustomTabPanel index={2} value={value}>
                            <div data-mesh-id="comp-lo6y8a5kinlineContent-gridContainer"
                                 data-testid="mesh-container-content">
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
                                            <p>18:00 - Акатист Часном Крсту или Св. Василију Острошком са читањем имена за здравље.</p>
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
                    </Box>
                </Box>
            </div>
        </div>
    );
}
