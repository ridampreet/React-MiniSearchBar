import { ButtonBase, Card, CardActions, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, CardActionArea, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

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
  
}));

export default function Items() {
  const [user, setuser] = useState("");
  const { id } = useParams();
  const classes = useStyles();
  useEffect(() => {
    // Update the document title using the browser API
    fetch("https://tutorial4-api.herokuapp.com/api/users/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setuser(data.data);
      });
  }, []);

  console.log(user);
  return (
    <div>
      
      <Card key={user.email} sx={{ minWidth: 275 }}>
        <CardActionArea>
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
    </div>
  );
}
