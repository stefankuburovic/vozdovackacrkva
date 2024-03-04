import React, {createContext, useState, useCallback, FC, ReactNode} from 'react';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";
import {AlertColor} from "@mui/material/Alert/Alert";

interface SnackbarContextProps {
    openSnackbar: (message: string, severity: AlertColor) => void;
    children?: React.ReactNode;
}

export const SnackbarContext = createContext<SnackbarContextProps>({ openSnackbar: () => {} });

export const SnackbarProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

    const openSnackbar = useCallback((message: string, severity: AlertColor) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    }, []);

    const closeSnackbar = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <SnackbarContext.Provider value={{ openSnackbar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={closeSnackbar}
                anchorOrigin={{vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};