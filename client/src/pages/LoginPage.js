import React from "react";
import { useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import mainPageImage from "../assets/images/MainPage.png";
import cleanSlateImage from "../assets/images/Hat.png";
import theme from "../temp/theme/theme.js";
import { studentlogin, teacherLogin } from "../services/AuthService.js";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../store/store";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {userRole,setUserRole}=useStore();
  

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
    let resp;
    const student = location.pathname.includes("student");

    if (student) resp = await studentlogin(email, password);
    else resp = await teacherLogin(email, password);
    if (resp.status === 200) {
      console.log("Login Successful");
      /*change here when teacher ui is done*/
      if (student)
      {
        console.log(userRole);
        setUserRole("student");
        console.log(userRole);
        navigate("/student");
      }
      else{
         setUserRole("teacher");
        navigate("/teacher");
      }
    } else if (resp.status === 200 && !student) {
      //navigate to teacher page
    }
    else {
      const data = await resp.json();
      setErrorMessage(data.errorMessage);
    }
  };

  const isScreenSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    loginPaper: {
      padding: "20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      width: "100%", // Full width on smaller screens
      padding: "5px",
      height: "20px",
      borderRadius: "5px",
    },
    button: {
      margin: "10px",
    },
    mainPageImage: {
      marginTop: "40px",
      width: "100%",
      height: "auto",
      display: isScreenSmall ? "none" : "block", // Hide on smaller screens
    },
    inputContainer: {
      width: isScreenSmall ? "80%" : "60%", // Adjust width on smaller screens
      maxWidth: "400px", // Limit maximum width
    },
  };

  return (
    <Box sx={{ flexGrow: 1 } }>
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
            >
              <form onSubmit={handleSubmit}>
                <Container style={styles.inputContainer}>
                  <Stack>
                    <TextField
                      type="email"
                      value={email}
                      label="Email"
                      onChange={handleEmailChange}
                      id="courseCode"
                      margin="normal"
                      sx={styles.input}
                    />
                    <br />
                    <TextField
                      type="password"
                      value={password}
                      label="Password"
                      onChange={handlePasswordChange}
                      id="courseCode"
                      sx={styles.input}
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
