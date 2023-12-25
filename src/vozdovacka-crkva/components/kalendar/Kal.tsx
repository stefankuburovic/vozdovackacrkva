import * as React from 'react';
import {Box, Divider} from "@mui/material";
import {useState} from "react";

const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
export default function Kal() {
    const [success, setSuccess] = React.useState(false);
    const [fetchedData, setFetchData] = useState([]);
    const [danasnjiPraznik, setDanasnjiPraznik] = useState('');

    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const monthName = capitalizeFirstLetter(currentDate.toLocaleString('sr-RS', { month: 'long' }));
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const getDataFromApi = () => {
        fetch(`https://api.allorigins.win/get?url=https://pravoslavno.rs/v1/kalendar/${currentYear}-${currentMonth}`, {
            method: 'GET',
            headers: {}
        })
            .then(response => response.json())
            .then(data => {
                setFetchData(JSON.parse(data.contents)[monthName]);
                setSuccess(true);

            })
            .catch(error => {
                console.log(error);
                // this.setState({ error: error });
            });
    };
    getDataFromApi();

    return (
        <>
            <div className="white-layout"></div>
            <div className="container">
                {success &&
                    <Box className="kalendar-praznika">
                        <div className="content">
                            <h2>Календар</h2>
                            <Divider/>
                            <p style={{background: "white"}}>Календар је преузет са <a href="https://www.mikroknjiga.rs" target="_blank" rel="noreferrer" >www.mikroknjiga.rs</a>, стилизован је према потребама сајта</p>
                            <Box className="kalendar-praznika-inner">
                                <Box className="kalendar">
                                    <table
                                        border={0}
                                        cellSpacing="1"
                                        cellPadding="2"
                                        bgcolor="#dddddd"
                                        width="550"
                                        style={{fontSize: "16px"}}
                                    >
                                        {
                                            fetchedData.map((day, index: number) => {
                                                return (
                                                    <tr key={index} style={{background: "#fff"}}>

                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                </Box>
                                <Box className="danasnji-praznik">
                                    <h4>Данас</h4>
                                    <Box dangerouslySetInnerHTML={{__html: danasnjiPraznik}}></Box>
                                </Box>
                            </Box>
                        </div>
                    </Box>
                }
            </div>
        </>

    );
}
