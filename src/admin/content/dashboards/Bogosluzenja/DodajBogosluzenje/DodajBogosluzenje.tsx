import React, { useState } from 'react';
import Checkbox from "@mui/material/Checkbox";
import { Autocomplete, Box, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {ChangableDateAndTime} from "../DodajPraznik/ChangeableDateAndTime/ChangeableDateAndTime";

const bogosluzenja: Array<{naziv: string, tip: string}>= [
    { naziv: 'Вечерња', tip: "Свакодневна" },
    { naziv: 'Повечерје', tip: "Свакодневна" },
    { naziv: 'Полуноћница', tip: "Свакодневна"},
    { naziv: 'Изобразитељна', tip: "Свакодневна"},
    { naziv: 'Акатист', tip: "Свакодневна"},
    { naziv: 'Јелеосвећење', tip: "Свакодневна"},
    { naziv: "Вечерња", tip: "У великом посту"},
    { naziv: 'Велико повечерје', tip: "У великом посту"},
    { naziv: "Јутрење", tip: "У великом посту"},
    { naziv: 'Царски Часови', tip: "У великом посту"},
    { naziv: 'Изобразитељна', tip: "У великом посту"},
    { naziv: 'Литургија пређеосвећених дарова', tip: "У великом посту"},
]
export const DodajBogosluzenje = () => {
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [selectedBogosluzenje, setSelectedBogosluzenje] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());

    return (
        <Box sx={{display: 'flex', margin: '20px 0', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
                <FormControlLabel
                    key="selektujte-bogoosluzenje"
                    value="Додајте богослужење"
                    control={<Checkbox color="primary" onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}/>}
                    label={<span>Додајте богослужење</span>}
                />
                <Autocomplete
                    id="bogosluzenja"
                    options={bogosluzenja}
                    groupBy={(bogosluzenje) => bogosluzenje.tip}
                    getOptionLabel={(bogosluzenje) => bogosluzenje.naziv}
                    sx={{width: 300}}
                    disabled={!isCheckboxChecked}
                    onChange={(_, newValue) => setSelectedBogosluzenje(newValue && newValue.naziv)}
                    renderInput={(params) => <TextField {...params} label="Изаберите Богослужење"
                                                        disabled={!isCheckboxChecked}/>}
                />
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
                {selectedBogosluzenje && isCheckboxChecked && (
                    <>
                        <ChangableDateAndTime date={selectedDate} time={selectedTime} setDate={setSelectedDate} setTime={setSelectedTime} labels={
                            {
                                datePickerLabel: `Датум ${selectedBogosluzenje}`,
                                timePickerLabel:`Време ${selectedBogosluzenje}`
                            }
                        } checkboxManpiulation={false} />
                    </>
                )}
            </Box>
        </Box>
    );
}