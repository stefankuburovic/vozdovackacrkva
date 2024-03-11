import {Dispatch, SetStateAction, useState} from 'react';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {TimePicker} from "@mui/x-date-pickers";
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import {Box, Tooltip} from "@mui/material";

interface ChangeableDateAndTime {
    date: Date | string;
    time: number | string;
    setDate: Dispatch<SetStateAction<Date>> ;
    setTime: Dispatch<SetStateAction<number>>;
    labels: {
        checkboxLabel: string;
        datePickerLabel: string;
        timePickerLabel: string;
    };
}
export const ChangableDateAndTime = (
    {
        date,
        time,
        setDate,
        setTime,
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
                readOnly={!isChecked}
                label={timePickerLabel}
                onChange={(value) =>setTime(value as number)}
            />
            <Tooltip arrow placement="top" title={checkboxLabel}>
                <Checkbox  onChange={handleCheckboxChange} checked={isChecked}/>
            </Tooltip>
        </Box>
    )
}