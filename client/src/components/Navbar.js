import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
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
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Announcement as AnnouncementIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  School as SchoolIcon
} from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { Link, useLocation } from "react-router-dom";


const drawerWidth = 240;
const standardOptions = [
  { title: "Home", Icon: <HomeIcon color="primary" />, linkto: "/student" },
  {
    title: "Threads",
    Icon: <AnnouncementIcon color="primary" />,
    linkto: "/student/threads",
  },
  { title: "Logout", Icon: <LogoutIcon color="primary" /> },
];

const adminOptions = [
  {
    title: "Settings",
    Icon: <SettingsIcon color="primary" />,
    linkto: "/admin/settings",
  },
  {
    title: "Landing Page",
    Icon: <HomeIcon color="primary" />,
    linkto: "/admin",
  },

  {
    title: "Deans List",
    Icon: <SettingsIcon color="primary" />,
    linkto: "/admin/list/deans",
  },
  {
    title: "Debar List",
    Icon: <SettingsIcon color="primary" />,
    linkto: "/admin/list/debar",
  },
  {
    title: "Medal Holders",
    Icon: <SettingsIcon color="primary" />,
    linkto: "/admin/list/medalHolders",
  },
  {
    title: "Rectors List",
    Icon: <SettingsIcon color="primary" />,
    linkto: "/admin/list/rectors",
  },
  {
    title: "Warning List",
    Icon: <SettingsIcon color="primary" />,
    linkto: "/admin/list/warning",
  },
  {
    title: "View Session Logs",
    Icon: <SettingsIcon color="primary" />,
    linkto: "/admin/viewLogs",
  },
  {
    title: "View Feedbacks",
    Icon: <SettingsIcon color="primary" />,
    linkto: "/admin/viewFeedbacks",
  },
];

const studentOptions = [
  {
    title: "Settings",
    Icon: <SettingsIcon color="primary" />,
    linkto: "/student/settings",
  },
  { title: "Assignments", Icon: <AssignmentIcon color="primary" /> },
  { title: "Classes", Icon: <SchoolIcon color="primary" />, linkto: '/student/classes' },
  { title: "Grades", Icon: <GradeIcon color="primary" /> },
  { title: "Feedback", Icon: <QuestionAnswerIcon color="primary" /> },
  { title: "Schedule", Icon: <ScheduleIcon color="primary" /> },
];

const teacherOptions = [
  {
    title: "Settings",
    Icon: <SettingsIcon color="primary" />,
    linkto: "/teacher/settings",
  },
  { title: "View Feedbacks", Icon: <RemoveRedEyeIcon color="primary" /> },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavBar({ children }) {
  const isStudent = useLocation().pathname.includes("/student");
  const isTeacher = useLocation().pathname.includes("/teacher");
  const isAdmin = useLocation().pathname.includes("/admin");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
        <List>
          {standardOptions.map((element, index) => (
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
        <Divider />
        <List>
          {isStudent &&
            studentOptions.map((element, index) => (
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
        <Divider />
        <List>
          {isAdmin &&
            adminOptions.map((element, index) => (
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
        <Divider />
        <List>
          {isTeacher &&
            teacherOptions.map((element, index) => (
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
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}{" "}
        {/* This is where the content of the page will be rendered */}
      </Box>
    </Box>
  );
}
