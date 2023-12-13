import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#22717d',
        },
        secondary: {
            main: '#de8a57',
        },
        background: {
            default: '#ebfafc',
        }
    },
    typography: {
        fontFamily: 'Rethink Sans, sans-serif',
        h5: {
            fontWeight: 'bold',
            color: '#22717d', // primary color
        },
        h4: {
            fontSize: '1.5rem',
        }
    },
});

export default theme;
