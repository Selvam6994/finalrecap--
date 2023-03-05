import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Home() {
  return (
    <div className="login">
      <h1>Welcome to the App</h1>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [formState,setFormState]=useState("success");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "Selvakumar",
      email: "selvakumar@gmail.com",
      password: "Selvakumar6994",
    },
    onSubmit: async (values) => {
      const data = await fetch("http://localhost:4000/mobileData/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (data.status == 401) {
        setFormState("error")
      } else {
        const result = await data.json();
        console.log(result);
        localStorage.setItem("token", result.token);
        navigate("/mobiles");
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Login</h2>
      <div className="login-section">
        <TextField
          value={values.username}
          onChange={handleChange}
          name="username"
          className="text-field"
          label="Username"
          type="text"
          variant="standard"
        />
        <TextField
          value={values.email}
          onChange={handleChange}
          name="email"
          className="text-field"
          label="Email"
          type="email"
          variant="standard"
        />
        <TextField
          value={values.password}
          onChange={handleChange}
          name="password"
          className="text-field"
          label="Password"
          type="password"
          variant="standard"
        />
        <Button color={formState} type="submit" variant="contained">
          {
            formState=="success"?"Submit":"Retry"
          }
        </Button>
      </div>
    </form>
  );
}
