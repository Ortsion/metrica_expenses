import React, { useState } from 'react'
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { PropTypes } from 'prop-types';
import './MUIAlert.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    direction: 'rtl',
});

export default function MUIAlert(props) {

    const [openAlert, setOpenAlert] = useState(true);


    return (
        <ThemeProvider theme={theme}>
            <div className='MUIAlert'>
                <Collapse in={openAlert}>
                    <Alert
                        id='alert'
                        className='alertSection'
                        severity={props.severity}
                        action={<IconButton onClick={() => { setOpenAlert(false) }}>
                            <CloseIcon id="closeIcon"></CloseIcon>
                        </IconButton>}
                    >
                        <AlertTitle>{props.alertTitle}</AlertTitle>
                        {props.content}
                    </Alert>
                </Collapse>

            </div >
        </ThemeProvider>
    )
}

MUIAlert.propTypes = {
    severity: PropTypes.oneOf(['success', 'error']),
    alertTitle: PropTypes.oneOf(['Success', 'Error']),
    content: PropTypes.string,
}
