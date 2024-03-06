import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import axios from "axios";

import Radio from "@mui/material/Radio";
import {TimePicker} from "@mui/x-date-pickers";
import {IconButton, Tooltip} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RadioGroup from "@mui/material/RadioGroup";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel"

import {PraznikProps} from "../Praznik/Praznik";
import Editor from "../../../../components/Editor/Editor";
import {ApiUrlContext} from "../../../../../index";
import {convertTimeStampToHHMM} from "../../../../../util/functions";
import {Bogosluzenje} from "../index";
import {SnackbarContext} from "../../../../contexts/SnackbarContext";
import {DodajBogosluzenje} from "../DodajBogosluzenje/DodajBogosluzenje";
import DeleteIcon from "@mui/icons-material/Delete";

const LETNJI_MESECI = ['Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар'];

interface BogosluzenjeData {
    id: number;
    praznik: string;
    datum_bogoosluzenja: string;
    vreme_bogoosluzenja: string;
    datum_bdenija: string;
    vreme_bdenija: string;
    dodatne_informacije: string;
}

interface DodajPraznikProps extends PraznikProps {
    setPostojeceBogosluzenje: (bogosluzenje: Bogosluzenje | undefined) => void;
}

export const DodajPraznik = ({data, bogosluzenje, setPostojeceBogosluzenje}: DodajPraznikProps): React.JSX.Element => {
    const apiUrl = useContext(ApiUrlContext);

    const datumLiturgije = useMemo(() => new Date(data.datum), [data.datum]);
    const [disabled, setDisabled] = useState(true);
    const vremeLiturgije = new Date(data.datum).setHours(9, 0);
    const [dodatneInformacije, setDodatneInformacije] = useState('');
    const [bogosluzenjeData, setBogosluzenjeData] = useState<BogosluzenjeData[]>([]);
    const datumBdenija = useMemo(() => new Date(new Date(data.datum).getTime() - 60 * 60 * 24 * 1000), [data.datum]);
    const [praznik, setPraznik] = useState<string | null>(bogosluzenje?.praznik || null);
    const vremeBdenija = LETNJI_MESECI.includes(data.mesec) ? datumBdenija.setHours(18, 0) : datumBdenija.setHours(17, 0);
    const [bogosluzenja, setBogosluzenja] = useState([<DodajBogosluzenje key={0}/>]);

    const deleteBogosluzenje = (index: number) => {
        setBogosluzenja(bogosluzenja.filter((_, i) => i !== index));
    };


    const {openSnackbar} = useContext(SnackbarContext);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`${apiUrl}/bogosluzenja/date/${datumLiturgije.toISOString().slice(0, 10)}`);
            setBogosluzenjeData(response.data);
            setPostojeceBogosluzenje(response.data[0]);
        } catch (error) {
            console.error(error);
        }
    }, [apiUrl, datumLiturgije, setPostojeceBogosluzenje]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    useEffect(() => {
        setDodatneInformacije(bogosluzenje?.dodatne_informacije || '');
    }, [bogosluzenje]);

    const saveData = useCallback(async () => {
        const bogosluzenje = {
            praznik: praznik,
            datum_bogosluzenja: datumLiturgije.toISOString().slice(0, 10),
            vreme_bogosluzenja: convertTimeStampToHHMM(vremeLiturgije),
            datum_bdenija: datumBdenija.toISOString().slice(0, 10),
            vreme_bdenija: convertTimeStampToHHMM(vremeBdenija),
            dodatne_informacije: dodatneInformacije
        };

        try {
            if (bogosluzenjeData.length > 0) {
                await axios.put(`${apiUrl}/bogosluzenja/${bogosluzenjeData[0].id}`, bogosluzenje);
            } else {
                await axios.post(`${apiUrl}/bogosluzenja`, bogosluzenje);
            }
            fetchData();
            openSnackbar(`Богослужење за празник ${praznik} је успешно сачувано у распоред`, "success");
        } catch (error) {
            console.error(error);
            openSnackbar('Дошло је до грешке приликом чувања богослужења у распоред', "error");
        }
    }, [praznik, datumLiturgije, vremeLiturgije, datumBdenija, vremeBdenija, dodatneInformacije, bogosluzenjeData, fetchData, openSnackbar, apiUrl]);

    useEffect(() => {
        if (praznik && datumBdenija && vremeBdenija && datumLiturgije && vremeLiturgije) setDisabled(false);
    }, [praznik, datumBdenija, vremeBdenija, datumLiturgije, vremeLiturgije]);

    return (
        <div className="sacuvaj-bogosluzenje">
            <div className="selektovani-praznik">
                <div className="ime-praznika">
                    <h3>Селектујте назив празника (<i>односно који се Светац слави тај дан</i>)</h3>
                    <RadioGroup name='praznik' onChange={(e) => setPraznik(e.target.value.trim())}
                                defaultValue={bogosluzenje?.praznik}>
                        {data.praznik.split(';').map((praznik, index) => (
                            <FormControlLabel
                                key={index}
                                value={praznik}
                                control={<Radio color="primary"/>}
                                label={<span dangerouslySetInnerHTML={{__html: praznik.trim()}}/>}
                            />
                        ))}
                    </RadioGroup>
                    {bogosluzenja.map((bogosluzenje, index) => (
                        <div key={index} style={{display: "flex", alignItems: 'baseline'}}>
                            {bogosluzenje}
                            {index !== 0 &&
                                <IconButton onClick={() => deleteBogosluzenje(index)}
                                            color={'error'}>
                                    <DeleteIcon/>
                                </IconButton>
                            }
                        </div>
                    ))}
                    {/*<Button onClick={addBogosluzenje} startIcon={<AddIcon />}>Додај ново</Button>*/}
                    {/* Other code... */}
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
                    <Editor setContent={setDodatneInformacije} defaultContent={bogosluzenje?.dodatne_informacije}/>
                </div>
            </div>
            <div className="akcije">
                <Tooltip
                    title={disabled ? 'Поставите све потребне елементе за чување у распоред' : 'Сачувајте у распоред'}>
                    <span>
                        <IconButton
                            onClick={saveData}
                            sx={{margin: 1}}
                            disabled={disabled}
                            aria-label="Сачувај у распоред"
                            color={disabled ? 'secondary' : 'primary'}
                            style={{pointerEvents: disabled ? 'none' : 'auto'}}
                        >
                            <SaveIcon/>
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
        </div>
    );
};