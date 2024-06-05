import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import './CategoriesRegistration.css';
import SecondaryCategory from '../SecondaryCategory/SecondaryCategory';
import { submitCategory } from '../../toolsFunctions/categoryRegistration';
import EndCategory from '../EndCategory/EndCategory';
import NavigationBar from '../NavigationBar/NavigationBar';
import { CategoryContext } from '../../contexts/categoryContext';
import MUIAlert from "../../MUI/MUIAlert/MUIAlert";
import CategoriesList from '../CategoriesList/CategoriesList';
import Bucket from '../Bucket/Bucket';


export default function CategoriesRegistration() {


  const { openAlertSuccess, setOpenAlertSuccess } = useContext(CategoryContext);
  const { openAlertError, setOpenAlertError } = useContext(CategoryContext);
  const { refreshDropdown, setRefreshDropdown } = useContext(CategoryContext);
  const [category, setCategory] = useState('');



  return (
    <>
      <NavigationBar />

      <div className='categoriesRegistration'>

        <h1>רישום קטגוריות</h1>

        <div className='categoriesWeapper'>

          <div className='insertCategory' id='categoty0'>
            <h3>ראשית</h3>
            <input id='category' placeholder=' הוסף קטגוריה ראשית' value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
            &nbsp;
            <input id='submitCategoryBTN' type='button' value={"OK"}
              onClick={() => {
                submitCategory(category, 0)
                  .then((success) => {
                    if (success) {
                      setOpenAlertSuccess(true);
                      setTimeout(() => {
                        setOpenAlertSuccess(false)
                      }, 4000)
                    }
                  })
                  .catch((err) => {
                    if (err.response.status == 422) {
                      alert("לא ניתן להזין קטגוריה קיימת")
                    }
                    else if (err) {
                      setOpenAlertError(true);
                      setTimeout(() => {
                        setOpenAlertError(false)
                      }, 4000);
                    }
                  })
                setCategory(''); setRefreshDropdown(prevState => !prevState)
              }}
            >
            </input>
            <div className='categoriesListDiv' >
              <CategoriesList father={0} />
            </div>
          </div>
          <br></br>

          <div className='insertCategory'>
            <SecondaryCategory />
            {/* <CategoriesList /> */}
          </div>

          <div className='insertCategory'>
            <EndCategory />
          </div>

          <div className='insertCategory'>
            <Bucket />
          </div>

        </div>
        {openAlertSuccess && <MUIAlert severity="success" alertTitle="בוצע בהצלחה" />}
        {openAlertError && <MUIAlert severity="error" alertTitle="רישום נכשל" />}
      </div>
    </>
  )
}


