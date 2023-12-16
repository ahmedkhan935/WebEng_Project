import React from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import mainPageImage from "../assets/images/MainPage.png";
import cleanSlateImage from "../assets/images/Hat.png";
import theme from "../assets/theme/theme.js";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainPage = () => {
  const isScreenSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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

    mainPageImage: {
      marginTop: "50px",
      width: "600px",
      height: "600px",
      objectFit: "contain",
      objectFit: "contain",
      display: isScreenSmall ? "none" : "block", // Hide on smaller screens
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} sx={styles.container}>
          <Paper elevation={0} sx={styles.loginPaper}>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              <img
                src={cleanSlateImage}
                alt="CleanSlate"
                style={{ width: "100%" }}
              />
              CleanSlate
            </Typography>
            <Container
              sx={{
                display: "flex",
                flexDirection: isScreenSmall ? "column" : "row",
                marginBottom: "20px",
              }}
              style={{
                marginTop: "50px",
                textDecoration: "none",
                marginLeft: isScreenSmall ? "10" : "100px",
                marginRight: isScreenSmall ? "10" : "50px",
              }}
              component={Link}
              to="/login"
            >
              <Button
                variant="contained"
                style={{
                  marginBottom: isScreenSmall ? "10px" : "0",
                  background: theme.palette.secondary,
                  width: isScreenSmall ? "100%" : "auto",
                  marginLeft: isScreenSmall ? "0" : "100px",
                  marginRight: isScreenSmall ? "10" : "50px",
                }}
                component={Link}
                to={{
                  pathname: "/login/student",
                }}
              >
                Login As Student
              </Button>

              <Button
                variant="outlined"
                style={{
                  width: isScreenSmall ? "100%" : "auto", // Full width on smaller screens
                }}
                component={Link}
                to={{
                  pathname: "/login/teacher",
                }}
              >
                Login As Teacher
              </Button>
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

export default MainPage;
