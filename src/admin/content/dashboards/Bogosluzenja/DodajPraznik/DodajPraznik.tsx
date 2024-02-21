import  {useCallback, useEffect, useState} from 'react';
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {TimePicker} from "@mui/x-date-pickers";
import {IconButton, Tooltip} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import {PraznikProps} from "../Praznik/Praznik";
import Editor from "../../../../components/Editor/Editor";

const LETNJI_MESECI = ['Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар'];
export const DodajPraznik = ({data}: PraznikProps): React.JSX.Element => {
    const [praznik, setPraznik] = useState(data.praznik.split(';')[0].trim());
    const [disabled, setDisabled] = useState(true);
    const datumBdenija = new Date(new Date(data.datum).getTime() - 60 * 60 * 24 * 1000);
    const vremeBdenija = LETNJI_MESECI.includes(data.mesec) ? datumBdenija.setHours(18, 0) : datumBdenija.setHours(17, 0);
    const datumLiturgije = new Date(data.datum);
    const vremeLiturgije = new Date(data.datum).setHours(9, 0);
    const [dodatneInformacije, setDodatneInformacije] = useState('');

    const saveData = useCallback(() => {
        console.log({
            praznik,
            datumBdenija,
            vremeBdenija,
            datumLiturgije,
            vremeLiturgije,
            dodatneInformacije
        });
        // Here you can handle the editorContent as you need
    }, [praznik, datumBdenija, vremeBdenija, datumLiturgije, vremeLiturgije, dodatneInformacije]);

    useEffect(() => {
        if(praznik && datumBdenija && vremeBdenija && datumLiturgije && vremeLiturgije) setDisabled(false);
    }, [praznik, datumBdenija, vremeBdenija, datumLiturgije, vremeLiturgije]);

    return (
        <div className="sacuvaj-bogosluzenje">
            <div className="selektovani-praznik">
                <div className="ime-praznika">
                    <h3>Селектујте назив празника (<i>односно који се Светац слави тај дан</i>)</h3>
                    <RadioGroup name='praznik' onChange={(e) => setPraznik(e.target.value.trim())}>
                        {data.praznik.split(';').map((praznik, index) => (
                            <FormControlLabel
                                key={index}
                                value={praznik}
                                control={<Radio color="primary"/>}
                                label={<span dangerouslySetInnerHTML={{__html: praznik.trim()}}/>}
                                checked={index === 0}
                            />
                        ))}
                    </RadioGroup>
                </div>
                <div className="inner">
                    <h3>Датум и време бденија:</h3>
                    <DatePicker
                        defaultValue={datumBdenija}
                        sx={{marginRight: 1}}
                        label='Датум бденија'
                        readOnly
                    />
                    <TimePicker
                        defaultValue={vremeBdenija}
                        label='Време бденија'
                        readOnly
                    />
                </div>
                <div className="inner">
                    <h3>Датум и време богослужења:</h3>
                    <DatePicker
                        readOnly
                        sx={{marginRight: 1}}
                        defaultValue={datumLiturgije}
                        label='Датум Свете Литургије'
                    />
                    <TimePicker
                        defaultValue={vremeLiturgije}
                        label='Време Свете Литургије'
                        readOnly
                    />
                </div>
                <div className="dodatne-informacije">
                    <h3>Додатне информације:</h3>
                    <Editor setContent={setDodatneInformacije}/>
                </div>
            </div>
            <div className="akcije">
                <Tooltip title="Сачувај у распоред">
                    <IconButton aria-label="Сачувај у распоред" sx={{margin: 1}} color={disabled ? 'secondary' : 'primary'} style={{pointerEvents: disabled ? 'none' : 'auto'}}
                                onClick={saveData}>
                        <SaveIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};