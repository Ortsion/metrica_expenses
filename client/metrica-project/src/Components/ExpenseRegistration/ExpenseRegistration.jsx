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
})


export default function ExpenseRegistration() {

    const [category, setCategory] = useState('');
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(dayjs(''));
    const apiEndpoint = 'http://localhost:3008/api/categoriesRegistration';
    const { selectedCategory, setSelectedCategory, selectedCategory2, setSelectedCategory2, selectedCategory3 } = useContext(CategoryContext);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [openAlertError, setOpenAlertError] = useState(false);


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async (data) => {

        try {

            const response = await Axios.post("http://localhost:3008/api/expenseRegistration", {
                companyName: data.companyName,
                expenseDate: currentDate,
                amount: data.amount,
                description: data.description,
                taxRefund: data.taxRefund,
                recordDate: data.recordDate,
                category: selectedCategory3,
                father: selectedCategory2,
                primary: selectedCategory,
            }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            });

            if (response.status === 200) {
                setCurrentDate(dayjs(''));
                // setSelectedCategory('');
                // setSelectedCategory2('');
                setOpenAlertSuccess(true);
            } else {
                setOpenAlertError(true);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setOpenAlertError(true);
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
                            <p>{":החזר מעמ באחוזים"}</p> &nbsp; &nbsp;
                            <input
                                type="number"
                                name="taxRefund"
                                placeholder="החזר מעמ (באחוזים)"
                                value={17}
                                {...register("taxRefund")}
                            />
                        </div>
                        <p className="errors">{errors.taxRefund && "לא ניתן להזין מספר שלילי"}</p>

                        <input type="submit" id="submit" value={"שלח"} ></input>
                    </div>
                </form>
            </div>

            {openAlertSuccess && <MUIAlert severity="success" alertTitle="בוצע בהצלחה" />}
            {openAlertError && <MUIAlert severity="error" alertTitle="רישום נכשל" />}

        </div>

    )
}











