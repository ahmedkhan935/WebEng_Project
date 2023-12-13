import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

function NavBar(props) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    CleanSlate
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;