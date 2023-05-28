import RegisterInput from "../input/registerInput";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User_infos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bDay: new Date().getDate(),
    bMonth: new Date().getMonth() + 1,
    bYear: new Date().getFullYear(),
    gender: "",
  };

  const [user, setUser] = useState(User_infos);
  const {
    first_name,
    last_name,
    email,
    password,
    bDay,
    bMonth,
    bYear,
    gender,
  } = user;
  console.log(user);
  const yearTemp = new Date().getFullYear();
  const handleRegister = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First Name?")
      .min(1, "First Name must be betwwen 1 and 16 characters.")
      .max(16, "First Name must be betwwen 1 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    last_name: Yup.string()
      .required("What's your Last Name?")
      .min(1, "First Name must be betwwen 1 and 16 characters.")
      .max(16, "First Name must be betwwen 1 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    email: Yup.string()
      .required(
        "You'll use this when you log in and if you ever need to reset your password"
      )
      .email("enter a valid email address"),
    password: Yup.string()
      .required(
        "Enter a combination of atleast six  numbers, letters and punctuation marks(such as ! and &)"
      )
      .min(8, "Password must be at least 8 characters long")
      .max(30, "Password cant be more than 30 characters"),
  });
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(" http://localhost:8000/register", {
        first_name,
        last_name,
        email,
        password,
        bDay,
        bMonth,
        bYear,
        gender,
      });
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bDay,
            bMonth,
            bYear,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let currentDate = new Date();
            let pickedDate = new Date(bYear, bMonth - 1, bDay);
            let atLeast14 = new Date(1970 + 14, 0, 1);
            if (currentDate - pickedDate < atLeast14) {
              setDateError(
                "It looks like you have entered the wrong info. Please mae sure that you use your real date of birth."
              );
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "Please choose a gender. You can change who can see this later."
              );
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          <Form className="register_form">
            <div className="reg_line">
              <RegisterInput
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={handleRegister}
              />
              <RegisterInput
                type="text"
                name="last_name"
                placeholder="Surname"
                onChange={handleRegister}
              />
            </div>
            <div className="reg_line">
              <RegisterInput
                type="text"
                name="email"
                placeholder="Email or Phone Number"
                onChange={handleRegister}
              />
            </div>
            <div className="reg_line">
              <RegisterInput
                type="password"
                name="password"
                placeholder="New Password"
                onChange={handleRegister}
              />
            </div>
            <div className="reg_col">
              <div className="reg_line_header">
                Date of birth <i className="info_icon"></i>
              </div>
              <DateOfBirthSelect
                bDay={bDay}
                bMonth={bMonth}
                bYear={bYear}
                months={months}
                years={years}
                days={days}
                handleRegister={handleRegister}
                dateError={dateError}
              />
            </div>
            <div className="reg_col">
              <div className="reg_line_header">
                Gender <i className="info_icon"></i>
              </div>
              <GenderSelect
                genderError={genderError}
                handleRegister={handleRegister}
              />
            </div>
            <div className="reg_infos">
              By clicking Sign Up, you agree to our{" "}
              <span>Terms, Data Policy &nbsp;</span>
              and <span>Cookie Policy.</span> You may receive SMS notifications
              from us and can opt out at any time.
            </div>
            <div className="reg_btn_wrapper">
              <button className="blue_btn open_signup">Sign Up</button>
            </div>
            <PulseLoader color="#1876f2" loading={loading} size={15} />
            {error && <div className="error_text">{error}</div>}
            {success && <div className="success_text">{success}</div>}
          </Form>
        </Formik>
      </div>
    </div>
  );
}
