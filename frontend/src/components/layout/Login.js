import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/all";
import { RiLockPasswordFill } from "react-icons/all";
import "./Login.css";

import { clearErrors, login, register } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { useHistory } from "react-router-dom";

const Login = ({location}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const [isActive, setActive] = useState("false");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassWord, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const { error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loading = false;
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassWord));
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(register(myForm));
    for (var value of myForm.values()) {
      console.log(value);
   }
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const redirectLink = history.location.search ? history.location.search.split("=")[1] : "account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(redirectLink);
    }
  }, [dispatch, error, alert, isAuthenticated, history, redirectLink]);

  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              {/* Tabs Titles */}
              <h2
                className={`${isActive ? "active" : "inactive underlinehover"}`}
                onClick={handleToggle}
              >
                {" "}
                Sign Up{" "}
              </h2>
              <h2
                className={`${isActive ? "inactive underlinehover" : "active"}`}
                onClick={handleToggle}
              >
                Sign In{" "}
              </h2>
              {/* Icon */}
              <div className="fadeIn first">
                <img src="./images/logos.png" id="icon" alt="User Icon" />
              </div>
              {/* Login Form */}
              <section
                className={`login_form_holder ${isActive ? "hidden" : null}`}
              >
                <form onSubmit={loginSubmit}>
                  <input
                    type="email"
                    id="login"
                    className="fadeIn second"
                    name="login_email"
                    placeholder="Email"
                    autoComplete="off"
                    value={loginEmail}
                    required
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    id="password"
                    className="fadeIn third"
                    name="login_password"
                    placeholder="Password"
                    autoComplete="off"
                    value={loginPassWord}
                    required
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <input
                    type="submit"
                    className="fadeIn fourth"
                    value={"Log in"}
                  />
                </form>
              </section>

              <section
                className={`register_form_holder ${isActive ? null : "hidden"}`}
              >
                <form encType="multipart/form-data" onSubmit={registerSubmit}>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    className="fadeIn second"
                    onChange={registerDataChange}
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <input type="submit" value="Register" className="signUpBtn" />
                </form>
              </section>

              {/* Remind Passowrd */}
              <div id="formFooter">
                <a className="underlineHover" href="#">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
