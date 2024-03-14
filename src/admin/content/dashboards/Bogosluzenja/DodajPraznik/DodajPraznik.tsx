import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';

import Radio from "@mui/material/Radio";
import {IconButton, Tooltip} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RadioGroup from "@mui/material/RadioGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControlLabel from "@mui/material/FormControlLabel"

import {ApiUrlContext} from "../../../../../index";
import {PraznikProps} from "../Praznik/Praznik";
import Editor from "../../../../components/Editor/Editor";
import {SnackbarContext} from "../../../../contexts/SnackbarContext";
import {convertTimeStampToHHMM} from "../../../../../util/functions";
import BogosluzenjaService, {IBogosluzenje} from "../../../../../shared/services/bogosluzenja";
import {DodajBogosluzenje} from "../DodajBogosluzenje/DodajBogosluzenje";
import {ChangableDateAndTime} from "./ChangeableDateAndTime/ChangeableDateAndTime";

const LETNJI_MESECI = ['Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар'];

interface DodajPraznikProps extends PraznikProps {
    setPostojeceBogosluzenje: (bogosluzenje: IBogosluzenje | undefined) => void;
}

//TODO: MORA REFAKTOR, MALO JE NEJASNA KOMPONENTA
export const DodajPraznik = ({
     praznik,
     bogosluzenje,
     setPostojeceBogosluzenje
 }: DodajPraznikProps): React.JSX.Element => {
    /**
     * Destructure props
     * */
    const {datum, mesec} = praznik;
    /**
     * Include Context and Services
     * */
    const apiUrl = useContext(ApiUrlContext);
    const {openSnackbar} = useContext(SnackbarContext);
    const bogosluzenjeService = BogosluzenjaService.getInstance();
    /**
     * Create State
     * */
    const [disabled, setDisabled] = useState(true);
    const [dodatneInformacije, setDodatneInformacije] = useState('');
    const [bogosluzenjeData, setBogosluzenjeData] = useState<IBogosluzenje[]>(
        bogosluzenje ?
            [bogosluzenje]
            : []
    );
    const [praznikBogosluzenja, setPraznikBogosluzenja] = useState<string | null>(bogosluzenje?.praznik || null);
    const [bogosluzenja, setBogosluzenja] = useState([<DodajBogosluzenje key={0}/>]);
    const [datumBdenija, setDatumBdenija] = useState(
        useMemo(
            () => new Date(
                new Date(datum).getTime() - 60 * 60 * 24 * 1000
            ),
            [datum]
        )
    );
    const [vremeBdenija, setVremeBdenija] = useState(
        LETNJI_MESECI.includes(mesec)
            ? datumBdenija.setHours(18, 0)
            : datumBdenija.setHours(17, 0)
    );
    const vremeLiturgije = new Date(datum).setHours(9, 0);
    const datumLiturgije = useMemo(
        () => new Date(datum),
        [datum]
    );
    /**
     *  Create Functions
     * */
    const deleteBogosluzenje = (index: number) => {
        setBogosluzenja(bogosluzenja.filter((_, i) => i !== index));
    };

    const fetchData = useCallback(async () => {
        let ignore = false;
        if (!ignore) {
            await bogosluzenjeService.getBogosluzenja(datumLiturgije, setBogosluzenjeData, setPostojeceBogosluzenje, apiUrl);
        }

        return () => {
            ignore = true;
        }
    }, [apiUrl, bogosluzenjeService, datumLiturgije, setPostojeceBogosluzenje]);

    useEffect(() => {
        setDodatneInformacije(bogosluzenje?.dodatne_informacije || '');
    }, [bogosluzenje]);


    const saveData = useCallback(async () => {
        const bogosluzenje = {
            praznik: praznikBogosluzenja,
            datum_bogosluzenja: datumLiturgije.toISOString().slice(0, 10),
            vreme_bogosluzenja: convertTimeStampToHHMM(vremeLiturgije),
            datum_bdenija: datumBdenija.toISOString().slice(0, 10),
            vreme_bdenija: convertTimeStampToHHMM(vremeBdenija),
            dodatne_informacije: dodatneInformacije
        };
        await bogosluzenjeService.saveOrUpdateBogosuzenje(
            bogosluzenje,
            bogosluzenjeData,
            fetchData,
            openSnackbar,
            apiUrl
        );
    }, [
        praznikBogosluzenja,
        datumLiturgije,
        vremeLiturgije,
        datumBdenija,
        vremeBdenija,
        dodatneInformacije,
        bogosluzenjeService,
        bogosluzenjeData,
        fetchData,
        openSnackbar,
        apiUrl
    ]);

    useEffect(() => {
        if (praznik
            && datumBdenija
            && vremeBdenija
            && datumLiturgije
            && vremeLiturgije
        )
            setDisabled(false);
    }, [
        praznikBogosluzenja,
        datumBdenija,
        vremeBdenija,
        datumLiturgije,
        vremeLiturgije,
        praznik
    ]);

    return (
        <div className="sacuvaj-bogosluzenje">
            <div className="selektovani-praznik">
                <div className="ime-praznika">
                    <h3>Селектујте назив празника (<i>односно који се Светац слави тај дан</i>)</h3>
                    <RadioGroup name='praznik' onChange={(e) => setPraznikBogosluzenja(e.target.value.trim())}
                                defaultValue={bogosluzenje?.praznik}>
                        {praznik.praznik.split(';').map((praznik, index) => (
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
                </div>
                <div className="inner">
                    <h3>Датум и време бденија:</h3>
                    <ChangableDateAndTime
                        date={datumBdenija}
                        labels={
                            {
                                checkboxLabel: 'Измените време бденија',
                                datePickerLabel: 'Датум бденија',
                                timePickerLabel: 'Време бденија'
                            }
                        }
                        setDate={setDatumBdenija} time={vremeBdenija}
                        setTime={setVremeBdenija}
                    />
                </div>
                <div className="inner">
                    <h3>Датум и време богослужења:</h3>
                    <ChangableDateAndTime
                        date={datumLiturgije}
                        labels={
                            {
                                checkboxLabel: 'Измените време богослужења',
                                datePickerLabel: 'Датум богослужења',
                                timePickerLabel: 'Време богослужења'
                            }
                        }
                        setDate={setDatumBdenija} time={vremeLiturgije}
                        setTime={setVremeBdenija}
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