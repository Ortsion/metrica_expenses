import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './NavigationBar.css';
import { AppBar, Toolbar, Stack, Button, Divider } from "@mui/material";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function NavigationBar() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [greeting, setGreeting] = useState('');
    const host = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchUserName = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                try {
                    const response = await axios.get(`${host}/api/userDetails`, {
                        headers: {
                            userId: userId,
                        },
                    });
                    const user = response.data;

                    setUserName(user[0].CompanyName);
                } catch (error) {
                    console.error(error)
                }
            }
        }
        fetchUserName();
    }, []);

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            setGreeting('בוקר-טוב');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('צהריים-טובים');
        } else {
            setGreeting('ערב-טוב');
        }
    }, [])

    return (
        <AppBar >
            <Toolbar>
                <p className='greeting_p'>{userName}</p>  <p className='greeting_p'> {greeting}</p>
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


