import React, { useState } from "react";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

/**
 * @Ridampreet
 * @Signup
 **/

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 500,
    margin: "auto",
    width: "60%",
    paddingTop: 100
  },
  box: {
    marginTop: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  smallerBox: {
    marginTop: 30
  },
  form: {
    display: "grid",
    width: 400,
    gridRowGap: 20
  },
  signUp: {
    margin: "20px 0px 20px 0px"
  }
}));

export default function Signup() {
  const [passError, setpassError] = useState(false);
  const [fnameError, setfnameError] = useState(false);
  const [lnameError, setlnameError] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputEmail = data.get("email");
    const inputPassword = data.get("password");
    const inputName = data.get("firstName");
    const inputLName = data.get("lastName");
    const inputCPassword = data.get("cpassword");

    localStorage.setItem("FName", inputName);
    localStorage.setItem("LName", inputLName);
    localStorage.setItem("Email", inputEmail);

    if (
      !/[^a-zA-Z]/.test(inputName) &&
      !/[^a-zA-Z]/.test(inputLName) &&
      inputPassword.length >= 8 &&
      inputCPassword.length >= 8 &&
      inputCPassword == inputPassword &&
      inputEmail.includes("@")
    ) {
      navigate("/profile");
    } else {
      if (
        inputPassword != inputCPassword ||
        inputPassword < 8 ||
        inputCPassword < 8
      ) {
        alert("Error with the password");
        setpassError(true);
      }
      if (/[^a-zA-Z]/.test(inputName)) {
        alert("Error with the First name");
        setfnameError(true);
      }
      if (/[^a-zA-Z]/.test(inputLName)) {
        alert("Error with the Last name");
        setlnameError(true);
      }
    }
  };

  return (
    <div className={classes.container}>
      <Box className={classes.box}>
        <Typography variant="h5">New User</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className={classes.smallerBox}
        >
          <div className={classes.form}>
            <TextField
              label="First Name"
              fullWidth
              required
              autoFocus
              name="firstName"
              error={fnameError}
            />
            <TextField
              label="Last Name"
              fullWidth
              required
              name="lastName"
              error={lnameError}
            />
            <TextField label="Email Address" fullWidth required name="email" />
            <TextField
              label="Password"
              fullWidth
              required
              type="password"
              name="password"
              error={passError}
            />
            <TextField
              label="Confrim Password"
              fullWidth
              required
              type="password"
              name="cpassword"
              error={passError}
            />
          </div>
          <div className={classes.signUp}>
            <Button type="submit" fullWidth variant="contained">
              Sign Up
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
}
