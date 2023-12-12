import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import mainPageImage from "../assets/images/MainPage.png";
import cleanSlateImage from "../assets/images/cleanslateLogo.png";

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
    button: {
      margin: "10px",
    },
    mainPageImage: {
      marginTop: "50px",
      width: "600px",
      height: "600px",
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        {/* Combine the two sides without spacing */}
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
                />
                <br />
                <br />

                <input
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={handlePasswordChange}
                />
                <br />

                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#2525AD",
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
