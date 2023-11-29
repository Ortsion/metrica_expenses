import React, { useState } from "react";
import "./CreateUser.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import MUIAlert from "../../MUI/MUIAlert/MUIAlert";


const schema = yup.object().shape({
    companyName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
    date: yup.date().default(() => new Date()),
});

export default function CreateUser() {
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async (data) => {
        try {
            const response = await Axios.post(
                "http://localhost:3008/api/userRegister",
                {
                    companyName: data.companyName,
                    email: data.email,
                    password: data.password,
                    token: data.confirmPassword,
                    date: data.date,
                }
            );

            if (response.status === 200) {
                console.log(
                    "Registration successful! data from create user sever: ",
                    "response.data.token: ",
                    response.data.token,
                    "response.data.id: ",
                    response.data.id
                );
                alert("רישום חברה בוצע בהצלחה");
                // setOpenAlert(true);
                localStorage.setItem("token", response.data.token);
                navigate('/expenseRegistration');
            } else {
                console.log("Registration failed");
                alert("רישום חברה נכשל, אנא פנה לאחראי");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("רישום חברה נכשל, אנא פנה לאחראי");
        }
    };

    return (
        <div className="careateUserForm">
            <p id="bsd">בס"ד</p>
            <div className="title">רישום חברה</div>
            <div className="inputs">
                <form onSubmit={handleSubmit(submitForm)}>
                    <input
                        type="text"
                        name="companyName"
                        placeholder="שם החברה"
                        {...register("companyName")}
                    />
                    <p className="errors">{errors.companyName?.message}</p>

                    <input
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        {...register("email")}
                    />
                    <p className="errors">{errors.email?.message}</p>

                    <input
                        type="password"
                        name="password"
                        placeholder="סיסמה"
                        {...register("password")}
                    />
                    <p className="errors">{errors.password?.message}</p>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="אימות סיסמה"
                        {...register("confirmPassword")}
                    />
                    <p className="errors">
                        {errors.confirmPassword && "Passwords Should Mutch"}
                    </p>

                    <input type="submit" id="submit" value={"שלח"}></input>
                </form>
            </div>

            {/* <Collapse in={openAlert}>
                <Alert
                    severity="error"
                    action={<IconButton onClick={() => { setOpenAlert(false) }}>
                        <CloseIcon></CloseIcon>
                    </IconButton>}
                >
                    <AlertTitle>Success </AlertTitle>
                </Alert>
            </Collapse> */}
            {openAlert && <MUIAlert severity="error" alertTitle="Error" content="something wenr wrong!" />}
        </div>
    );
}

// export default function CreateUser() {

//     const [companyName, setCompanyName] = useState();
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();
//     const [token, setToken] = useState();
//     return (
//         <div>

//             <label>Company Name</label>
//             <input name='companyName' type="text" placeholder='Company Name' onChange={(event) => { setCompanyName(event.target.value) }} />

//             <label>E-mail</label>
//             <input name='Email' type="text" placeholder='E-mail' onChange={(event) => { setEmail(event.target.value) }} />

//             <label>Password</label>
//             <input name='password' type="password" placeholder='Password' onChange={(event) => { setPassword(event.target.value) }} />

//             <label>Token</label>
//             <input name='token' type="text" placeholder='Token' onChange={(event) => { setToken(event.target.value) }} />

//             <button onClick={submitHandle}>Submit</button>

//         </div>
//     )
// }
