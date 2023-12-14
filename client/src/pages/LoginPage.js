import React from "react";
import { useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

import mainPageImage from "../assets/images/MainPage.png";
import cleanSlateImage from "../assets/images/Hat.png";
import theme from "../assets/theme/theme.js";
import { studentlogin } from "../services/AuthService.js";
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    event.preventDefault();
    const resp=await studentlogin(email,password);
    console.log(resp);
    const data=await resp.json();
    if(resp.status===200){
      console.log("Login Successful");
      console.log(data);
      navigate("/student");
    }
    else{
      setErrorMessage(data.message);
    }
  };

  const styles = {
    container: {
      display: "flex",
    },
    loginPaper: {
      padding: "20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      width: "300px",
      padding: "5px",
      height: "25px",
      borderRadius: "5px",
    },
    button: {
      margin: "10px",
    },
    mainPageImage: {
      marginTop: "50px",
      width: "550px",
      height: "550px",
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} sx={styles.container}>
          <Paper elevation={0} sx={styles.loginPaper}>
            <Typography variant="h5">
              <img
                src={cleanSlateImage}
                alt="CleanSlate"
                style={{ width: "60%" }}
              ></img>
              <h1>CleanSlate</h1>
            </Typography>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
              style={{ marginTop: "50px" }}
            >
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  placeholder="email"
                  onChange={handleEmailChange}
                  style={styles.input}
                />
                <br />
                <br />

                <input
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={handlePasswordChange}
                  style={styles.input}
                />
                <br />

                <Button
                  variant="contained"
                  style={{
                    background: theme.palette.secondary,
                    marginTop: "20px",
                    width: "200px",
                  }}
                  onClick={handleSubmit}
                  
                >
                  Sign In
                </Button>
                <p>{ErrorMessage}</p>
              </form>
            </Container>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} sx={styles.container}>
          <Paper elevation={0}>
            <img
              src={mainPageImage}
              alt="Main Page"
              style={styles.mainPageImage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
