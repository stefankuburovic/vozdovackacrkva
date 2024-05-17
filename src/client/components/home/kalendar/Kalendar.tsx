import * as React from 'react';
import {Box, Divider} from "@mui/material";
import {useEffect, useState} from "react";
// import Kal from "./Kal";

export default function Kalendar() {
    const [success, setSuccess] = React.useState(false);
    const [fetchedHTML, setFetchedHTML] = useState('');
    const [danasnjiPraznik, setDanasnjiPraznik] = useState('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                (dom.querySelectorAll("tr[bgcolor='#fff9aa']")[0] as unknown as HTMLElement).style.display = "none";
                setDanasnjiPraznik(dom.querySelectorAll("tr[bgcolor='#fff9aa']")[0].outerHTML.replaceAll("href", "target='_blank' href").replace(/\\t|\\n|\/r|\\(?=")/g, '').replace(/\\[rn]/g, '').replaceAll("index.php", "https://www.pravoslavno.rs/index.php"));
                setFetchedHTML(dom.getElementsByTagName('table')[3].outerHTML.replaceAll("href", "target='_blank' href").replaceAll("index.php", "https://www.pravoslavno.rs/index.php").replace(/\\t|\\n|\\(?=")/g, '').replace(/\\[rn]/g, '').replace(danasnjiPraznik, ''));
            })
            .catch(error => {
                console.log(error);
                // this.setState({ error: error });
            });
    };
    useEffect(() => {
        getDataFromApi();
    }, [getDataFromApi]);
    return (
        <>
            {/*<Kal />*/}
            <div className="white-layout"></div>
            <div className="container">
                {/*{success &&*/}
                {/*    <Box className="kalendar-praznika">*/}
                {/*        <div className="content">*/}
                {/*            <h2>Календар</h2>*/}
                {/*            <Divider/>*/}
                {/*            <p style={{background: "white"}}>Календар је преузет са <a href="https://www.mikroknjiga.rs" target="_blank" rel="noreferrer" >www.mikroknjiga.rs</a>, стилизован је према потребама сајта</p>*/}
                {/*            <Box className="kalendar-praznika-inner">*/}
                {/*                <Box className="kalendar" dangerouslySetInnerHTML={{__html: fetchedHTML}}></Box>*/}
                {/*                <Box className="danasnji-praznik">*/}
                {/*                    <h4>Данас</h4>*/}
                {/*                    <Box dangerouslySetInnerHTML={{__html: danasnjiPraznik}}></Box>*/}
                {/*                </Box>*/}
                {/*            </Box>*/}
                {/*        </div>*/}
                {/*    </Box>*/}
                {/*}*/}
            </div>
        </>

    );
}
