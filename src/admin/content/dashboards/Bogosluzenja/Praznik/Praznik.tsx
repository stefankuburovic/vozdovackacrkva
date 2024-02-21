import {useState} from 'react';
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import {Praznik} from "../index";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './Praznik.scss';
import {Divider, IconButton, TextareaAutosize, Tooltip} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";
import {TimePicker} from "@mui/x-date-pickers";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {DodajPraznik} from "../DodajPraznik/DodajPraznik";

export interface PraznikProps {
    data: Praznik;
}
const isSunday = (imeDana: string) => {
    return imeDana === 'Недеља';
}
export default function PraznikComponent({data}: PraznikProps): React.JSX.Element {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    return (
        <>
            {data.ime_sedmice && <h2>{data.ime_sedmice}</h2>}
            <div className={`praznik && ${isChecked && 'selected'}`}
                 style={{color: `${isSunday(data.ime_dana) ? 'red' : 'black'}`}}>
                <Checkbox id={`praznik-${data.novi}`} onChange={handleCheckboxChange}/>
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

                {/*<Tooltip title="Oбриши из распореда">*/}
                    <IconButton aria-label="Oбриши из распореда" sx={{margin: 1}} color="error" disabled>
                        <DeleteIcon/>
                    </IconButton>
                {/*</Tooltip>*/}
            </div>
            { isChecked && <DodajPraznik data={data} /> }
            <Divider/>
        </>
    );
}