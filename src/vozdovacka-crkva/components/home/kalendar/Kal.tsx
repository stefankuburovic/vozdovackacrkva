import * as React from 'react';
import {Box, Divider} from "@mui/material";
import {useState} from "react";

const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
export default function Kal() {
    const [success, setSuccess] = React.useState(false);
    const [fetchedData, setFetchData] = useState([]);
    const [danasnjiPraznik, setDanasnjiPraznik] = useState('');

    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const monthName = capitalizeFirstLetter(currentDate.toLocaleString('sr-RS', { month: 'long' }));
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const getDataFromApi = () => {
        fetch(`https://pravoslavno.rs/v1/kalendar/${currentYear}-${currentMonth ? `0${currentMonth}` : currentMonth}`, {
            method: 'GET',
            headers: {}
        })
            .then(response => response.json())
            .then(data => {
                setFetchData(JSON.parse(data.contents)[monthName]);
                setSuccess(true);

            })
            .catch(error => {
                console.log(error);
                // this.setState({ error: error });
            });
    };
    getDataFromApi();
    // const fetchData = async () => {
    //     try {
    //         const response = await fetch(  'https://graph.instagram.com/me/media?&access_token=IGQWRPRG0yeEdJRzE5Y0Q4WGo3MVo0YUdjSzFnaXhLSkMzT0tXc2dkWGUweG1WbEczLXZAwa1VYUkhuNklWbTNjZAkVhTkM1c0JWVFVQUnhMR2RENG9rVXZADdWd6LVY3TEs4R3VtVGJDQWpKYmtUMUhGeDVETXI0RzAZD&fields=media_url,permalink')
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data);
    //
    //             })
    //         // Handle the data and update state
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    // fetchData();

    return (
        <>
        </>

    );
}
