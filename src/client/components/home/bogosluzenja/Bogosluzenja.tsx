import * as React from 'react';
import {Box, Divider, Tab, Tabs} from "@mui/material";

import './Bogosluzenja.scss';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {ReactElement, useContext} from "react";
import {ApiUrlContext} from "../../../../index";
import {IBogosluzenje} from "../../../../shared/services/bogosluzenja";
import {PraznikPoPraznik} from "./PraznikPoPraznik";
import {Uopsteno} from "./Uopsteno";

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
const REACT_QUERY_KEY_BOGOSLUZENJA_UOPSTENO = 'bogosluzenja_uopsteno';

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
async function fetchBogosluzenjaUopsteno(apiUrl?: string) {

    const response = await axios.get(`${apiUrl}/bogosluzenja_uopsteno`);

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
    const {
        isLoading: bogosluzenjaIsLoading,
        error: bogosluzenjaError,
        data: bogosluzenja
    } = useQuery({
        queryKey: [REACT_QUERY_KEY_BOGOSLUZENJA],
        queryFn: () => fetchBogosluzenja(apiUrl)
    });
    const {
        isLoading: bogosluzenjaUopstenoIsLoading,
        error: bogosluzenjaUopstenoError,
        data: bogosluzenjaUopsteno} = useQuery({
        queryKey: [REACT_QUERY_KEY_BOGOSLUZENJA_UOPSTENO],
        queryFn: () => fetchBogosluzenjaUopsteno(apiUrl)
    });
    console.log(bogosluzenja, bogosluzenjaUopsteno);
    const isBogosluzenja = bogosluzenja && bogosluzenja.length > 0;
    const isBogosluzenjaUopsteno = bogosluzenjaUopsteno && bogosluzenjaUopsteno[0]?.opis && bogosluzenjaUopsteno[0]?.opis.length > 0;
    const isData = isBogosluzenja || isBogosluzenjaUopsteno;
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
                <h2>Богослужења у текућој недељи</h2>
                { !isBogosluzenjaUopsteno ?
                    bogosluzenja.map(
                        (bogosluzenje: IBogosluzenje) => <PraznikPoPraznik bogosluzenje={bogosluzenje}/>
                    ) : <Uopsteno bogosluzenje={bogosluzenjaUopsteno[0]}/>
                }
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
