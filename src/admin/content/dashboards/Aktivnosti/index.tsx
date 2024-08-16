import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import PageHeader from "../Bogosluzenja/PageHeader";
import React, {useState} from "react";
import Editor from "../../../components/Editor/Editor";
import Checkbox from "@mui/material/Checkbox";

function Aktivnosti() {
    const [content, setContent] = useState('')
 
    const label = {inputProps: {'aria-label': 'Прикажи активност у модалу при учитавању странице'}};
    return (
        <>
            <Helmet>
                <title>Активности (Админ Панел)</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader title='Активности и догађаји у цркви'/>
            </PageTitleWrapper>
            <div style={{padding: "0 3rem"}}>
                <Editor setContent={setContent} placeholder={<Placeholder/>}/>
                <Checkbox {...label} defaultChecked color="secondary"/>
            </div>
        </>
    );
}

function Placeholder() {
    return (
        <div className="editor-placeholder">
            <h4>Унесите активности</h4>
        </div>
    );
}

export default Aktivnosti;