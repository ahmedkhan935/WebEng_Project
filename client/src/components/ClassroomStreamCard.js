import React from 'react';
import { useEffect, useState, useContext } from 'react';
import {
    Alert, Card, Collapse, CardContent, CircularProgress,
    Box, Typography, alpha, Dialog, DialogTitle, DialogContent, DialogActions, Button,
    IconButton, Menu, MenuItem, Avatar, TextField, Tooltip
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import DescriptionIcon from '@mui/icons-material/Description';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useParams } from 'react-router-dom';
import { postComment, submitAssignment } from '../services/StudentService';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { deleteAnnouncement, editAnnouncement, deleteEvaluation } from '../services/TeacherService';
import { ClassroomContext } from '../context/ClassroomContext';
import { downloadFile } from '../services/ThreadService';

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

    //dealing with delete , submissions, downlaods
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { classroomAnnouncements, setClassroomAnnouncements } = useContext(ClassroomContext);
    const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
    const [attachments, setAttachments] = useState(null);
    const [downloading, setDownloading] = useState(false);

    //FOR DEALING WIth editing
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');


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
                setIcon(() => DescriptionIcon);
        }

        setCardId(card._id);
        setComments(card.comments);
        console.log("CARD", card);
    }, [card]);


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

        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setEditedTitle(card.title);
        setEditedContent(card.content);
        setEditDialogOpen(true);
        handleClose();
    }
    const handleSave = async () => {
        const newAnnouncement = {
            title: editedTitle,
            content: editedContent
        };
        editAnnouncement(classCode, cardId, newAnnouncement);
        setClassroomAnnouncements(classroomAnnouncements.map((announcement) => {
            if (announcement._id === cardId) {
                return { ...announcement, title: editedTitle, content: editedContent };
            } else {
                return announcement;
            }
        }));

        setEditDialogOpen(false);
    }

    const confirmDelete = () => {
        try {
            deleteAnnouncement(classCode, cardId)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    throw new Error(err);
                });

            //update announcements state according to delete
            setClassroomAnnouncements(classroomAnnouncements.filter((announcement) => announcement._id !== cardId));
            handleClose();
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const confirmEvalDelete = () => {
        try {
            let title = card.title;
            title = title.replace(/ /g, '~');
            deleteEvaluation(classCode, title)
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
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const handleAssignmentSubmit = async () => {
        if (!attachments) {
            return;
        }
        const formdata = new FormData();
        formdata.append('file', attachments, attachments.name);
        let title = card.title;
        title = title.replace(/ /g, '~');
        const data = await submitAssignment(classCode, title, formdata);
        console.log("DAAAAA", data.data);
        setSubmitDialogOpen(false);
    }

    //to download card attachment
    const download = async () => {
        setDownloading(true);
        try {
            const response = await downloadFile(card.attachments.name);
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            const blob = await response.blob();
            console.log(blob);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = card.attachments.originalName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Fetch error: ", error);
        } finally {
            setDownloading(false);
        }
    }

    //to download student submission
    const downloadSubmission = async () => {
        setDownloading(true);
        try {
            const response = await downloadFile(card.submissions[0].attachment.name);
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            const blob = await response.blob();
            console.log(blob);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = card.submissions[0].attachment.originalName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Fetch error: ", error);
        } finally {
            setDownloading(false);
        }
    }



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

                            {card.type == "Announcement" &&
                                <MenuItem onClick={handleEdit}>Edit</MenuItem>}
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
                    {card.attachments?.name ? (
                        <>
                            <hr></hr>
                            <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bolder', zIndex: 1, position: 'relative', marginLeft: '10px' }}>
                                Attachments
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                                <Tooltip title="Click to download attachment" placement="right">
                                    <Chip
                                        key={card.attachments.name}
                                        icon={<AttachmentIcon />}
                                        label={card.attachments.originalName}
                                        clickable
                                        component="a"
                                        onClick={() => download(card.attachments.name)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outlined"
                                        sx={{
                                            margin: '5px',
                                            backgroundColor: theme => `${theme.palette.secondary.main}1A` // 33 is hex for 20% opacity
                                        }}
                                    />
                                </Tooltip>
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
                                sx={{ marginRight: '10px', marginLeft: '10px', marginBottom: '10px', flex: 1, height: '100%' }}
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
                    {userRole == "student" && card.type == "Assignment" ? //display the submissions section
                        <>
                            <hr></hr>
                            <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bolder', zIndex: 1, position: 'relative', marginLeft: '10px', marginTop: '10px' }}>
                                Submission
                            </Typography>
                            <Typography variant="subtitle2" sx={{ marginLeft: '10px' }}>
                                {card.submissions.length > 0 && card.submissions[0].studentId == "USER" ? "You have submitted this assignment." : "You are eligible to submit your work."}
                            </Typography>

                            {card.submissions.length > 0 && card.submissions[0].studentId == "USER" ?
                                <Tooltip title="Click to download submission" placement="right">
                                    <Chip
                                        icon={<AttachmentIcon />}
                                        label={card.submissions[0].attachment.originalName}
                                        clickable
                                        component="a"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outlined"
                                        sx={{
                                            margin: "5px",
                                            backgroundColor: (theme) =>
                                                `${theme.palette.secondary.main}1A`,
                                        }}
                                        onClick={() => downloadSubmission()}

                                    />
                                </Tooltip>
                                :
                                <Button variant="contained" color="secondary" onClick={() => { console.log(card); setSubmitDialogOpen(true) }} sx={{ marginLeft: '10px', marginTop: '5px', color: '#fff' }}>Submit Work</Button>
                            }

                            {new Date(card.dueDate) < new Date() &&
                                <Alert severity="warning" sx={{ marginTop: '10px', marginBottom: '10px' }}>
                                    The due date has passed. This could result in marks deduction.
                                </Alert>
                            }
                        </>
                        :
                        null
                    }
                </Collapse>
                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this announcement?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button onClick={card.type == 'Announcement' ? confirmDelete : confirmEvalDelete}>Delete</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={submitDialogOpen} onClose={() => setSubmitDialogOpen(false)} sx={{ padding: '24px' }}>
                    <DialogTitle>
                        <Typography variant="h4" color="primary" sx={{ fontWeight: 'bolder', zIndex: 1, position: 'relative', marginTop: '20px' }}>
                            Submit Your Work

                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" gutterBottom>
                            Attach files here. Be careful, Once you turn work in, it cannot be unsubmitted.
                        </Typography>
                        <Box mt={2}>
                            <TextField margin="dense" id="attachments" label="Attach Files" type="file" fullWidth InputLabelProps={{ shrink: true }} onChange={e => setAttachments(e.target.files[0])} />
                        </Box>
                        <DialogActions>
                            <Button variant="outlined" color="primary" onClick={() => setSubmitDialogOpen(false)}>CANCEL</Button>
                            <Button variant="contained" color="primary" onClick={handleAssignmentSubmit} disabled={!attachments}>SUBMIT</Button>
                        </DialogActions>

                    </DialogContent>

                </Dialog>

                <Dialog open={downloading}>
                    <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '48px' }}>
                        <DialogTitle>Downloading file, please wait...</DialogTitle>
                        <CircularProgress color="secondary" />
                    </Box>
                </Dialog>

                <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                    <DialogTitle>Edit Card</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            value={editedTitle}
                            onChange={e => setEditedTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Content"
                            type="text"
                            fullWidth
                            value={editedContent}
                            onChange={e => setEditedContent(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    )
}

export default ClassroomStreamCard;