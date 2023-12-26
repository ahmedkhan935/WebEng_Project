import React, { useState, useContext } from 'react';
import { Box, Tooltip, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import DownloadIcon from '@mui/icons-material/Download';
import CampaignIcon from '@mui/icons-material/Campaign';
import { addAnnouncement, getStudents } from '../services/TeacherService'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Link } from 'react-router-dom';
import { utils, writeFile } from 'xlsx';
import { ClassroomContext } from '../context/ClassroomContext';

function TeacherClassroomBtns({ classCode }) {
    const [open, setOpen] = useState(false); //for announcement form
    const [dialogOpen, setDialogOpen] = useState(false); //for success/failure dialog
    const [dialogMessage, setDialogMessage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [attachments, setAttachments] = useState(null);
    const { classroomAnnouncements, setClassroomAnnouncements } = useContext(ClassroomContext);
    // const [contentSuggestions, setContentSuggestions] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    // const spellingSuggestions = (text) => {
    //     checkSpelling(text).then((data) => {
    //         setContentSuggestions(data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })  
    // }

    const handleClose = () => {
        setTitle('');
        setContent('');
        setAttachments(null);
        setOpen(false);
    };

    const handleAnnouncementPost = async () => {
        if (title == '' || content == '') {
            setDialogMessage('Failed to add, please fill all the fields');
            setDialogOpen(true);
            return;
        }

        const formdata = new FormData();
        formdata.append('type', 'Announcement');
        formdata.append('title', title);
        formdata.append('content', content);
        formdata.append('file', attachments, attachments.name);

        const data = await addAnnouncement(classCode, formdata);

        if (data.error) {
            //jeee??
            setDialogMessage('Failed to add announcement: ' + data.error);
        } else {
            setClassroomAnnouncements([data.data, ...classroomAnnouncements]);
            setDialogMessage('Announcement added successfully');
        }
        setTitle('');
        setContent('');
        setAttachments(null);
        setDialogOpen(true);
        setOpen(false);
    };

    const handleExportList = async () => {
        let students = await getStudents(classCode);
        students = students.data;

        // Convert array of objects to array of arrays
        const studentsArray = students.map(student => [student.rollNumber, student.name]);

        // Add header row
        studentsArray.unshift(['Rno', 'Name']);

        const worksheet = utils.aoa_to_sheet(studentsArray);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Students");
        writeFile(workbook, classCode + "_Students.xlsx");
    }

    return (
        <Box sx={{ border: '1px solid gray', width: '100%', borderRadius: '5px', mt: '10px', pb: '20px', pl: '20px', pr: '20px' }}>
            <Typography variant="h6" color="text.secondary" display="inline-block" sx={{ marginTop: '10px' }}>
                Manage your Class
            </Typography>

            <Tooltip title="View, update, and add attendance records for this class." placement="right">
                <Button component={Link} to={`/teacher/classes/${classCode}/attendance`} variant="contained" color="primary" startIcon={<ChecklistIcon color="secondary" style={{ fontSize: 25 }} />} fullWidth sx={{ mt: '10px' }}>
                    Attendance
                </Button>
            </Tooltip>
            <Tooltip title="View, grade, and add evaluations for students." placement="right">
                <Button component={Link} to={`/teacher/classes/${classCode}/evaluations`} variant="contained" color="primary" startIcon={<AssignmentTurnedInIcon color="secondary" style={{ fontSize: 25 }} />} fullWidth sx={{ mt: '10px' }}>
                    Evaluations
                </Button>
            </Tooltip>
            <Tooltip title="Start a video call" placement="right">
                <Button component={Link} to={`/teacher/classes/${classCode}/videoCall`} variant="contained" color="primary" startIcon={<VideoCallIcon color="secondary" style={{ fontSize: 25 }} />} fullWidth sx={{ mt: '10px' }} >
                    Start Video call
                </Button>
            </Tooltip>
            <Tooltip title="Add an announcement for your students" placement="right">
                <Button onClick={handleClickOpen} variant="contained" color="primary" startIcon={<CampaignIcon color="secondary" style={{ fontSize: 25 }} />} fullWidth sx={{ mt: '10px' }} >
                    Add announcement
                </Button>
            </Tooltip>
            <Tooltip title="Export a list of students in this class as an Excel file." placement="right">
                <Button variant="contained" color="primary" startIcon={<DownloadIcon color="secondary" style={{ fontSize: 25 }} />} fullWidth sx={{ mt: '10px' }} onClick={handleExportList}>
                    Export Students
                </Button>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <Box p={2}>
                    <DialogTitle sx={{ color: "primary" }}>
                        <Typography variant="h5" color="primary" display="inline-block">
                            Announce something to your class
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" spellCheck="true" id="title" label="Title" type="text" fullWidth value={title} onChange={e => setTitle(e.target.value)} />
                        <TextField margin="dense" spellCheck="true" id="content" label="Content" type="text" fullWidth multiline rows={7} value={content} onChange={e => setContent(e.target.value)} />
                        {/* <TextField margin="dense" id="content" label="Content" type="text" fullWidth multiline rows={7} value={content} onChange={e => { setContent(e.target.value); spellingSuggestions(e.target.value); }} />
                        {contentSuggestions && <div>{contentSuggestions}</div>}
                        <TextField margin="dense" id="attachments" label="Attachments" type="file" fullWidth InputLabelProps={{ shrink: true }} onChange={e => setAttachments(e.target.files[0])} /> */}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ marginBottom: '10px', marginRight: '5px' }}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleAnnouncementPost} sx={{ marginBottom: '10px', marginRight: '15px' }}>Post</Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        {dialogMessage.includes('Failed') ? <SentimentVeryDissatisfiedIcon color="secondary" fontSize="large" /> : <SentimentVerySatisfiedIcon color="secondary" fontSize="large" />}
                        {dialogMessage}
                    </Box>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>OK</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default TeacherClassroomBtns;