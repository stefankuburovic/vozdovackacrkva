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
                            {/*<Tab label="Активности" {...a11yProps(1)} disableRipple/>*/}
                            <Tab label="Зимско време" {...a11yProps(1)} disableRipple/>
                            <Tab label="Летње време" {...a11yProps(2)} disableRipple/>
                        </Tabs>
                        <CustomTabPanel index={0} value={value}>
                            <h3>Прва седмица Великог поста</h3>
                            <h4>
                                <span>18.03.2024, Понедељак</span>
                            </h4>
                            <div>
                                <div className="praznicni-dani">
                                    <ul>
                                        <li>
                                            <p>08:00 - Јутрење, Часови, Вечерње</p>
                                        </li>
                                        <li>
                                            <p>17:00 - Повечерје са каноном Св. Андреја Критског</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <h4>
                                <span>19.03.2024, Уторак</span>
                            </h4>
                            <div>
                                <div className="praznicni-dani">
                                    <ul>
                                        <li>
                                            <p>08:00 - Јутрење, Часови, Вечерње</p>
                                        </li>
                                        <li>
                                            <p>17:00 - Повечерје са каноном Св. Андреја Критског</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <h4>
                                <span>20.03.2024, Среда</span>
                            </h4>
                            <div>
                                <div className="praznicni-dani">
                                    <ul>
                                        <li>
                                            <p>08:00 - Литургија пређеосвећених Дарова</p>
                                        </li>
                                        <li>
                                            <p>17:00 - Повечерје са каноном Св. Андреја Критског</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <h4>
                                <span>21.03.2024, Четвртак</span>
                            </h4>
                            <div>
                                <div className="praznicni-dani">
                                    <ul>
                                        <li>
                                            <p>08:00 - Јутрење, Часови, Вечерње</p>
                                        </li>
                                        <li>
                                            <p>17:00 - Повечерје са каноном Св. Андреја Критског</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <h4>
                                <span>22.03.2024, Петак</span>
                            </h4>
                            <div>
                                <div className="praznicni-dani">
                                    <ul>
                                        <li>
                                            <p>08:00 - Литургија пређеосвећених Дарова</p>
                                        </li>
                                        <li>
                                            <p>17:00 - Повечерје са статијом акатиста Благовестима</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <h4>
                                <span>23.03.2024, Теодорова субота</span>
                            </h4>
                            <div>
                                <div className="praznicni-dani">
                                    <ul>
                                        <li>
                                            <p>08:00 - Света Литургија</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CustomTabPanel>
                        {/*<CustomTabPanel index={1} value={value}>*/}
                        {/*    <h2 style={{textAlign: "center"}}>Духовна трибина</h2>*/}
                        {/*    <h3 style={{textAlign: "center"}}>- Малигне болести и живот православних хришћана -</h3>*/}
                        {/*    <h4 style={{textAlign: "center"}}>Недеља - 03.03.2024. у 10.30</h4>*/}
                        {/*    <h5>Предавачи:</h5>*/}
                        {/*    <ul>*/}
                        {/*        <li>Протојереј-Ставрофор Др Драгомир Сандо</li>*/}
                        {/*        <li>Професор Др Тамара Кликовац, клинички психолог и психотерапеут</li>*/}
                        {/*        <li>Професор Др Вања Ковић, Неуронаучник</li>*/}
                        {/*    </ul>*/}
                        {/*    <span style={{fontSize: "14px"}}>Трибину ће водити: Др Бојан Цакић</span>*/}
                        {/*</CustomTabPanel>*/}
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
                        <CustomTabPanel index={2} value={value}>
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
