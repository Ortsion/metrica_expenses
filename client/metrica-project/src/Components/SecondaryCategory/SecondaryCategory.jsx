import React, { useContext, useState } from 'react';
import './SecondaryCategory.css';
import Axios from 'axios';
import { useEffect } from 'react';
import DropDownList from '../DropDownList/DropDownList';
import { CategoryContext } from '../../contexts/categoryContext';
import { submitCategory } from '../../toolsFunctions/categoryRegistration';

export default function SecondaryCategory() {

    const apiEndpoint = 'http://localhost:3008/api/categoriesRegistration';
    const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
    const [category, setCategory] = useState('');
    const { refreshDropdown, setRefreshDropdown } = useContext(CategoryContext);
    const { openAlertSuccess, setOpenAlertSuccess } = useContext(CategoryContext);
    const { openAlertError, setOpenAlertError } = useContext(CategoryContext);



    return (
        <div>
            <div className='SecondaryCategory' >
                <h3>משנית</h3>
                <DropDownList
                    apiEndpoint={apiEndpoint}
                    father={'0'}
                    categoryType="ראשית"
                    categoryHirarchy='primary'
                />
                <br></br>
                <input id='category' placeholder=' הכנס קטגוריה משנית'
                    onChange={(e) => { setCategory(e.target.value) }}>
                </input> &nbsp;
                <input id='submitCategoryBTN' type='button' value={"OK"}
                    onClick={() => {
                        submitCategory(category, selectedCategory, 'second')
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
                        setRefreshDropdown(prevState => !prevState);
                    }}
                >
                </input>
            </div>

        </div>
    )
}

