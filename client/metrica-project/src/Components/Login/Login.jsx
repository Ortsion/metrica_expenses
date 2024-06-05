import React, { useState } from 'react';
import './Login.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const host = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flag, setFlag] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);


  const getUserDetails = async () => {
    try {
      const response = await Axios.post(`${host}/api/login`, {
        email: email,
        password: password,
      });

      // Handle successful response
      console.log('Login.jsx says: respnse.data =', response.data);
      setLoginStatus(true);
      localStorage.setItem("token", response.data.token);
      navigate('/categoryRegistration');

    } catch (error) {
      // Handle errors, including 401 Unauthorized
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Unauthorized: Incorrect email or password.");
          setFlag(true)
        } else {
          console.log("Error response from server:", error.response.data);
        }
      } else {
        console.log("Error making request:", error.message);
      }
    }
  };



  const loginFunction = () => {
    getUserDetails();
  }
  return (
    <div className='login'>
      <p id='bsd'>בס"ד</p>
      <p className='title'>התחברות</p>
      <div className='inputs'>
        <input type='text' placeholder='אימייל' onChange={(e) => { setEmail(e.target.value); setFlag(false) }}></input>
        <input type='password' placeholder='סיסמה' onChange={(e) => { setPassword(e.target.value); setFlag(false) }}></input>
        {flag && <p className='errorP'>שם משתמש או סיסמה לא נכונים</p>}
        <input type="button" id="loginBTN" value={"התחבר"} onClick={loginFunction}></input>
        <br></br>
        {/* {loginStatus && <button onClick={userAuthenticated}>Check If authenticated</button>} */}
      </div>
    </div>
  )
}
