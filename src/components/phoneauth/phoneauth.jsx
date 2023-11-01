import { React, useState } from "react";
import { Button } from "@mui/material";
function PhoneAuth() {
  const [phone_number, setPhoneNumber] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");

  async function sendCode() {
    await fetch(`${process.env.REACT_APP_API}/route/employee/send-code`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number: phone_number }),
    }).then((response) => {
      console.log(response);
      if (response.ok === true) {
        alert("Verification code sent successfully");
        setCodeSent(true);
      } else alert("Oh no we have an error");
    });
  }
  async function verifyCode() {
    await fetch(`${process.env.REACT_APP_API}/route/employee/verify-code`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number: phone_number, code: code }),
    }).then((response) => {
      console.log(response);
      if (response.ok === true) {
        alert("Number verified successfully");
      } else alert("Oh no we have an error");
    });
  }

  return !codeSent ? (
    <div>
      <input
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={styles.input}
        placeholder="Enter your phone number "
      />
      <br></br>
      <Button
        className="px-4 py-2 text-base bg-blue-500 text-white rounded-lg"
        type="submit"
        variant="contained"
        color="primary"
        fullWidth={false}
        margin="normal"
        onClick={async () => await sendCode()}
      >
        Code send via sms
      </Button>
    </div>
  ) : (
    <div>
      <input
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code"
        style={styles.input}
      ></input>
      <br></br>
      <Button
        className="px-4 py-2 text-base bg-blue-500 text-white rounded-lg"
        type="submit"
        variant="contained"
        color="primary"
        fullWidth={false}
        margin="normal"
        onClick={async () => await verifyCode()}
      >
        Verify code
      </Button>
    </div>
  );
}

const styles = {
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 500,
    height: 50,
    margin: 10,
    fontSize: 15,
    borderRadius: 5,
    fontFamily: "Arial",
    border: "1px solid black",
  },
  registerButton: {
    width: 500,
    height: 50,
    backgroundColor: "purple",
    color: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    fontWeight: "bold",
    fontFamily: "Sans-Serif",
  },
};
export default PhoneAuth;
