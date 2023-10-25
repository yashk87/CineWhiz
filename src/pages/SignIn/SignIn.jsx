import { useState, React } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Typography from "@mui/material/Typography";
import axios from "axios";
const SignIn = () => {
  const [inputvalue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "email":
        if (!value || value.trim === "") {
          return "Email is required";
        } else {
          return "";
        }

      case "password":
        if (!value || value.trim === "") {
          return "Password is required";
        } else {
          return "";
        }

      default:
        return "";
    }
  };

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setError({ ...error, [name]: validate(name, value) });
    setInputValue({ ...inputvalue, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputvalue);
    let validationError = {};
    Object.keys(inputvalue).forEach((name) => {
      const error = validate(name, inputvalue[name]);
      if (error && error.length > 0) {
        validationError[name] = error;
      }
    });
    if (Object.keys(validationError).length > 0) {
      setError({ ...validationError });
    }
    LoginUser();
  };
  const LoginUser = async () => {
    try {
      const response = await axios.post("#");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container}>
            <h1 className={styles.login_head}>Login As</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={inputvalue.email.value}
              onChange={handleOnchange}
              required
              className={styles.input}
            />
            <Typography sx={{ color: "red", mb: 1 }}>{error.email}</Typography>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={inputvalue.password.value}
              onChange={handleOnchange}
              required
              className={styles.input}
            />
            <Typography sx={{ color: "red", mb: 1 }}>
              {error.password}
            </Typography>
            <button
              type="submit"
              className={styles.green_btn}
              onClick={handleSubmit}
            >
              Sing In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <img
            src="/argan_logo.png"
            alt="My Img"
            style={{
              width: "220px",
              height: "200px",
              borderRadius: "10px",
              backgroundColor: "white",
              marginBottom: "5%",
            }}
          />
          <Link to="/">
            <button type="button" className={styles.white_btn}>
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
