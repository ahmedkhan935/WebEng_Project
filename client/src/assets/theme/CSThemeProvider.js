import { createTheme, ThemeProvider } from '@mui/material/styles';
import useStore from '../../store/store'; //zustand store for darkmode

export function CSThemeProvider({ children }) {
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
        components: {
            MuiCssBaseline: {
              styleOverrides: `
                ::-webkit-scrollbar {
                  width: 10px;
                }
                ::-webkit-scrollbar-track {
                  background: #f1f1f1;
                  padding: 2px; // Add padding to the track
                }
                ::-webkit-scrollbar-thumb {
                    background: #edb18c;
                  border-radius: 20px;
                }
                ::-webkit-scrollbar-thumb:hover {
                  background: #de8a57;
                }
              `,
            },
          },
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}