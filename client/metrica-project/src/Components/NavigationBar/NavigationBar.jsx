import React from 'react';
import { useNavigate } from "react-router-dom";
import './NavigationBar.css';
import { AppBar, Toolbar, Stack, Button, Divider } from "@mui/material"

export default function NavigationBar() {
    const navigate = useNavigate();
    return (
        <AppBar >
            <Toolbar>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    width='100%'
                    spacing={2}
                    divider={<Divider orientation="vertical" color="white" flexItem />}
                >
                    <Button color='inherit' onClick={() => navigate("/login")}>התחבר</Button>
                    <Button color='inherit' onClick={() => navigate("/categoryRegistration")}>רישום קטגוריה</Button>
                    <Button color='inherit' onClick={() => navigate("/expenseRegistration")}>רישום הוצאה</Button>
                    <Button color='inherit' onClick={() => navigate("/login")}>מנהל</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

  
