import React, {useContext, useEffect, useState} from "react";

import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import {Divider, IconButton, Tooltip} from "@mui/material";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";

import {Praznik} from "../index";
import {ApiUrlContext} from "../../../../../index";
import {DodajPraznik} from "../DodajPraznik/DodajPraznik";
import {SnackbarContext} from "../../../../contexts/SnackbarContext";

import './Praznik.scss';
import BogosluzenjaService, {IBogosluzenje} from "../../../../../shared/services/bogosluzenja";

export interface PraznikProps {
    praznik: Praznik;
    bogosluzenje?: IBogosluzenje
}

const isSunday = (imeDana: string) => {
    return imeDana === 'Недеља';
}
export default function PraznikComponent({praznik, bogosluzenje}: PraznikProps): React.JSX.Element {
    const bogosluzenjeService = BogosluzenjaService.getInstance();
    const apiUrl = useContext(ApiUrlContext);
    const {openSnackbar} = useContext(SnackbarContext);
    const [isChecked, setIsChecked] = useState(false);
    const [postojeceBogosluzenje, setPostojeceBogosluzenje] = useState<IBogosluzenje | undefined>(undefined);

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
        if (postojeceBogosluzenje?.id)
            bogosluzenjeService.deleteBogosluzenje(postojeceBogosluzenje?.id, setPostojeceBogosluzenje, openSnackbar, apiUrl);
    }

    const {
        ime_sedmice,
        ime_dana,
        novi,
        stari,
        mesec
    } = praznik;

    return (
        <>
            {ime_sedmice && <h2>{ime_sedmice}</h2>}
            <div className={`praznik && ${(isChecked || postojeceBogosluzenje) && 'selected'}`}
                 style={
                     {
                         color: `${isSunday(ime_dana) ? 'red' : 'black'}`
                     }}>
                {
                    !postojeceBogosluzenje ?
                        <Checkbox
                            id={`praznik-${novi}`}
                            onChange={handleCheckboxChange}
                            checked={isChecked}/>
                        : isChecked ?
                            <KeyboardArrowUp fontSize="large" onClick={changeChecked} sx={{marginLeft: "9px"}}/> :
                            <KeyboardArrowDown fontSize="large" onClick={changeChecked} sx={{marginLeft: "9px"}}/>
                }
                <label htmlFor={`praznik-${novi}`}>
                    <span>
                        <strong>{ime_dana}</strong>
                    </span>
                    <p>
                        {novi}.
                        <i>({stari}).</i>
                        <strong>{mesec}</strong>
                    </p>
                    <p dangerouslySetInnerHTML={{__html: praznik.praznik}}/>
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
                    praznik={praznik}
                    bogosluzenje={postojeceBogosluzenje}
                    setPostojeceBogosluzenje={setPostojeceBogosluzenje}
                />}
            <Divider/>
        </>
    );
}