import { createTheme, ThemeProvider } from '@mui/material/styles';
import useStore from '../../store/store'; //zustand store for darkmode

export function CSThemesProvider({ children }) {
    const { darkMode } = useStore();

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#22717d',
            },
            secondary: {
                main: '#de8a57',
            },
            background: {
                default: darkMode ? '#333' : '#ebfafc', 
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

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}