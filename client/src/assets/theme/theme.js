import { createTheme } from "@mui/material/styles";
import useStore from "../../store/store"; //zustand store for darkmode

//****************************************************** */
//THIS FILE IS DEPRECATED. USE CSTHEMEPROVIDER.JS INSTEAD
//          REMOVE ALL REFERENCES TO THIS FILE
//****************************************************** */

const theme = createTheme({
  palette: {
    primary: {
      main: "#22717d",
    },
    secondary: {
      main: "#de8a57",
    },
    background: {
      default: "#ebfafc",
    },
  },
  typography: {
    fontFamily: "Rethink Sans, sans-serif",
    h5: {
      fontWeight: "bold",
      color: "#22717d", // primary color
    },
    h4: {
      fontSize: "1.5rem",
    },
  },
});

export default theme;
