import React, { useContext, useState } from 'react';
import './SecondaryCategory.css';
import Axios from 'axios';
import { useEffect } from 'react';
import DropDownList from '../DropDownList/DropDownList';
import { CategoryContext } from '../../contexts/categoryContext';
import { submitCategory } from '../../toolsFunctions/categoryRegistration'

export default function SecondaryCategory() {

    const apiEndpoint = 'http://localhost:3008/api/categoriesRegistration';
    const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
    const [category, setCategory] = useState('');


    return (
        <div>
            <div className='SecondaryCategory' >
                <h3>רישום קטגוריה משנית</h3>
                <DropDownList 
                apiEndpoint={apiEndpoint} 
                father={'0'} 
                categoryType="ראשית"
                categoryHirarchy = 'primary'
                />
                <br></br>
                <input id='category' placeholder=' הכנס קטגוריה משנית'
                    onChange={(e) => { setCategory(e.target.value) }}>
                </input>
                <input id='submitCategoryBTN' type='button' value={"שלח"}
                    onClick={() => { submitCategory(category, selectedCategory, 'second') }}>
                </input>
            </div>

        </div>
    )
}

