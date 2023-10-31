import React from "react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
function Emailverify() {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:3000/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);
  return (
    <>
      {validUrl ? (
        <div className={styles.container}>
          <img
            src="/success.png"
            alt="success_img"
            className={styles.success_img}
          />
          <h1>Email verified successfully</h1>
          <img src="/success.png" alt="My Img" className={styles.success_img} />
          <Link to="/sign-in">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
}

export default Emailverify;
