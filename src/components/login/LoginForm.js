import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoginInput from "../../components/input/loginInput";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Login_infos = {
  email: "",
  password: "",
};
export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(Login_infos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("enter a valid email")
      .max(100),
    password: Yup.string().required("Password is required"),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      const { message, ...rest } = data;
      dispatch({ type: "LOGIN", payload: rest });
      Cookies.set("user", JSON.stringify(rest));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="#" />
        <span>
          Facebook helps you connect and share with the people in your life
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(Formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>

          <Link to="/reset" className="forgot_password">
            Forgotten Password ?
          </Link>
          <PulseLoader color="#1876f2" loading={loading} size={10} />

          {error && <div className="error_text">{error}</div>}
          <div className="splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a page</b> for a celebrity, brand or business
        </Link>
      </div>
    </div>
  );
}
