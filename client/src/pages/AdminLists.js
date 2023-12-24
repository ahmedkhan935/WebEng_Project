import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  alpha,
  Grid,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import StarIcon from "@mui/icons-material/Star";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import NavBar from "../components/Navbar";
import { useTheme } from "@mui/material/styles";

const lists = [
  {
    name: "Rectors List",
    icon: <EmojiEventsIcon color="secondary" fontSize="large" />,
    path: "rectors",
  },
  {
    name: "Medal Holders",
    icon: <MilitaryTechIcon color="secondary" fontSize="large" />,
    path: "medalHolders",
  },
  {
    name: "Deans List",
    icon: <StarIcon color="secondary" fontSize="large" />,
    path: "deans",
  },
  {
    name: "Debar List",
    icon: <BlockOutlinedIcon color="secondary" fontSize="large" />,
    path: "debar",
  },
  // { name: 'Warning List', icon: <ErrorIcon color="secondary" fontSize="large" />, path: 'warning' },
  {
    name: "Teachers List",
    icon: <SportsMartialArtsIcon color="secondary" fontSize="large" />,
    path: "teachers",
  },
  {
    name: "Students List",
    icon: <GroupsIcon color="secondary" fontSize="large" />,
    path: "students",
  },
];

function AdminLists() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <NavBar>
      <Container>
        <Typography variant="h5" sx={{ width: "100%", marginBottom: "10px" }}>
          Important Lists
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ width: "100%", marginBottom: "10px" }}
        >
          Click on any list to view details.
        </Typography>
        <Grid container spacing={2}>
          {lists.map((list, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.95),
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/admin/list/${list.path}`)}
                >
                  <CardContent>
                    {list.icon}
                    <Typography variant="h5" component="div" color="white">
                      {list.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </NavBar>
  );
}

export default AdminLists;
