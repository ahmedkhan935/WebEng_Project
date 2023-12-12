import React from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import mainPageImage from "../Images/MainPage.png";
import cleanSlateImage from "../Images/Hat.png";

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
      width: "100%",
      height: "100%",
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        {/* Combine the two sides without spacing */}
        <Grid item xs={12} sm={6} sx={styles.container}>
          <Paper elevation={0} sx={styles.loginPaper}>
            <Typography variant="h5" >
              <img src={cleanSlateImage} alt="CleanSlate" style={{ width: "100%" }} ></img>
              CleanSlate
            </Typography>
            <Container sx={{display:"flex",flexDirection:"row"}}>
            <Button variant="contained" color="primary" sx={styles.button}>
              Login as Teacher
            </Button>
            <Button variant="contained" color="secondary" sx={styles.button}>
              Login as Student
            </Button>
            </Container>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} sx={styles.container}>
          <Paper elevation={0}>
            <img src={mainPageImage} alt="Main Page" style={styles.mainPageImage} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;
