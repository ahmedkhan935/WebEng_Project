import React from "react";
import { useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import mainPageImage from "../assets/images/MainPage.png";
import cleanSlateImage from "../assets/images/Hat.png";
import theme from "../assets/theme/theme.js";
import Stack from "@mui/material/Stack";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
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
    input: {
      width: "60%",
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
                marginBottom: "100px",
              }}
              style={{ marginTop: "50px" }}
            >
              <form onSubmit={handleSubmit}>
                <Container sx={styles.input}>
                  <Stack>
                    <TextField
                      type="email"
                      value={email}
                      label="Email"
                      onChange={handleEmailChange}
                      id="courseCode"
                      margin="normal"
                    />
                    <TextField
                      type="password"
                      value={password}
                      label="Password"
                      onChange={handlePasswordChange}
                      id="courseCode"
                      margin="normal"
                    />
                  </Stack>
                </Container>

                <br />

                <Button
                  variant="contained"
                  style={{
                    background: theme.palette.secondary,
                    marginTop: "20px",
                    width: "200px",
                  }}
                >
                  Sign In
                </Button>
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
