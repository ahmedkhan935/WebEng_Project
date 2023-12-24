import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Card, Collapse, CardContent, Box, Typography, alpha, IconButton, Menu, MenuItem, Avatar, TextField } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DescriptionIcon from '@mui/icons-material/Description';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useParams } from 'react-router-dom';
import { postComment } from '../services/StudentService';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { deleteAnnouncement } from '../services/TeacherService';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { ClassroomContext } from '../context/ClassroomContext';


function ClassroomStreamCard({ card }) {
    const theme = useTheme();

    const location = useLocation();
    const userRole = location.pathname.split('/')[1];

    const [Icon, setIcon] = useState(null);
    const [cardId, setCardId] = useState('');
    const classCode = useParams().classCode;

    //Hooks for dealing with the menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    //Hook for dealing with comment
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(card.comments);

    //dealing with collapsing the card
    const [expanded, setExpanded] = useState(false);

    //dealing with delete 
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { classroomAnnouncements, setClassroomAnnouncements } = useContext(ClassroomContext);


    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment === '') return;
        try {
            const response = await postComment(classCode, cardId, newComment);
            console.log("COMMENTED ", response.data);
            setComments(comments => [...comments, response.data]);
        } catch (error) {
            console.error('Error posting comment:', error);
        }

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

    const handleEdit = () => {
        console.log("Edit clicked");
        handleClose();
    }

    const confirmDelete = () => {
        deleteAnnouncement(classCode, cardId)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        //update announcements state according to delete
        setClassroomAnnouncements(classroomAnnouncements.filter((announcement) => announcement._id !== cardId));
        handleClose();
        setDeleteDialogOpen(false);
    };


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

        setCardId(card._id);
        setComments(card.comments);

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
                    {"Posted on " + new Date(card.date).toLocaleDateString() + " by " + card.createdBy}
                </Typography>
                <Typography variant="body1" margin="10px" sx={{ zIndex: 1, position: 'relative' }}>
                    {card.content}
                </Typography>

                {userRole == "teacher" ?
                    (<>
                        <Box sx={{ padding: '10px' }}>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                                sx={{ position: 'absolute', top: '10px', right: '10px' }}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
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
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        </Menu>
                    </>)
                    :
                    null
                }

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
                    {card.attachments?.length > 0 ? (
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
                                        sx={{
                                            margin: '5px',
                                            backgroundColor: theme => `${theme.palette.secondary.main}1A` // 33 is hex for 20% opacity
                                        }}
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
                        <Box
                            sx={{
                                maxHeight: '200px', // Adjust this value as needed
                                overflowY: 'auto',
                                marginBottom: '10px',
                            }}
                        >
                            {comments?.length > 0 ? (
                                comments.map((comment, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px', marginLeft: '10px' }}>
                                        <Avatar src="../assets/images/defaultpfp.jpg" sx={{ marginRight: '10px' }} />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0px' }}>
                                                {comment.createdBy}
                                            </Typography>
                                            <Typography variant="body1">{comment.content}</Typography>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body1" sx={{ marginLeft: '10px' }}>No comments yet. Why not start the conversation?</Typography>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <TextField
                                value={newComment}
                                onChange={handleCommentChange}
                                variant="outlined"
                                placeholder="Comment your thoughts..."
                                fullWidth
                                sx={{ marginRight: '10px', marginLeft: '10px', flex: 1, height: '100%' }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCommentSubmit}
                                sx={{ height: '100%', margin: '0px' }}
                                disabled={!newComment.trim()} // Button is disabled when newComment is empty or contains only whitespace
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Collapse>
                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                    <DialogTitle>Are you sure you want to delete this announcement?</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button onClick={confirmDelete}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    )
}

export default ClassroomStreamCard;