import React, { useState, Fragment, useEffect } from 'react';
import { alpha, Alert,AlertTitle, Typography, Dialog, DialogTitle, DialogContent, Checkbox, FormControlLabel, Tooltip, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Collapse, Box, Chip, Paper, DialogActions } from "@mui/material";
import { AttachFile } from '@mui/icons-material';
import NavBar from '../components/Navbar';
import { styled } from '@mui/system';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { getStudents, getAllEvaluations, getEvaluationMarks, addEvaluation, addAnnouncement } from '../services/TeacherService';
import { useParams } from 'react-router';
import { produce } from 'immer';
import { downloadFile } from '../services/ThreadService';


const TableHeaderCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    fontWeight: 'bold',
    color: theme.palette.common.white,
}));

const TableSubHeaderCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.6),
    color: theme.palette.common.white,
    cursor: 'pointer',
}));

const SmallTableHeaderCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.secondary.main, 0.8),
    color: theme.palette.common.white,
}));


function Evaluations() {
    const [evaluations, setEvaluations] = useState([
        // {
        //     title: "Assignemnt 1", weightage: 5, totalMarks: 10, averageMarks: 5.5, minMarks: 0, maxMarks: 10, dueDate: "12/12/2021",
        //     submissions: [
        //         { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: { name: "attachment.png", url: "example.com" } },
        //         { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: { name: "attachment.png", url: "example.com" } },
        //         { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: null },
        //     ]
        // },
        // {
        //     title: "Assignemnt 2", weightage: 5, totalMarks: 10, averageMarks: 5.5, minMarks: 0, maxMarks: 10, dueDate: "12/12/2021",
        //     submissions: [
        //         { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: { name: "attachment.png", url: "example.com" } },
        //         { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: null },
        //         { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: { name: "attachment.png", url: "example.com" } }
        //     ]
        // },

    ])
    const { classCode } = useParams();
    const [tempEvaluations, setTempEvaluations] = useState(evaluations); //for updating text fields and dealig with cancel, we use this
    const [open, setOpen] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [students, setStudents] = useState([]);
    const [editMarksError, setEditMarksError] = useState(false);


    //States For adding new evaluation
    const [createEvalTitle, setCreateEvalTitle] = useState("");
    const [createEvalContent, setCreateEvalContent] = useState(null);
    const [createEvalWeightage, setCreateEvalWeightage] = useState(null);
    const [createEvalTotalMarks, setCreateEvalTotalMarks] = useState(null);
    const [createEvalOpenSubmission, setCreateEvalOpenSubmission] = useState(false);
    const [createEvalDueDate, setCreateEvalDueDate] = useState(new Date());
    const [openDialog, setOpenDialog] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const handleEditMarks = () => {
        setTempEvaluations([...evaluations]);
        setEditMode(true);
    };

    const handleSave = (evaluationTitle) => {
        setEvaluations(tempEvaluations);
        addEvaluation(classCode, evaluationTitle, evaluations)
            .then((data) => { console.log("DATA", data) });

        setCreateEvalTitle("");
        setCreateEvalContent(null);
        setCreateEvalWeightage(null);
        setCreateEvalTotalMarks(null);
        setCreateEvalOpenSubmission(false);
        setEditMode(false);

    };

    const handleCancel = () => {
        setEditMode(false);
        setCreateEvalTitle("");
        setCreateEvalContent(null);
        setCreateEvalWeightage(null);
        setCreateEvalTotalMarks(null);
        setCreateEvalOpenSubmission(false);
        setTempEvaluations(evaluations);
    };

    const handleMarksChange = (event, evalIndex, subIndex) => {
        const value = event.target.value;
        setEditMarksError(event.target.error);
        const error = value > evaluations[evalIndex].totalMarks || value < 0;
        setEditMarksError(error);
        setTempEvaluations(produce(tempEvaluations, draft => {
            draft[evalIndex].submissions[subIndex].obtainedMarks = event.target.value;
        }));

    };

    const populateMarks = (index) => {
        const evaluation = evaluations[index];
        const title = evaluation.title;
        
        let data = getEvaluationMarks(classCode, title).then((data) => {
            if (data.error) {
                console.log("ERROR", data.error);
                return;
            }
            const marks = data.data;
            console.log("MARKS", marks);
            const updatedEvaluations = produce(evaluations, draft => {
                draft[index].submissions = marks;
                draft[index].minMarks = Math.min(...marks.map((submission) => submission.obtainedMarks));
                draft[index].maxMarks = Math.max(...marks.map((submission) => submission.obtainedMarks));
                draft[index].averageMarks = marks.length > 0 ? marks.reduce((sum, submission) => sum + submission.obtainedMarks, 0) / marks.length : 0;
            });
            setEvaluations(updatedEvaluations);
            setTempEvaluations(evaluations);
            console.log("UPDATEDEVALUATIONS ", updatedEvaluations);
        });
    };
    
    useEffect(() => {
        console.log("EVALUATIONS CHANGED", evaluations);
    }, [evaluations]);

    const handleClick = (index) => {
        setOpen(prevOpen => {
            const newOpen = [...prevOpen];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });

        populateMarks(index);
    };


    const handleImportMarks = () => {
    }

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setCreateEvalTitle(title);
        setTitleError(evaluations.some(evaluation => evaluation.title === title));
    };

    const addEvaluation = () => {
        const evaluation = { //formdata
            type: createEvalOpenSubmission ? "Assignment" : "Other",
            title: createEvalTitle,
            content: createEvalContent,
            weightage: createEvalWeightage,
            totalMarks: createEvalTotalMarks,
            dueDate: createEvalDueDate
        };

        addAnnouncement(classCode, evaluation).then((data) => {
            if (data.error) {
                return;
            }
            evaluation.submissions = [];
            evaluation.minMarks = 0;
            evaluation.maxMarks = 0;
            evaluation.averageMarks = 0;

            setEvaluations([...evaluations, evaluation]);
            setTempEvaluations(evaluations);
        });

        // Add the evaluation to your state or database here
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        getStudents(classCode).then((data) => {
            console.log("GET STUDENTS", data.data);
            if (data.error) {
                return;
            }
            setStudents(data.data);
        })
        getAllEvaluations(classCode).then((data) => {
            console.log("GET ALL EVALS", data)
            if (data.error) {
                return;
            }
            const newEvaluations = data.data;
            setEvaluations(newEvaluations);
            console.log("DATA ", newEvaluations)
            console.log("EVALUATIONS ", newEvaluations)

            const updatedEvaluations = newEvaluations.map((evaluation) => ({ ...evaluation, submissions: [] }));
            setEvaluations(updatedEvaluations);
            console.log("EVALUATIONS AFTER MAP", updatedEvaluations)
            setTempEvaluations(updatedEvaluations);
            setOpen(new Array(newEvaluations.length).fill(false)); //all will be closed by default
        })
    }, []);

        //to download student submission
        const downloadSubmission = async (name, originalName) => {
            setDownloading(true);
            try {
                const response = await downloadFile(name);
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
    
                const blob = await response.blob();
                console.log(blob);
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = originalName;
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
        <NavBar>
            <Container>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '10px' }}>
                    Evaluations for this class
                </Typography>
                <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ marginTop: '10px', marginBottom: '20px' }}>
                    Add Evaluation
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Title</TableHeaderCell>
                                <TableHeaderCell>Due Date</TableHeaderCell>
                                <TableHeaderCell align="left">Weightage</TableHeaderCell>
                                <TableHeaderCell align="left">Total Marks</TableHeaderCell>
                                <TableHeaderCell align="right">Average Marks</TableHeaderCell>
                                <TableHeaderCell align="right">Minimum Marks</TableHeaderCell>
                                <TableHeaderCell align="right">Maximum Marks</TableHeaderCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {tempEvaluations.map((evaluation, evalIndex) => (

                                <Fragment key={evalIndex}>
                                    <TableRow onClick={() => handleClick(evalIndex)}>
                                        <TableSubHeaderCell component="th" scope="row">
                                            {evaluation.title}
                                        </TableSubHeaderCell>
                                        <TableSubHeaderCell align="left">
                                            {evaluation.dueDate ?
                                                new Date(evaluation.dueDate).toLocaleDateString() + ' ' + new Date(evaluation.dueDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
                                                : " - "
                                            }
                                        </TableSubHeaderCell>
                                        <TableSubHeaderCell align="left">{evaluation.weightage}</TableSubHeaderCell>
                                        <TableSubHeaderCell align="left">{evaluation.totalMarks}</TableSubHeaderCell>
                                        <TableSubHeaderCell align="right">{evaluation.averageMarks}</TableSubHeaderCell>
                                        <TableSubHeaderCell align="right">{evaluation.minMarks}</TableSubHeaderCell>
                                        <TableSubHeaderCell align="right">{evaluation.maxMarks}</TableSubHeaderCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                                            <Collapse in={open[evalIndex]} timeout="auto" unmountOnExit>
                                                <Box margin={1}>
                                                    {
                                                        evaluation.dueDate && evaluation.dueDate > new Date().toISOString() ?
                                                            <Alert severity="warning">
                                                                <AlertTitle>Due date has not passed.</AlertTitle>
                                                                Some students may not have submitted their work yet.
                                                            </Alert>
                                                            :
                                                            null
                                                    }
                                                    <Button variant="contained" color="primary" sx={{ marginTop: '10px' }} onClick={handleImportMarks} startIcon={<FileUploadIcon />}> Import Marks </Button>
                                                    <Button variant="contained" color="primary" sx={{ marginTop: '10px', marginLeft: '10px' }} onClick={handleEditMarks} startIcon={<EditIcon />}> Add/Edit Marks </Button>
                                                    <Table size="small" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <SmallTableHeaderCell>S.No</SmallTableHeaderCell>
                                                                <SmallTableHeaderCell>Roll Number</SmallTableHeaderCell>
                                                                <SmallTableHeaderCell>Name</SmallTableHeaderCell>
                                                                <SmallTableHeaderCell align="left">Attachment</SmallTableHeaderCell>
                                                                <SmallTableHeaderCell align="right">Obtained Weightage</SmallTableHeaderCell>
                                                                <SmallTableHeaderCell align="right">Obtained Marks</SmallTableHeaderCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {evaluation.submissions.map((submission, subIndex) => {
                                                                const obtainedWeightage = (submission.obtainedMarks / evaluation.totalMarks) * evaluation.weightage;
                                                                return (
                                                                    <TableRow key={subIndex}>
                                                                        <TableCell>{subIndex + 1}</TableCell>
                                                                        <TableCell component="th" scope="row">
                                                                            {submission.rollNumber}
                                                                        </TableCell>
                                                                        <TableCell>{submission.name}</TableCell>
                                                                        <TableCell align="left">
                                                                            {submission.submission &&
                                                                                <Chip
                                                                                icon={<AttachmentIcon />}
                                                                                label={submission.submission.originalName.length > 30 //trim if too many chars
                                                                                    ? `${submission.submission.originalName.substring(0, 30)}...` 
                                                                                    : submission.submission.originalName}
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
                                                                                onClick={() => downloadSubmission(submission.submission.name, submission.submission.originalName)}
                                                                                />
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell align="right">{obtainedWeightage.toFixed(2)}</TableCell>
                                                                        <TableCell align="right">
                                                                            {editMode ? (
                                                                                <TextField
                                                                                    value={submission.obtainedMarks}
                                                                                    inputProps={{ min: 0, max: evaluation.totalMarks }}
                                                                                    type="number"
                                                                                    error={submission.obtainedMarks > evaluation.totalMarks || submission.obtainedMarks < 0}
                                                                                    helperText={submission.obtainedMarks > evaluation.totalMarks || submission.obtainedMarks < 0 ? "Marks should be between 0 and " + evaluation.totalMarks : ""}
                                                                                    onChange={(event) => { 
                                                                                        setEditMarksError(submission.obtainedMarks > evaluation.totalMarks || submission.obtainedMarks < 0);
                                                                                        handleMarksChange(event, evalIndex, subIndex);
                                                                                     }}
                                                                                    style={{ maxWidth: '80px' }}
                                                                                    variant="standard"
                                                                                    size="small"
                                                                                />
                                                                            ) : (
                                                                                submission.obtainedMarks
                                                                            )}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            })}
                                                        </TableBody>

                                                    </Table>
                                                    {editMode && (
                                                        <Box display="flex" justifyContent="flex-end" mt={2}>
                                                            <Button variant="outlined" color="primary" onClick={handleCancel} sx={{ ml: 1, mr: 1 }}>Cancel</Button>
                                                            <Button variant="contained" color="primary" onClick={()=> handleSave(evaluation.title)} disabled={editMarksError}>Save</Button>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle sx={{ pb: 0 }}>
                        <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>
                            Add Evaluation
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Title"
                            value={createEvalTitle}
                            onChange={handleTitleChange}
                            fullWidth
                            sx={{ marginTop: '20px' }}
                            error={titleError || createEvalTitle.match(/[$%^~*]/)}
                            helperText={titleError ? "An evaluation item with this title already exists." : createEvalTitle.match(/[$%^~*]/) ? "Please avoid special characters ($%^~*)" : ""}
                        />
                        <TextField
                            label="Content"
                            value={createEvalContent}
                            onChange={(e) => setCreateEvalContent(e.target.value)}
                            fullWidth
                            sx={{ marginTop: '20px' }}
                            helperText="Optionally, add some descriptory content/instructions. They will be displayed in your classroom stream."
                        />

                        <TextField
                            label="Weightage"
                            value={createEvalWeightage}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (value >= 1 && value <= 100) {
                                    setCreateEvalWeightage(e.target.value);
                                }
                            }}
                            type="number"
                            fullWidth
                            inputProps={{ min: 1, max: 100 }}
                            sx={{ marginTop: '20px' }}
                        />
                        <TextField
                            label="Total Marks"
                            value={createEvalTotalMarks}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (value >= 1 || e.target.value === '') {
                                    setCreateEvalTotalMarks(e.target.value);
                                }
                            }}
                            type="number"
                            fullWidth
                            inputProps={{ min: 1 }}
                            sx={{ marginTop: '20px' }}
                        />
                        <FormControlLabel
                            control={
                                <Tooltip title="If you select this checkbox, a submission portal for this evaluation will be opened on the classroom.">
                                    <Checkbox checked={createEvalOpenSubmission} onChange={(e) => setCreateEvalOpenSubmission(e.target.checked)} />
                                </Tooltip>
                            }
                            label="Open Submissions"
                        />
                        {createEvalOpenSubmission && (
                            <TextField
                                label="Due Date"
                                type="datetime-local"
                                value={createEvalDueDate}
                                onChange={(e) => setCreateEvalDueDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: new Date().toISOString().split('T')[0],
                                }}
                                sx={{ marginTop: '20px' }}
                                fullWidth
                            />
                        )}
                        <DialogActions>
                            <Button variant="outlined" color="primary" onClick={handleCloseDialog}>Cancel</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={addEvaluation}
                                disabled={!createEvalTitle || !createEvalWeightage || !createEvalTotalMarks || (createEvalOpenSubmission && !createEvalDueDate) || titleError}
                            >
                                Add
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </Container>
        </NavBar>
    );
}

export default Evaluations;