import React from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import mainPageImage from "../assets/images/MainPage.png";
import cleanSlateImage from "../assets/images/Hat.png";

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
      "object-fit": "contain",
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        {/* Combine the two sides without spacing */}
        <Grid item xs={12} sm={6} sx={styles.container}>
          <Paper elevation={0} sx={styles.loginPaper}>
            <Typography variant="h2" sx={{fontWeight:"bold"}}>
              <img
                src={cleanSlateImage}
                alt="CleanSlate"
                style={{ width: "100%" }}
              ></img>
              CleanSlate
            </Typography>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
              }}
              style={{ marginTop: "50px", textDecoration: "none" }}
              component={Link}
              to="/login"
            >
              <Button
                variant="contained"
                style={{
                  marginLeft: "100px",
                  marginRight: "50px",
                  backgroundColor: "#2525AD",
                }}
                component={Link}
                to="/login"
              >
                Login As Student
              </Button>
              <Button variant="outlined">Login As Teacher</Button>
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
