import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { json } from "react-router-dom";

function Forgotpassword() {
  const [message, setMessage] = useState("");
  const [otpTextfield, setOtpSetField] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const send_email_to_resetPassword = await fetch(
        "http://localhost:4000/mobileData/resetPassword",
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
        setOtpSetField(true);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <h2>Reset password</h2>
      <TextField
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        id="standard-basic"
        label="Valid email"
        variant="standard"
      />
      {
        (otpTextfield == true ? (
          <TextField
            name="otp"
            // onChange={formik.handleChange}
            // value={formik.values.email}
            id="standard-basic"
            label="OTP"
            variant="standard"
          />
        ) : (
          ""
        ))
      }
      <Button type="submit" variant="outlined">
        {
          otpTextfield==false?"Generate OTP" : "Submit"
        }
      </Button>
      <h2>{message}</h2>
    </form>
  );
}

export default Forgotpassword;
