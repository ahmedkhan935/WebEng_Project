import React from 'react';
import { useEffect, useState } from 'react';
import { Card,  CardActionArea, CardContent, Typography, alpha, IconButton, Menu, MenuItem } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DescriptionIcon from '@mui/icons-material/Description';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useTheme } from '@mui/material/styles';

function ClassroomStreamCard({ cardType }) {
    const theme = useTheme();
    const [Icon, setIcon] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        event.stopPropagation();
        console.log("Three dots clicked")
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleDelete = () => {
        console.log('Delete clicked');
        handleClose();
    };

    const cardClicked = () => {
        if(!open) {
            //handle here
            console.log("card clicked")
        }
    }


    useEffect(() => {
        switch (cardType) {
            case 'assignment':
                setIcon(() => AssignmentIcon);
                break;
            case 'material':
                setIcon(() => DescriptionIcon);
                break;
            case 'announcement':
                setIcon(() => AnnouncementIcon);
                break;
            default:
                setIcon(null);
        }
    }, [cardType]);

    return (
        <Card sx={{
            marginBottom: '15px'
        }}>
            <CardActionArea onClick={cardClicked}>
                <CardContent sx={{ position: 'relative', overflow: 'hidden' }}>
                    {Icon && <Icon sx={{
                        color: alpha(theme.palette.secondary.main, 0.2),
                        position: 'absolute',
                        left: 0,
                        transform: cardType === 'announcement' ? 'scaleX(-1)' : 'none',
                        transform: 'translateY(-50%)',
                        transform: 'translateX(-20%)',
                        fontSize: '100px',
                    }} />}
                    <Typography variant="h6" color="text.primary" margin="10px" sx={{ zIndex: 1, position: 'relative' }}>
                        Assignment 1
                    </Typography>
                    <Typography variant="body2" color="text.secondary" margin="10px" sx={{ zIndex: 1, position: 'relative' }}>
                        Due: 10/10/2021
                    </Typography>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        sx={{ position: 'absolute', top: '10px', right: '10px' }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: 48 * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ClassroomStreamCard;