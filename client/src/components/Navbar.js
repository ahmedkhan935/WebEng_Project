import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  alpha,
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
  Grade as GradeIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Announcement as AnnouncementIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  School as SchoolIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  EventAvailable as EventAvailableIcon,
  FormatListNumbered as FormatListNumberedIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  VpnKey as VpnKeyIcon,
} from "@mui/icons-material";

//zustand
import useStore from "../store/store";
import { Link, useLocation } from "react-router-dom";
import {logout} from '../services/AuthService';
import LogoImage from '../assets/images/logo.png'
import { DrawerHeader,AppBar, Drawer} from "../assets/theme/StyledComponents";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box sx={{
      position: 'static',
      bottom: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      paddingTop: '40px',
      paddingBottom: '40px',
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      marginTop: 'auto'
    }}>
      <img src={LogoImage} alt="Logo" style={{ width: '30px', height: '30px' }} />
      <Typography variant="body1" sx={{ color: theme.palette.primary.main }}>
        © 2023 Clean Slate Inc.
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" >
        github.com/cleanSlate
      </Typography>
    </Box>
  );
};

const adminOptions = [
  {
    title: "Assign Courses",
    Icon: <AssignmentTurnedInIcon color="primary" />,
    linkto: "/admin/assignCourses",
  },
  {
    title: "Admin Lists",
    Icon: <FormatListNumberedIcon color="primary" />,
    linkto: "/admin/lists",
  },
  {
    title: "View Session Logs",
    Icon: <VpnKeyIcon color="primary" />,
    linkto: "/admin/viewLogs",
  },
  {
    title: "View Feedbacks",
    Icon: <SettingsIcon color="primary" />,
    linkto: "/admin/viewFeedbacks",
  },
];

const studentOptions = [
  { title: "Assignments", Icon: <AssignmentIcon color="primary" /> },
  {
    title: "Classes",
    Icon: <SchoolIcon color="primary" />,
    linkto: "/student/classes",
  },
  { title: "Grades", Icon: <GradeIcon color="primary" /> },

  { title: "Attendance", Icon: <EventAvailableIcon color="primary" /> },
  { title: "Schedule", Icon: <ScheduleIcon color="primary" /> },
];

const teacherOptions = [
  {
    title: "Classes",
    Icon: <SchoolIcon color="primary" />,
    linkto: "/teacher/classes",
  },
  { title: "View Feedbacks", Icon: <RemoveRedEyeIcon color="primary" /> },
];




export default function NavBar({ children }) {
  const { setDarkMode } = useStore();

  const location = useLocation();
  let userRole = location.pathname.split("/")[1];
  userRole = userRole.toLowerCase();

  //checking if pathname includes the word was buggy, as it detected isStudent=true for /admin/lists/students, so i changed it
  const isStudent = userRole === "student";
  const isAdmin = userRole === "admin";
  const isTeacher = userRole === "teacher";

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const logouts = () => {
    setDarkMode(false);
    logout();
  }


    
 

  const standardOptions = [
    {
      title: "Home",
      Icon: <HomeIcon color="primary" />,
      linkto: "/" + userRole,
    },
    {
      title: "Threads",
      Icon: <AnnouncementIcon color="primary" />,
      linkto: "/" + userRole + "/threads",
    },
    {
      title: "Settings",
      Icon: <SettingsIcon color="primary" />,
      linkto: "/" + userRole + "/settings",
    },
    { title: "Logout", Icon: <LogoutIcon color="primary" />, linkto: "/",onClick: logouts },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Navbar (Top bar) with button to open drawer */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CleanSlate
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* List of Standard options in the sidebar */}
        <List>
          {standardOptions.map((element, index) => (
            <ListItem
              key={element.title}
              disablePadding
              sx={{ display: "block" }}
              onClick={element.onClick}
            >
              <ListItemButton
                component={element.linkto ? Link : "div"}
                to={element.linkto || ""}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {standardOptions[index].Icon}
                </ListItemIcon>
                <ListItemText
                  primary={element.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {isStudent && (
          <>
            <Divider />
            <List>
              {studentOptions.map((element, index) => (
                <ListItem
                  key={element.title}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    to={element.linkto || ""}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {studentOptions[index].Icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={element.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        ) }
        {isAdmin && (
          <>
            <Divider />
            <List>
              {adminOptions.map((element, index) => (
                <ListItem
                  key={element.title}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    component={element.linkto ? Link : "div"}
                    to={element.linkto || ""}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {adminOptions[index].Icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={element.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        ) }
        {isTeacher &&(
          <>
            <Divider />
            <List>
              {teacherOptions.map((element, index) => (
                <ListItem
                  key={element.title}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    component={element.linkto ? Link : "div"}
                    to={element.linkto || ""}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {teacherOptions[index].Icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={element.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        ) }
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
    <DrawerHeader />
        <Box sx={{ p: 3 }}>
          {children}
          {/* This is where the content of the page will be rendered */}
        </Box>
        <Footer />
      </Box>
     
    </Box>
  );
}


