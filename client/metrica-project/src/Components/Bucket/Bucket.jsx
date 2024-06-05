import React, { useContext, useState } from 'react';
import './Bucket.css';
import Axios from 'axios';
import { useEffect } from 'react';
import DropDownList from '../DropDownList/DropDownList';
import { CategoryContext } from '../../contexts/categoryContext';
import { submitBucket } from '../../toolsFunctions/submitBucket'


export default function Bucket() {
    const host = process.env.REACT_APP_API_BASE_URL;
    const apiEndpoint = `${host}/api/bucket`;
    const { selectedCategory, setSelectedCategory, selectedCategory2, setSelectedCategory2, selectedCategory3, setSelectedCategory3 } = useContext(CategoryContext);
    const { openAlertSuccess, setOpenAlertSuccess } = useContext(CategoryContext);
    const { openAlertError, setOpenAlertError } = useContext(CategoryContext);
    const [bucket, setBucket] = useState('');


    return (
        <div>
            <div className='bucket' >
                <h3>bucket</h3>
                {/* <DropDownList
                    apiEndpoint={apiEndpoint}
                    categoryType="bucket"
                    categoryHirarchy="bucket"
                /> */}
                <br></br>
                <input id='bucket' placeholder='הכנס קבוצה' onChange={(e) => { setBucket(e.target.value) }}></input> &nbsp;
                <input id='submitBucketBTN' type='button' value={"OK"}
                    onClick={() => {
                        submitBucket(bucket)
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
                                    alert("לא ניתן להזין קבוצה קיימת")
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
