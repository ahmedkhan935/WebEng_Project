import React from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import mainPageImage from "../Assets/Images/MainPage.png";
import cleanSlateImage from "../Assets/Images/Hat.png";
import "../Assets/Styles/MainPage.css";
import { Link } from "react-router-dom";
const MainPage = () => {
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
                style={{ width: "80%" }}
              ></img>
              <h1>CleanSlate</h1>
            </Typography>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
              }}
              style={{ marginTop: "50px" }}
            >
              <Button
                variant="contained"
                style={{
                  marginLeft: "220px",
                  marginRight: "50px",
                  backgroundColor: "#2525AD",
                  width: "150px",
                }}
                component={Link}
                to="/login"
              >
                Login
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
