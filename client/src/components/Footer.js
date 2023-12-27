import { useTheme } from "@mui/material/styles";
import LogoImage from '../assets/images/logo.png'
import { Box, alpha, Typography } from "@mui/material";

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
       www.web-eng-project.vercel.app
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" >
        Developed by Ahmed | Fatima | Musa | Haadiya
      </Typography>
    </Box>
  );
};

export default Footer;