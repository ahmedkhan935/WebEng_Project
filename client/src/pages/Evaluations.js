import React, { useState, Fragment, useEffect, useRef } from 'react';
import {
    alpha, Alert, AlertTitle, Typography, Dialog, DialogTitle, DialogContent,
    Checkbox, FormControlLabel, Tooltip, Button, Container, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, TextField, Collapse, Box,
    Chip, Paper, DialogActions, ButtonGroup, Menu, MenuItem, ListItemIcon, ListItemText
} from "@mui/material";
import NavBar from '../components/Navbar';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GradeIcon from '@mui/icons-material/Grade';
import EditIcon from '@mui/icons-material/Edit';
import GradingIcon from '@mui/icons-material/Grading';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { read, utils } from 'xlsx';
import { getStudents, getAllEvaluations, getEvaluationMarks, addEvaluation as updateMarks, addAnnouncement } from '../services/TeacherService';
import { useParams } from 'react-router';
import { produce } from 'immer';
import { downloadFile } from '../services/ThreadService';
import { TableHeaderCell, TableSubHeaderCell, SmallTableHeaderCell } from '../temp/theme/StyledComponents';

function Evaluations() {
    const [evaluations, setEvaluations] = useState([
        // {
        //sample obj looks like this.
        //     title: "Assignemnt 1", weightage: 5, totalMarks: 10, averageMarks: 5.5, minMarks: 0, maxMarks: 10, dueDate: "12/12/2021",
        //     submissions: [
        //         { studentId: "* mongoose obj id *", rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: { name: "attachment.png", url: "example.com" } },
        //         { studentId: "* mongoose obj id *", rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: null },
        //        
        //     ]
        // },

    ])
    const { classCode } = useParams();
    const [open, setOpen] = useState([]);//Array to keep track of multiple open/closed collapses
    const [students, setStudents] = useState([]);

    //States for editing marks
    const [tempEvaluations, setTempEvaluations] = useState(evaluations); //for updating text fields and dealig with cancel, we use this
    const [editMode, setEditMode] = useState(false);
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

    const fileInput = useRef();

    //states for editing evaluation
    const [editingEval, setEditingEval] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorMarks, setAnchorMarks] = React.useState(null);

    const handleManageMarksClick = (event) => {
        setAnchorMarks(event.currentTarget);
    };

    const handleManageMarksClose = () => {
        setAnchorMarks(null);
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
            if (data.error) {
                return;
            }
            const newEvaluations = data.data;
            setEvaluations(newEvaluations);
            const updatedEvaluations = newEvaluations.map((evaluation) => ({ ...evaluation, submissions: [] }));
            setEvaluations(updatedEvaluations);
            setTempEvaluations(updatedEvaluations);
            setOpen(new Array(newEvaluations.length).fill(false)); //all will be closed by default
        })
    }, []);

    useEffect(() => {
        setTempEvaluations(evaluations);
    }, [evaluations]);

    //Clicking a particular evaluation to display info
    const handleClick = (index) => {
        setOpen(prevOpen => {
            const newOpen = [...prevOpen];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });

        populateMarks(index);
    };

    //populate marks of an evaluation when evaluation selected
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
        });
    };

    //to download student submission on clicked
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

    //Edit marks button clicked
    const handleEditMarks = () => {
        setTempEvaluations([...evaluations]);
        setAnchorMarks(null);
        setEditMode(true);
    };


    //Editing in process - updating student marks & validating
    const handleMarksChange = (event, evalIndex, subIndex) => {
        const value = event.target.value;
        setEditMarksError(event.target.error);
        const error = value > evaluations[evalIndex].totalMarks || value < 0;
        setEditMarksError(error);
        setTempEvaluations(produce(tempEvaluations, draft => {
            draft[evalIndex].submissions[subIndex].obtainedMarks = event.target.value;
        }));

    };

    //Editing in process - updating student marks & validating
    const handleTitleChange = (e) => {
        const title = e.target.value;
        setCreateEvalTitle(title);
        setTitleError(evaluations.some(evaluation => evaluation.title === title));
    };

    //Saving evaluation marks after editing
    const handleSave = async (evalIndex) => {
        setEvaluations(tempEvaluations);

        const evaluation = tempEvaluations[evalIndex];
        console.log("EVAL", evaluation);
        const marks = evaluation.submissions.map((submission) => ({ rollNumber: submission.rollNumber, obtainedMarks: submission.obtainedMarks }));

        // To do haadiya add loading
        const data = await updateMarks(classCode, evaluation.title, marks);
        //end loading here

        populateMarks(evalIndex);
        setCreateEvalTitle("");
        setCreateEvalContent(null);
        setCreateEvalWeightage(null);
        setCreateEvalTotalMarks(null);
        setCreateEvalOpenSubmission(false);
        setEditMode(false);
    };

    //Cancel during editing
    const handleCancel = () => {
        setEditMode(false);
        setCreateEvalTitle("");
        setCreateEvalContent(null);
        setCreateEvalWeightage(null);
        setCreateEvalTotalMarks(null);
        setCreateEvalOpenSubmission(false);
        setTempEvaluations(evaluations);
    };

    const handleFileUpload = () => {
        fileInput.current.click();
    }

    const handleImportMarks = (event, evalIndex) => {
        setAnchorMarks(null);
        console.log('Starting file upload...');
        const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        if (fileTypes.indexOf(file.type) === -1) {
            console.log('Invalid file type');
            alert('Invalid file type. Please select an excel file.');
            // setDialogMessage('Invalid file type. Please select an excel file.');
            // setDialogOpen(true);
            return;
        }
        console.log('File type is valid');

        setEditMode(true);

        const fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
            console.log('File loaded');
            /* Parse data */
            const binaryString = fileLoadedEvent.target.result;
            const workbook = read(binaryString, { type: 'binary' });
            /* Get first worksheet */
            const firstWorksheetName = workbook.SheetNames[0];
            const firstWorksheet = workbook.Sheets[firstWorksheetName];
            /* Check headings */
            const headings = utils.sheet_to_json(firstWorksheet, { header: 1, range: 'A1:C1' })[0];
            if (!headings || headings.length !== 3 || headings[0] !== 'Rno' || headings[1] !== 'Name' || headings[2] !== 'Marks') {
                console.log('Invalid headings');
                alert('Invalid headings. Please make sure the headings are "Rno", "Name", and "Marks".');
                // setDialogMessage('Invalid headings. Please make sure the headings are "Rno", "Name", and "Marks".');
                // setDialogOpen(true);
                return;
            }
            console.log('Headings are valid');
            /* Convert array of arrays, ignoring header row */
            const dataFromExcel = utils.sheet_to_json(firstWorksheet, { header: 1, range: 1 });

            /* Update state */
            const updatedEvaluations = produce(evaluations, draft => {
                let evaluation = draft[evalIndex];

                dataFromExcel.forEach((row) => {
                    const rollNumber = row[0];
                    const obtainedMarks = row[2];

                    const submission = evaluation.submissions.find((submission) => submission.rollNumber == rollNumber);
                    if (submission) {
                        submission.obtainedMarks = obtainedMarks;
                    }
                });
            });

            setTempEvaluations(updatedEvaluations);

            console.log('Attendance imported');
            alert('Attendance imported successfully');
            // setDialogMessage('Attendance imported successfully');
            // setDialogOpen(true);
        };
        console.log('Reading file...');
        fileReader.readAsBinaryString(file);
    }

    //Open and close form to create new evaluation
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    //handle evaluation edit buttons
    const handleEvalEditClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEvalEditClose = () => {
        setAnchorEl(null);
    };

    const handleManageEvaluation = (evalIndex) => {
        setEditingEval(true);
        setOpenDialog(true);
        setCreateEvalTitle(evaluations[evalIndex].title);
        setCreateEvalContent(evaluations[evalIndex].content);
        setCreateEvalWeightage(evaluations[evalIndex].weightage);
        setCreateEvalTotalMarks(evaluations[evalIndex].totalMarks);
        setCreateEvalOpenSubmission(evaluations[evalIndex].dueDate ? true : false);
        setCreateEvalDueDate(evaluations[evalIndex].dueDate);

    }

    //Add new evaluation
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

    const saveEditedEval = () => {
        //MUSA CALL ENDPOINT HERE.
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
                                                    <input
                                                        type="file"
                                                        accept=".xlsx,.xls"
                                                        onChange={(event) => handleImportMarks(event, evalIndex)}
                                                        style={{ display: 'none' }}
                                                        ref={fileInput}
                                                    />
                                                    <Button variant="contained" color="primary" sx={{ marginTop: '10px' }} onClick={handleManageMarksClick} startIcon={<GradeIcon />}>
                                                        Manage Marks
                                                    </Button>
                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorMarks}
                                                        keepMounted
                                                        open={Boolean(anchorMarks)}
                                                        onClose={handleManageMarksClose}
                                                    >
                                                        <MenuItem onClick={handleFileUpload}>
                                                            <FileUploadIcon color="primary" sx={{marginRight: '5px'}} />
                                                            Import Marks
                                                        </MenuItem>
                                                        <MenuItem onClick={handleEditMarks}>
                                                            <GradingIcon color="primary" sx={{marginRight: '5px'}} />
                                                            Edit Marks
                                                        </MenuItem>
                                                    </Menu>
                                                    <Button variant="contained" color="primary" sx={{ marginTop: '10px', marginLeft: '10px' }} onClick={() => handleManageEvaluation(evalIndex)} startIcon={<EditIcon />}> Manage Evaluation </Button>
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
                                                            {evaluation.submissions?.map((submission, subIndex) => {
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
                                                                                            `${theme.palette.primary.main}1A`,
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
                                                            <Button variant="contained" color="primary" onClick={() => handleSave(evalIndex)} disabled={editMarksError}>Save</Button>
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

                { /* Adding new evaluation */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle sx={{ pb: 0 }}>
                        <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>
                            {editingEval ? "Edit Evaluation" : "Add Evaluation"}
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
                        {
                         (editingEval) ? null :
                        <FormControlLabel
                            control={
                                <Tooltip title="If you select this checkbox, a submission portal for this evaluation will be opened on the classroom.">
                                    <Checkbox checked={createEvalOpenSubmission} onChange={(e) => setCreateEvalOpenSubmission(e.target.checked)} />
                                </Tooltip>
                            }
                            label="Open Submissions"
                        />
                        }           
                        { 
                         createEvalOpenSubmission && (
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
                                onClick={editingEval ? saveEditedEval : addEvaluation}
                                disabled={!createEvalTitle || !createEvalWeightage || !createEvalTotalMarks || (createEvalOpenSubmission && !createEvalDueDate) || titleError}
                            >
                                {editingEval ? "Save Changes" : "Add"}
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>

            </Container>
        </NavBar>
    );
}

export default Evaluations;