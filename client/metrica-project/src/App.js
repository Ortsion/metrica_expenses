import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateUser from "./Components/CreateUser/CreateUser";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import CategoriesRegistration from "./Components/CategoriesRegistration/CategoriesRegistration";
import { CategoryContext } from "./contexts/categoryContext";
import { useState } from "react";
import ExpenseRegistration from "./Components/ExpenseRegistration/ExpenseRegistration";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NavigationBar from "./Components/NavigationBar/NavigationBar";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState({});
  const [selectedCategory3, setSelectedCategory3] = useState({});
  const [refreshDropdown, setRefreshDropdown] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <CategoryContext.Provider
          value={{
            selectedCategory,
            setSelectedCategory,
            selectedCategory2,
            setSelectedCategory2,
            selectedCategory3,
            setSelectedCategory3,
            refreshDropdown,
            setRefreshDropdown,
            openAlertSuccess,
            setOpenAlertSuccess,
            openAlertError,
            setOpenAlertError,
          }}
        >
          {/* <NavigationBar/> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/categoryRegistration"
              element={<CategoriesRegistration />}
            />
            <Route
              path="/expenseRegistration"
              element={<ExpenseRegistration />}
            />
          </Routes>
        </CategoryContext.Provider>
      </div>
    </LocalizationProvider>
  );
}

export default App;
