import React, { useContext, useState } from 'react';
import './EndCategory.css';
import Axios from 'axios';
import { useEffect } from 'react';
import DropDownList from '../DropDownList/DropDownList';
import { CategoryContext } from '../../contexts/categoryContext';
import { submitCategory } from '../../toolsFunctions/categoryRegistration'


export default function EndCategory() {

    const apiEndpoint = 'http://localhost:3008/api/categoriesRegistration';
    const { selectedCategory, setSelectedCategory,selectedCategory2, setSelectedCategory2,selectedCategory3, setSelectedCategory3 } = useContext(CategoryContext);
    const [category, setCategory] = useState('');
    

  return (
    <div>
    <div className='EndCategory' >
        <h3>רישום קטגוריית קצה</h3>
        <DropDownList
        apiEndpoint={apiEndpoint} 
        father={selectedCategory} 
        categoryType="משנית"
        categoryHirarchy= "secondary"
        />
        <br></br>
        <input id='category' placeholder='הכנס קטגוריית קצה' onChange={(e) => { setCategory(e.target.value) }}></input>
        <input id='submitCategoryBTN' type='button' value={"שלח"} onClick={() => { submitCategory(category,selectedCategory2, 'third') }}></input>
    </div>

</div>
)
}
