import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import api from "./global";

function Signup() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("primary");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const postData = await fetch(
        `${api}/mobileData/signup`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (postData.status == 401) {
        setFormState("warning");
      } else {
        const result = await postData.json();
        console.log(result)
        navigate("/");
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Signup</h2>
      <div className="login-section">
        <TextField
          name="username"
          onChange={handleChange}
          className="text-field"
          label="Username"
          type="text"
          variant="standard"
        />
        <TextField
          name="email"
          onChange={handleChange}
          className="text-field"
          label="Email"
          type="email"
          variant="standard"
        />
        <TextField
          name="password"
          onChange={handleChange}
          className="text-field"
          label="Password"
          type="password"
          variant="standard"
        />

        <Button type="submit" color={formState} variant="contained">
          Submit
        </Button>
        {
            formState=="warning"?<h3>Invalid Credentials</h3>:""
        }
      </div>
    </form>
  );
}

export default Signup;
