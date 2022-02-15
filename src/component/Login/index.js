import React from "react";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { axios } from "axios";
import { useState } from "react";

/**
 * @Ridampreet
 * @Login
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
  signIn: {
    margin: "20px 0px 20px 0px"
  },
  forgotPassword: {
    display: "grid",
    placeContent: "space-between",
    gridAutoFlow: "column"
  }
}));

export default function Login() {
  const [permission, setpermission] = useState("");
  const [arrOfItems, setarrOffItems] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const uname = data.get("email");
    // const password = data.get("password");
    const email = "jonsnow@westeros.com";
    const password = "G@me0fthr0ne5";
    const creds = { email, password };
    let loginStatus = "";
    let resultant = await getResultant(creds);
    if (resultant?.status == true) {
      navigate("/profile");
    }

    // var stat = resultant.then(data => {
    //   console.log(data.message);
    //   setpermission(JSON.stringify(data.status));
    // });

    // if (permission == "true") {
    //   navigate("/profile");
    // }
    // fetch("https://tutorial4-api.herokuapp.com/api/users/", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setarrOffItems(data.data);
    //   });
  };

  function getResultant(creds) {
    return fetch("https://tutorial4-api.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data;
      });
  }

  return (
    <div className={classes.container}>
      <Box className={classes.box}>
        <Typography component="h1" variant="h5">
          SIGN IN
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className={classes.smallerBox}
        >
          <div className={classes.form}>
            <TextField
              autoFocus
              required
              fullWidth
              name="email"
              label="Email Address"
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
            />
          </div>
          <div className={classes.signIn}>
            <Button type="submit" fullWidth variant="contained">
              Sign In
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
}
