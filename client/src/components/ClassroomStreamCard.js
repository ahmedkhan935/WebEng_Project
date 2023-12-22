import React from 'react';
import { useEffect, useState } from 'react';
import { Card, Collapse, CardContent, Box, Typography, alpha, IconButton, Menu, MenuItem, Avatar, TextField, Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DescriptionIcon from '@mui/icons-material/Description';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';



import { useTheme } from '@mui/material/styles';

function ClassroomStreamCard({ card }) {
    const theme = useTheme();
    const [Icon, setIcon] = useState(null);
    //Hooks for dealing with the menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    //Hook for dealing with comment
    const [newComment, setNewComment] = useState('');
    //dealing with collapsing the card
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        console.log('New comment:', newComment);
        setNewComment('');
    };


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
        if (!open) {
            //handle here
            console.log("card clicked")
        }
    }


    useEffect(() => {
        switch (card.type.toLowerCase()) {
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
    }, [card]);

    return (
        <Card sx={{
            marginBottom: '15px'
        }}>
            <CardContent sx={{ position: 'relative', overflow: 'hidden' }}>
                {Icon && <Icon sx={{
                    color: alpha(theme.palette.secondary.main, 0.2),
                    position: 'absolute',
                    left: 0,
                    transform: card.type === 'announcement' ? 'scaleX(-1)' : 'none',
                    transform: 'translateY(-50%)',
                    transform: 'translateX(-20%)',
                    fontSize: '100px',
                }} />}
                <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bolder', zIndex: 1, position: 'relative', marginLeft: '10px' }}>
                    {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" margin="10px" sx={{ zIndex: 1, position: 'relative' }}>
                    {new Date(card.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" margin="10px" sx={{ zIndex: 1, position: 'relative' }}>
                    {"Posted by: " + card.createdBy}
                </Typography>
                <Typography variant="body1" color="black" margin="10px" sx={{ zIndex: 1, position: 'relative' }}>
                    {card.content}
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
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ borderRadius: '2px' }}
                >
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    <Typography variant="body2" color="textSecondary">
                        {expanded ? 'View Less' : 'View More'}
                    </Typography>
                </IconButton>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {card.attachments.length > 0 ? (
                        <>
                            <hr></hr>
                            <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bolder', zIndex: 1, position: 'relative', marginLeft: '10px' }}>
                                Attachments
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                                {card.attachments.map((attachment, index) => (
                                    <Chip
                                        key={index}
                                        icon={<AttachmentIcon />}
                                        label={attachment.name}
                                        clickable
                                        component="a"
                                        href={attachment.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outlined"
                                        sx={{ margin: '5px' }}
                                    />
                                ))}
                            </Box>
                        </>
                    ) : null}

                    <hr></hr>
                    <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bolder', zIndex: 1, position: 'relative', marginLeft: '10px' }}>
                                Comments
                    </Typography>
                    <Box sx={{ marginTop: '10px' }}>
                        {card.comments.length > 0 ? (
                            card.comments.map((comment, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <Avatar src="../assets/images/defaultpfp.jpg" sx={{ marginRight: '10px' }} />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom:'0px' }}>
                                            {comment.createdBy}
                                        </Typography>
                                        <Typography variant="body1">{comment.content}</Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1">No comments yet. Why not start the conversation?</Typography>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <TextField
                                value={newComment}
                                onChange={handleCommentChange}
                                variant="outlined"
                                placeholder="Comment your thoughts..."
                                fullWidth
                                sx={{ marginRight: '10px', flex: 1, height: '100%' }}
                            />
                            <Button variant="contained" color="primary" onClick={handleCommentSubmit} sx={{ height: '100%', margin: '0px' }}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    )
}

export default ClassroomStreamCard;