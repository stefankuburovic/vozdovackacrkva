import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import AuthService from "../../../admin/services/AuthService";

import './Login.scss';
const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await AuthService.login(username, password);
    };

    return (
        <Grid container justifyContent="center" style={{ height: '100vh', minWidth: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                <Grid container alignItems="center" justifyContent="center" style={{ height: '500px'}}>
                    <form onSubmit={handleSubmit}>
                        <Typography component="h1" variant="h5">
                            Улогујте се
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="username"
                            label="Корисничко име *"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Лозинка *"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Улогујте се
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            onClick={() => AuthService.logout()}
                        >
                            Излогујте се
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;