import React, {useContext, useEffect, useState} from 'react';
import {Button, TextField, Grid, Paper, Typography, Box, InputAdornment, IconButton} from '@mui/material';
import './Login.scss';
import {useAuth} from "../../../contexts/AuthProvider";
import { useNavigate } from 'react-router-dom';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {SnackbarContext} from "../../../contexts/SnackbarContext";
import firebase from "firebase/compat";
import {translateFirebaseErrors} from "../../../../util/functions";
const Login: React.FC = () => {
    const { user, loginFunction } = useAuth();
    const {openSnackbar} = useContext(SnackbarContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/vzdadmin/bogosluzenja');
        }
    }, [user, navigate]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
           const login = await loginFunction(username, password);
           if(login) {
               openSnackbar('Успешно сте се улоговали', 'success');
               navigate('/vzdadmin/bogosluzenja');
           }
        } catch (error: any) {
            console.log(error.code);
            openSnackbar(translateFirebaseErrors(error.code), 'error');
        }
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box className="login-page">
            <Grid container justifyContent="center" style={{ height: '100vh', minWidth: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square style={{maxWidth: "600px"}}>
                    <Grid container alignItems="center" justifyContent="center" style={{ height: '500px',  padding: "2rem"}}>
                        <form onSubmit={handleLogin}>
                            <Typography component="h2"  variant="h4"  sx={{ flexGrow: 1 }}>
                                Вождовачка црква - Улогујте се
                            </Typography>
                            <Typography component="h4" variant="h5">
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
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handlePasswordChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Улогујте се
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;