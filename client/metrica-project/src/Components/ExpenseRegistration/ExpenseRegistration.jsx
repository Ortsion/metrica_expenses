import React, { useState, useContext, useEffect } from "react";
import './ExpenseRegistration.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { styled } from '@mui/system';
import DropDownList from "../DropDownList/DropDownList";
import { CategoryContext } from '../../contexts/categoryContext';
import NavigationBar from "../NavigationBar/NavigationBar";
import MUIAlert from "../../MUI/MUIAlert/MUIAlert";
import ColorToggleButton from "../../MUI/ColorToggleButton/ColorToggleButton";


const CustomDesktopDatePicker = styled(DesktopDatePicker)({
    color: 'blue',
    backgroundColor: 'aliceblue',
    borderRadius: '5px',
    width: "40%",
});


const schema = yup.object().shape({
    amount: yup.number().required().positive(),
    description: yup.string().max(255).notRequired(),
    taxRefund: yup.number().min(0).required(),
    recordDate: yup.date().default(() => new Date()),
    isDeductibleVAT: yup.boolean().required(),
    comment: yup.string().max(255).notRequired(),
    bucket: yup.string().max(25).notRequired(),
    // fixORvar: yup.string.max(5).required(),
})


export default function ExpenseRegistration() {
    const host = process.env.REACT_APP_API_BASE_URL;
    const [category, setCategory] = useState('');
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(dayjs(''));
    const apiEndpoint = `${host}/api/categoriesRegistration`;
    const bucketApiEndpoint = `${host}/api/bucket`;
    const { selectedCategory, setSelectedCategory, selectedCategory2, setSelectedCategory2, selectedCategory3, bucket, fixOrVar } = useContext(CategoryContext);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [openAlertError, setOpenAlertError] = useState(false);
    const [taxRefund, setTaxRefund] = useState("17");
    const [amount, setAmount] = useState(0);
    let categoryValue = selectedCategory3;
    let fatherValue = selectedCategory2;
    const fixOrVarData = [{ option: "קבועה", value: "fix" }, { option: "משתנה", value: "var" }]



    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async (data) => {

        try {

            if (selectedCategory3 == '') {
                categoryValue = selectedCategory2;
                fatherValue = selectedCategory;
            }
            const response = await Axios.post(`${host}/api/expenseRegistration`, {
                companyName: data.companyName,
                expenseDate: currentDate,
                amount: data.amount,
                description: data.description,
                taxRefund: data.taxRefund,
                recordDate: data.recordDate,
                category: categoryValue,
                // category: selectedCategory3,
                father: fatherValue,
                // father: selectedCategory2,
                primary: selectedCategory,
                isDeductibleVAT: data.isDeductibleVAT,
                comment: data.comment,
                fixOrVar: fixOrVar,
                bucket: bucket,
            }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            });

            if (response.status === 200) {
                setCurrentDate(dayjs(''));
                setOpenAlertSuccess(true);
                setTimeout(() => {
                    setOpenAlertSuccess(false)
                }, 5000);
            } else {
                setOpenAlertError(true);
                setTimeout(() => {
                    setOpenAlertError(false)
                }, 5000);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setOpenAlertError(true);
            setTimeout(() => {
                setOpenAlertError(false)
            }, 5000);
        }
    }
    return (

        <div className="expenseRegistration">
            <NavigationBar />
            <p id="bsd">בס"ד</p>
            <div className="title">רישום הוצאה</div>
            <div className="inputs">
                <form onSubmit={handleSubmit(submitForm)}>
                    <DropDownList

                        apiEndpoint={apiEndpoint}
                        father={"0"}
                        categoryType="ראשית"
                        categoryHirarchy="primary"
                    />
                    <br></br>

                    <DropDownList

                        apiEndpoint={apiEndpoint}
                        father={selectedCategory}
                        categoryType="משנית"
                        categoryHirarchy="secondary"
                    />
                    <br></br>

                    <DropDownList
                        apiEndpoint={apiEndpoint}
                        father={selectedCategory2}
                        categoryType="קצה"
                        categoryHirarchy='end'
                    />
                    <br></br>

                    <DropDownList
                        apiEndpoint={bucketApiEndpoint}
                        father="bucket"
                        categoryType="קבוצה"
                        categoryHirarchy='bucket'
                    />
                    <br></br>

                    <div id="mainWrapper">
                        <div className="expenseDatePicker">
                            <p id="expenseDate">{":תאריך הוצאה"}</p> &nbsp; &nbsp;
                            <CustomDesktopDatePicker
                                value={currentDate}
                                onChange={(newDate) => setCurrentDate(newDate)}
                                format="DD/MM/YYYY"
                                id="desktopDatePicker"
                            />
                        </div>

                        <div className="rowWrapper">
                            <p>{":סכום הוצאה"}</p> &nbsp; &nbsp;
                            <input
                                type="number"
                                name="amount"
                                defaultValue={amount}
                                placeholder="סכום הוצאה"
                                {...register("amount")}
                            />
                        </div>
                        <p className="errors">{errors.amount && "לא ניתן להזין מספר שלילי"}</p>

                        <div className="rowWrapper">
                            <p>{":תיאור"}</p> &nbsp; &nbsp;
                            <input
                                id="taxRufundInput"
                                type="text"
                                name="description"
                                placeholder="תיאור הוצאה (אופציונלי)"
                                {...register("description")}
                            />
                        </div>

                        <div className="rowWrapper">
                            <p>{":הערה"}</p> &nbsp; &nbsp;
                            <input
                                id="comment"
                                type="text"
                                name="comment"
                                placeholder="הערה (אופציונלי)"
                                {...register("comment")}
                            />
                        </div>

                        <div className="rowWrapper">
                            <p>{":החזר מעמ באחוזים"}</p> &nbsp; &nbsp;
                            <input
                                type="number"
                                name="taxRefund"
                                placeholder="החזר מעמ (באחוזים)"
                                defaultValue={taxRefund}
                                onChange={(e) => { setTaxRefund(e.target.value); }}
                                {...register("taxRefund")}
                            />
                        </div>
                        <p className="errors">{errors.taxRefund && "לא ניתן להזין מספר שלילי"}</p>

                        <div className="isDeductibleVAT">

                            <p>{`?מוכר מע"מ`}</p>
                            <label>
                                <input id="isDeductibleVATInput"
                                    type="checkbox"
                                    {...register("isDeductibleVAT")}
                                />
                            </label>

                        </div> <br></br>

                        <div className="rowWrapper" id="fixOrVarDiv">
                            <p>בחר סוג הוצאה משתנה/קבועה </p> <nbsp></nbsp>
                            <ColorToggleButton data={fixOrVarData} />
                        </div>

                        <input type="submit" id="submit" value={"שלח"} ></input>
                    </div>
                </form>
            </div>

            {openAlertSuccess && <MUIAlert severity="success" alertTitle="בוצע בהצלחה" />}
            {openAlertError && <MUIAlert severity="error" alertTitle="רישום נכשל" />}

        </div>

    )
}











