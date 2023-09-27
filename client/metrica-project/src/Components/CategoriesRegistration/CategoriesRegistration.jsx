import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './CategoriesRegistration.css';
import SecondaryCategory from '../SecondaryCategory/SecondaryCategory';
import { submitCategory } from '../../toolsFunctions/categoryRegistration';
import EndCategory from '../EndCategory/EndCategory';
import NavigationBar from '../NavigationBar/NavigationBar';

export default function CategoriesRegistration() {


  // const [res, setRes] = useState('');
  const [category, setCategory] = useState('');

  
  
  return (
    <div className='categoriesRegistration'>
      <NavigationBar/>
      <div className='insertCategory' id='categoty0'>
        <h3>קטגוריה ראשית</h3>
        <input id='category' placeholder=' הכנס קטגוריה ראשית' value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
        <input id='submitCategoryBTN' type='button' value={"שלח"} onClick={() => { submitCategory(category, 0); setCategory(''); }}></input>
      </div>
      <br></br>
      ------------------------------------------------------
      <SecondaryCategory />
      <br></br>
      ------------------------------------------------------
      {<EndCategory/>}
      <br></br>
      {/* {res != "" && res} */}
    </div>
  )
}


    // const submitCategory = (category, father) => {
    //   Axios.post("http://localhost:3008/api/categoriesRegistration", {
    //     category: category,
    //     father: father,
    //   }, {
    //     headers: {
    //       Authorization: localStorage.getItem('token')
    //     }
    //   }).then((response) => {
    //     if (response.status == 200) {
    //       alert(`רישום קטגוריה ראשית ${category} בוצע בהצלחה`)
    //     }
    //     setCategory('');
    //   }).catch((error) => {
    //     console.error('Error in category registration: ', error)
    //   })
    // }
    // submitCategory(category, father);
 
 
    // const checkConnection = () => {
  //   Axios.get("http://localhost:3008/api/categoriesRegistration", {
  //     headers: {
  //       Authorization: localStorage.getItem('token')
  //     }
  //   }).then((response) => {

  //     console.log('response from userAuthenticated: ', response.data);
  //     // setRes( (Object.entries(response)).toString() )
  //   }).catch((error) => {
  //     alert('Please Login Again')
  //     console.error('Error in userAuthenticated: ', error);

  //   });
  // }
