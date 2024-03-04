import {useContext, useEffect, useState} from 'react';
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import {Bogosluzenje, Praznik} from "../index";

import './Praznik.scss';
import {Divider, IconButton, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {DodajPraznik} from "../DodajPraznik/DodajPraznik";
import axios from "axios";
import {ApiUrlContext} from "../../../../../index";
import {SnackbarContext} from "../../../../contexts/SnackbarContext";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";

export interface PraznikProps {
    data: Praznik;
    bogosluzenje?: Bogosluzenje
}

const isSunday = (imeDana: string) => {
    return imeDana === 'Недеља';
}
export default function PraznikComponent({data, bogosluzenje}: PraznikProps): React.JSX.Element {

    const apiUrl = useContext(ApiUrlContext);
    const {openSnackbar} = useContext(SnackbarContext);
    const [isChecked, setIsChecked] = useState(false);
    const [postojeceBogosluzenje, setPostojeceBogosluzenje] = useState<Bogosluzenje | undefined>(undefined);

    useEffect(() => {
        setPostojeceBogosluzenje(bogosluzenje);
    }, [bogosluzenje]);

    useEffect(() => {
        setIsChecked(!!postojeceBogosluzenje);
    }, [postojeceBogosluzenje]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };


    const changeChecked = () => {
        setIsChecked(!isChecked);
    };
    const deleteBogosluzenje = () => {
        if (bogosluzenje) {
            axios.delete(`${apiUrl}/bogosluzenja/${bogosluzenje.id}`)
                .then((response) => {
                    setIsChecked(false);
                    setPostojeceBogosluzenje(undefined);
                    openSnackbar(`Распоред богослужења за празник ${bogosluzenje.praznik} је успешно обрисано из базе`, 'success');
                })
                .catch((error) => {
                    console.error(error);
                    openSnackbar(`Дошло је до грешке приликом брисања распореда богослужења за празник ${bogosluzenje.praznik}`, 'error');
                });
        }
    }
    return (
        <>
            {data.ime_sedmice && <h2>{data.ime_sedmice}</h2>}
            <div className={`praznik && ${(isChecked || postojeceBogosluzenje) && 'selected'}`}
                 style={{color: `${isSunday(data.ime_dana) ? 'red' : 'black'}`}}>
                {!postojeceBogosluzenje ? <Checkbox id={`praznik-${data.novi}`} onChange={handleCheckboxChange}
                                                   checked={isChecked}/> : isChecked ?
                    <KeyboardArrowUp fontSize="large" onClick={changeChecked} sx={{marginLeft: "9px"}} /> : <KeyboardArrowDown fontSize="large"onClick={changeChecked} sx={{marginLeft: "9px"}}/>}
                <label htmlFor={`praznik-${data.novi}`}>
                    <span>
                        <strong>{data.ime_dana}</strong>
                    </span>
                    <p>
                        {data.novi}.
                        <i>({data.stari}).</i>
                        <strong>{data.mesec}</strong>
                    </p>
                    <p dangerouslySetInnerHTML={{__html: data.praznik}}/>
                </label>

                <Tooltip title={!postojeceBogosluzenje ? '' : "Oбриши из распореда"}>
                    <span>
                        <IconButton aria-label="Oбриши из распореда" sx={{margin: 1}} color="error"
                                    disabled={!postojeceBogosluzenje} onClick={deleteBogosluzenje}>
                            <DeleteIcon/>
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
            {isChecked &&
                <DodajPraznik
                    data={data}
                    bogosluzenje={postojeceBogosluzenje}
                    setPostojeceBogosluzenje={setPostojeceBogosluzenje}
                />}
            <Divider/>
        </>
    );
}