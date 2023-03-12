import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import api from "./global";

function Forgotpassword() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [otpTextfield, setOtpTextField] = useState(false);
  const [timer, setTimer] = useState();
  const formik_mail = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const send_email_to_resetPassword = await fetch(
        `${api}/mobileData/resetPassword`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (send_email_to_resetPassword.status == 401) {
        setMessage("Invalid credentials");
      } else {
        const result = await send_email_to_resetPassword.json();
        setMessage("");
        setOtpTextField(true);
        var count = 0;
        const timer = setInterval(() => {
          count++;
          setTimer(count);
          if (count === 20) {
            clearInterval(timer);
            setTimer("Otp expired");
          }
        }, 1000);
      }
    },
  });
  const formik_otp = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: async (values) => {
      const get_otp = await fetch(`${api}/mobileData/otp`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (get_otp.status == 200) {
        const result = await get_otp.json();
        localStorage.setItem("otptoken", result.token);
        navigate(`/${formik_mail.values.email}/updatepassword`);
      } else {
        setMessage("Invalid credentials");
      }
    },
  });
  return (
    <div>
      <h2>Reset password</h2>
      {otpTextfield == false ? (
        <form onSubmit={formik_mail.handleSubmit} className="form">
          <TextField
            name="email"
            onChange={formik_mail.handleChange}
            value={formik_mail.values.email}
            id="standard-basic"
            label="Valid email"
            variant="standard"
          />
          <Button type="submit" variant="outlined">
            Generate OTP
          </Button>
        </form>
      ) : (
        <form onSubmit={formik_otp.handleSubmit} className="form">
          <TextField
            name="otp"
            onChange={formik_otp.handleChange}
            value={formik_otp.values.otp}
            id="standard-basic"
            label="OTP"
            variant="standard"
          />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </form>
      )}

      <h3>{timer}</h3>
      <h2>{message}</h2>
    </div>
  );
}

export default Forgotpassword;
