import { Card, Switch, Container, FormControlLabel, Typography } from '@mui/material';
import useStore from '../store/store'; //zustand store for darkmode
import NavBar from '../components/Navbar';

function Settings() {
    const { darkMode, setDarkMode } = useStore();

    const handleThemeChange = () => {
        setDarkMode(!darkMode); //update zustand store
    };

    return (
        <NavBar>
            <Container>
                <Card  sx={{ padding: '20px',marginTop:'20px' }}>
                    <Typography variant="h4" component="div" gutterBottom>
                        Settings
                    </Typography>
                    <FormControlLabel
                        control={<Switch checked={darkMode} onChange={handleThemeChange} />}
                        label="Dark Mode"
                    />
                    {/* Add other settings here */}
                </Card>
            </Container>
        </NavBar>
    );
}

export default Settings;