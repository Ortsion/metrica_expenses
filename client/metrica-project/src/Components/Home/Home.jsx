import React from 'react';
import { Link } from 'react-router-dom';
import CreateUser from '../CreateUser/CreateUser';
import Login from '../Login/Login'

export default function Home() {

    const toLogin = () => {console.log('login');}
    const toRegister = () => {console.log('register');}
  return (
    <div>
       <Link to="/createUser" > Create User </Link>
       <br></br>
       <Link to="/login" >Login</Link>
    </div>
  )
}


