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
                            <Tab label="Зимско време" {...a11yProps(0)} disableRipple/>
                            <Tab label="Летње време" {...a11yProps(1)} disableRipple/>
                            {/*<Tab label="Текућа недеља" {...a11yProps(2)} disableRipple/>*/}
                        </Tabs>
                        {/*<CustomTabPanel index={2} value={value}>*/}
                        {/*    <h3>Богослужења у текућој недељи</h3>*/}
                        {/*    <h4>Распоред богослужења за празник Св. Саве српског</h4>*/}
                        {/*    <div>*/}
                        {/*        <div className="praznicni-dani">*/}
                        {/*            <h5>*/}
                        {/*                <span>Петак, 26.01.2024.</span>*/}
                        {/*            </h5>*/}
                        {/*            <ul>*/}
                        {/*                <li>*/}
                        {/*                    <p>17:00 - Празнично бденије</p>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </div>*/}
                        {/*        <div className="praznicni-dani">*/}
                        {/*            <h5>*/}
                        {/*                <span>Субота, 27.01.2024.</span>*/}
                        {/*            </h5>*/}
                        {/*            <ul>*/}
                        {/*                <li>*/}
                        {/*                    <p>09:00 - Света Литургија</p>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <p>17:00 - Бденије</p>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <p>18:00 - Рецитације и подела пакетића за децу</p>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</CustomTabPanel>*/}
                        <CustomTabPanel index={0} value={value}>
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
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel index={1} value={value}>
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
                    </Box>
                </Box>
            </div>
        </div>
    );
}
