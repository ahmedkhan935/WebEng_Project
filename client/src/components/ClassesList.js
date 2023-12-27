import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { Typography, Button, Box } from "@mui/material";
import { getClasses as getStudentClasses, getOldClasses } from "../services/StudentService";
import { getClasses as getTeacherClasses } from "../services/TeacherService";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import useStore from "../store/store";

function ClassesList({ isFullList, oldList }) {
  const [classes, setClasses] = useState([]);
  const [classesError, setClassesError] = useState(null);
  const [classesFetched, setClassesFetched] = useState(false); //To check if classes have been fetched or no

  const location = useLocation();
  const { userRole } = useStore();

  let classesUrl = "/" + userRole + "/classes";

  useEffect(() => {
    if (userRole == "student") {
      if (!oldList) {
        getStudentClasses()
          .then((data) => {
            handleData(data);
          });
      }
      else {
        getOldClasses()
          .then((data) => {
            handleData(data);
          });
      }
    } else if (userRole == "teacher") {
      getTeacherClasses().then((data) => {
        handleData(data);
      });
    }
  }, []);

  const handleData = (data) => {
    if (data.error) {
      //data contains an erorr property
      setClassesError(data.error);
      alert(data.error);

      setClassesFetched(true);
      return;
    } else {
      setClasses(data.data);
      console.log(classes);
      setClassesFetched(true);
      console.log(data.data);
    }
  };

  if (classesError) {
    return (
      <Typography variant="subtitle" color="warning">
        Sorry! An error occurred.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        marginBottom: "20px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <Typography variant="h5" sx={{ width: "100%", marginBottom: "0px" }}>
          {oldList ? "Your past classes" : "Your ongoing classes"}
        </Typography>

        {!classesFetched ? (
          <Grid container spacing={2}>
            {Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" width="100%" height={200} />{" "}
                <Skeleton height={40} />
                <Skeleton width="60%" height={40} />{" "}
              </Grid>
            ))}
          </Grid>
        ) : ((classes && classes.length == 0) || !classes) ? (
          <Typography variant="subtitle">No classes found.</Typography>
        ) : classesError ? (
          <Typography variant="subtitle" color="warning">
            Sorry! An error occurred.
          </Typography>
        ) : (

          ((isFullList) ? classes : classes.slice(0, 3)).map((classroom) => {
            return (
              <ClassCard classroom={classroom} key={classroom.code}></ClassCard>
            );
          })
        )}
      </Container>
      {(classes && classes.length > 3) ? (
        <Button
          variant="contained"
          sx={{ alignSelf: "flex-end", marginRight: "22px", marginTop: "10px" }}
          component={Link}
          to={classesUrl}
        >
          View All
        </Button>
      ) : null}
    </Box>
  );
}

export default ClassesList;
