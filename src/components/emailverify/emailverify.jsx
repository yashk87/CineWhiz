import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.css";
function Emailverify() {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  useEffect(() => {
    console.log("Helo");

    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:3000/route/employee/${param.id}/verify/${param.token}`;
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
