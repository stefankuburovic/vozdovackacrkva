import * as React from 'react';
import {Box, Divider, Tab, Tabs} from "@mui/material";

import './Bogosluzenja.scss';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {ReactElement, useContext} from "react";
import {ApiUrlContext} from "../../../../index";
import {formatDate, getDayName} from "../../../../util/functions";
import {Bogosluzenje} from "../../../../admin/content/dashboards/Bogosluzenja";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
    };
}

const REACT_QUERY_KEY_BOGOSLUZENJA = 'bogosluzenja';

async function fetchBogosluzenja(apiUrl?: string) {
    const weekStart = new Date(); // get the current date
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // set to the start of the week (Sunday)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7); // set to the end of the week (next Sunday)

    const response = await axios.get(`${apiUrl}/bogosluzenja`, {
        params: {
            start: weekStart.toISOString(),
            end: weekEnd.toISOString(),
        },
    });

    if (response.status !== 200) {
        throw new Error('Failed to fetch bogosluzenja');
    }

    return response.data;
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

export default function Bogosluzenja() {
    const apiUrl = useContext(ApiUrlContext);
    const [value, setValue] = React.useState(0);
    const {isLoading, error, data} = useQuery({
        queryKey: [REACT_QUERY_KEY_BOGOSLUZENJA],
        queryFn: () => fetchBogosluzenja(apiUrl)
    });
    const isData = data && data.length > 0;
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabs: Array<ReactElement<any, any>> = [
        <Tab label="Зимско време" {...a11yProps(isData ? 1 : 0)} key="zimsko" disableRipple/>,
        <Tab label="Летње време" {...a11yProps(isData ? 2 : 1)} key="letnje" disableRipple/>,
    ];
    const tabsContent: Array<ReactElement<any, any>> = [
        <CustomTabPanel index={isData ? 1 : 0} key="zimsko_content" value={value}>
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
                            <p>17:00 - Акатист Часном Крсту или Св. Василију Острошком са читањем имена
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
        </CustomTabPanel>,
        <CustomTabPanel index={isData ? 2 : 1} key="letnje_content" value={value}>
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
    ]
    if (isData) {
        tabs.unshift(<Tab label="Текућа недеља" key="tekuca" {...a11yProps(0)} disableRipple/>);
        tabsContent.unshift(
            <CustomTabPanel index={0} key="tekuca_content" value={value}>
                <h3>Богослужења у текућој недељи</h3>
                {data.map((bogosluzenje: Bogosluzenje) => {
                    return (
                        <div key={bogosluzenje.id}>
                            {
                                !!bogosluzenje.praznik &&
                                <>
                                    <h4>{
                                    getDayName(new Date(bogosluzenje.datum_bogosluzenja))}, {formatDate(new Date(bogosluzenje.datum_bogosluzenja))} {bogosluzenje.praznik}</h4>

                                    <ul>
                                        <li>
                                            <h5>{formatDate(new Date(bogosluzenje.datum_bdenija))}</h5>
                                        </li>
                                        <li>
                                            <p>{bogosluzenje.vreme_bdenija} - Предпразнично бденије</p>
                                        </li>
                                    </ul>
                                </>
                            }
                            <div dangerouslySetInnerHTML={{__html: bogosluzenje.dodatne_informacije}}></div>
                        </div>
                    )
                        ;
                })}
            </CustomTabPanel>
        );
    }

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
                            {tabs.map((tab) => tab)}
                        </Tabs>
                        {tabsContent.map((content) => content)}
                    </Box>
                </Box>
            </div>
        </div>
    );
}
