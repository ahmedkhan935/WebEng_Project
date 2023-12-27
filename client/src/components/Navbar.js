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
  Avatar,
  Menu,
  MenuItem,
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
  Checklist as ChecklistIcon,
  Person as PersonIcon,
  AccountCircle as AccountCircleIcon,
  History as HistoryIcon,
} from "@mui/icons-material";

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState, useEffect } from "react";

//zustand
import useStore from "../store/store";
import { Link, useLocation } from "react-router-dom";
import { logout } from '../services/AuthService';
import LogoImage from '../assets/images/logo.png'
import { DrawerHeader, AppBar, Drawer } from "../assets/theme/StyledComponents";
import Footer from "./Footer";
import useTheme from "@mui/material/styles/useTheme";
import { useNavigate } from "react-router-dom";

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
  {
    title: "Attendance",
    Icon: <ChecklistIcon color="primary" />,
    linkto: '/student/attendance'
  },
  {
    title: "Classes",
    Icon: <SchoolIcon color="primary" />,
    linkto: "/student/classes",
  },
  {
    title: "Transcript",
    Icon: <GradeIcon color="primary" />,
    linkto: "/student/transcript"
  },

  {
    title: "Schedule",
    Icon: <EventAvailableIcon color="primary" />,
    linkto: "/student/schedule"
  },
  {
    title: "Old Classes",
    Icon: <HistoryIcon color="primary" />,
    linkto: "/student/oldclasses"
  },
];

const teacherOptions = [
  {
    title: "Classes",
    Icon: <SchoolIcon color="primary" />,
    linkto: "/teacher/classes",
  },
];




export default function NavBar({ children }) {
  const { setDarkMode, setUserRole,userRole } = useStore();

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  //checking if pathname includes the word was buggy, as it detected isStudent=true for /admin/lists/students, so i changed it
  const isStudent = userRole === "student";
  const isAdmin = userRole === "admin";
  const isTeacher = userRole === "teacher";
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const logouts = () => {
    let confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;
    setUserRole(null);
    localStorage.removeItem('role');
    setDarkMode(false);
    logout();
  };

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
    {
      title: "Logout",
      Icon: <LogoutIcon color="primary" />,
      linkto: "/",
      onClick: logouts
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate(`/${userRole}/profile`);
  };

  return (
    <Box sx={{ display: "flex", minHeight: '100vh' }}>
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
          <Typography variant="h6" noWrap component="div" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={LogoImage} alt="Logo" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
            CleanSlate
          </Typography>
          {userRole != 'admin' &&
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ marginRight: '10px' }}>
                  <PersonIcon />
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>
                  <AccountCircleIcon sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={logouts}>
                  <LogoutIcon sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          }

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
        )}
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
        )}
        {isTeacher && (
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
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, minHeight: '' }}>
        <DrawerHeader />
        <Box sx={{ p: 3, minHeight: '100%' }}>
          {children}
          {/* This is where the content of the page will be rendered */}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
