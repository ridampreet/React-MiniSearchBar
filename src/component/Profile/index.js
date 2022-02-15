import { ButtonBase, Card, CardActions, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, CardActionArea, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 500,
    margin: "auto",
    width: "60%",
    paddingTop: 100,
    textAlign: "center"
  },
  photo: {
    maxWidth: 200,
    margin: "auto",
    width: "30%",
    paddingTop: 100,
    textAlign: "center"
  },
  search: {
    display: "grid",
    width: 400,
    gridRowGap: 20
  }
}));
export default function Profile() {
  const navigate = useNavigate();
  const [arrOfItems, setarrOffItems] = useState([]);
  const [searchInp, setsearchInp] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setsearchInp(event.target.value);
    console.log(searchInp);
  }

  useEffect(() => {
    // Update the document title using the browser API
    fetch("https://tutorial4-api.herokuapp.com/api/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setarrOffItems(data.data);
      });
  }, []);
  const handleClick = event => {
    event.preventDefault();
    alert("card clciked");
  };
  const fname = localStorage.getItem("FName");
  const lname = localStorage.getItem("LName");
  const email = localStorage.getItem("Email");
  const classes = useStyles();
  return (
    arrOfItems.length > 0 && (
      <div className={classes.container}>
        <div>
          <TextField
            autoFocus
            required
            fullWidth
            name="email"
            label="Email Address"
            onChange={handleChange}
          />
        </div>
        {arrOfItems
          .filter(user => {
            if (searchInp == "") {
              return user;
            } else if (
              user.firstName.toLowerCase().includes(searchInp) ||
              user.lastName.toLowerCase().includes(searchInp)
            ) {
              return user;
            }
          })
          .map(user => (
            <Card key={user.email} sx={{ minWidth: 275 }}>
              <CardActionArea onClick={() => navigate(`/details/${user?.id}`)}>
                <div className={classes.photo}>
                  <img src={user.picture} />
                </div>
                <Typography variant="h5" component="div">
                  First Name: {user.firstName}
                  <br />
                  Last Name: {user.lastName}
                  <br />
                  Email: {user.email}
                </Typography>
              </CardActionArea>
            </Card>
          ))}
      </div>
    )
  );
}
