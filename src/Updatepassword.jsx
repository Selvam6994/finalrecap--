import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

function updatepassword() {
  const navigate = useNavigate();
  const { email } = useParams();
  const formik_update_password = useFormik({
    initialValues: {
      newPassword: "",
      password: "",
    },
    onSubmit: async (values) => {
      const updatePassword = await fetch(
        `http://localhost:4000/mobileData/${email}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json",
         "x-auth-tokenotp": localStorage.getItem("otptoken") 
        },
          body: JSON.stringify(values),
        }
      );

      const result = await updatePassword.json();
      navigate("/");
      console.log(result);
    },
  });
  return (
    <form onSubmit={formik_update_password.handleSubmit} className="form">
      <TextField
        onChange={formik_update_password.handleChange}
        name="newPassword"
        value={formik_update_password.values.newPassword}
        id="standard-basic"
        label="New Password"
        variant="standard"
        type="password"
      />
      <TextField
        onChange={formik_update_password.handleChange}
        name="password"
        value={formik_update_password.values.password}
        id="standard-basic"
        label="Confirm Password"
        variant="standard"
        type="password"
      />
      <Button
        type="submit"
        disabled={
          formik_update_password.values.newPassword ===
          formik_update_password.values.password
            ? false
            : true
        }
        variant="outlined"
      >
        Submit
      </Button>
    </form>
  );
}

export default updatepassword;
