import React from "react";
import {Box, Tooltip} from "@mui/material";
import {MobileTimePicker, TimePicker} from "@mui/x-date-pickers";
import Checkbox from "@mui/material/Checkbox";
import {Dispatch, SetStateAction, useState} from 'react';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

interface ChangeableDateAndTime {
    date: Date | string | null;
    time: Date | number | string | null;
    setDate: Dispatch<SetStateAction<Date>> | Dispatch<SetStateAction<Date | null>> ;
    setTime: Dispatch<SetStateAction<number>> | Dispatch<SetStateAction<Date | null>>;
    checkboxManpiulation?: boolean;
    labels: {
        checkboxLabel?: string;
        datePickerLabel?: string;
        timePickerLabel?: string;
    };
}
export const ChangableDateAndTime = (
    {
        date,
        time,
        setDate,
        setTime,
        checkboxManpiulation = true,
        labels: {checkboxLabel, datePickerLabel, timePickerLabel}
    }: ChangeableDateAndTime) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <DatePicker
                readOnly
                defaultValue={date}
                sx={{marginRight: 1}}
                label={datePickerLabel}
                onChange={(value) =>setDate(value as Date)}
            />
            <TimePicker
                defaultValue={time}
                format={'HH:mm'}
                ampm={false}
                ampmInClock={false}
                readOnly={!isChecked && checkboxManpiulation}
                label={timePickerLabel}
                onChange={(value) =>setTime(value as any)}
            />
            {
                checkboxManpiulation && <Tooltip arrow placement="top" title={checkboxLabel}>
                    <Checkbox  onChange={handleCheckboxChange} checked={isChecked}/>
                </Tooltip>
            }
        </Box>
    )
}