import React, { useContext, useState } from 'react';
import './EndCategory.css';
import Axios from 'axios';
import { useEffect } from 'react';
import DropDownList from '../DropDownList/DropDownList';
import { CategoryContext } from '../../contexts/categoryContext';
import { submitCategory } from '../../toolsFunctions/categoryRegistration'


export default function EndCategory() {
  const host = process.env.REACT_APP_API_BASE_URL;
  const apiEndpoint = `${host}/api/categoriesRegistration`;
  const { selectedCategory, setSelectedCategory, selectedCategory2, setSelectedCategory2, selectedCategory3, setSelectedCategory3 } = useContext(CategoryContext);
  const { openAlertSuccess, setOpenAlertSuccess } = useContext(CategoryContext);
  const { openAlertError, setOpenAlertError } = useContext(CategoryContext);
  const [category, setCategory] = useState('');


  return (
    <div>
      <div className='EndCategory' >
        <h3>קצה</h3>
        <DropDownList
          apiEndpoint={apiEndpoint}
          father={selectedCategory}
          categoryType="משנית"
          categoryHirarchy="secondary"
        />
        <br></br>
        <input id='category' placeholder='הכנס קטגוריית קצה' onChange={(e) => { setCategory(e.target.value) }}></input> &nbsp;
        <input id='submitCategoryBTN' type='button' value={"OK"}
          onClick={() => {
            submitCategory(category, selectedCategory2, 'third')
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
          }}
        >
        </input>
      </div>

    </div>
  )
}
