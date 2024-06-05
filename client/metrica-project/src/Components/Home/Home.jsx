import React, { useEffect } from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import CreateUser from '../CreateUser/CreateUser';
import Login from '../Login/Login'
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return true
    }
  };
  useEffect(() => {
    if (checkToken()) { navigate('/expenseRegistration') }
  })
  const toLogin = () => { console.log('login'); }
  const toRegister = () => { console.log('register'); }
  return (
    <div className='home'>
      <h1>ברוכים הבאים למטריקה</h1>
      <div className='button-container'>
        <Link to="/login" className="nav-link">
          <button className="login-button">התחברות</button>
        </Link>
        <Link to="/createUser" className="nav-link">
          <button className="create-user-button">יצירת משתמש חדש</button>
        </Link>
      </div>
    </div>
  )
}


