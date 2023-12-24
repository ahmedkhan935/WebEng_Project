import React, { useState, Fragment } from 'react';
import { alpha, Typography, Dialog, DialogTitle, DialogContent, Checkbox, FormControlLabel, Tooltip, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Collapse, Box, Chip, Paper, DialogActions } from "@mui/material";
import { AttachFile } from '@mui/icons-material';
import NavBar from '../components/Navbar';
import { styled } from '@mui/system';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';

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
        {
            title: "Assignemnt 1", weightage: 5, totalMarks: 10, avgMarks: 5.5, minMarks: 0, maxMarks: 10, duedate: "12/12/2021",
            submissions: [
                { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: { name: "attachment.png", url: "example.com" } },
                { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: { name: "attachment.png", url: "example.com" } },
                { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: null },
            ]
        },
        {
            title: "Assignemnt 2", weightage: 5, totalMarks: 10, avgMarks: 5.5, minMarks: 0, maxMarks: 10, duedate: "12/12/2021",
            submissions: [
                { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: { name: "attachment.png", url: "example.com" } },
                { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: null },
                { rollNum: "i231216", name: "diya", obtainedMarks: 5.5, attachment: { name: "attachment.png", url: "example.com" } }
            ]
        },

    ])
    const [tempEvaluations, setTempEvaluations] = useState(evaluations); //for updating text fields and dealig with cancel, we use this
    const [open, setOpen] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const handleEditMarks = () => {
        setTempEvaluations([...evaluations]);
        setEditMode(true);
    };

    const handleSave = () => {
        setEvaluations(tempEvaluations);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleMarksChange = (event, evalIndex, subIndex) => {
        const newTempEvaluations = [...tempEvaluations];
        newTempEvaluations[evalIndex].submissions[subIndex].obtainedMarks = event.target.value;
        setTempEvaluations(newTempEvaluations);
    };


    const handleClick = (index) => {
        setOpen(prevOpen => {
            const newOpen = [...prevOpen];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });
    };


    const handleImportMarks = () => {
    }

    const [createEvalTitle, setCreateEvalTitle] = useState("");
    const [createEvalWeightage, setCreateEvalWeightage] = useState(null);
    const [createEvalTotalMarks, setCreateEvalTotalMarks] = useState(null);
    const [createEvalOpenSubmission, setCreateEvalOpenSubmission] = useState(false);
    const [createEvalDueDate, setCreateEvalDueDate] = useState(new Date());
    const [openDialog, setOpenDialog] = useState(false);
    const [titleError, setTitleError] = useState(false);

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setCreateEvalTitle(title);
        setTitleError(evaluations.some(evaluation => evaluation.title === title));
    };

    const addEvaluation = () => {
        const evaluation = {
            title: createEvalTitle,
            weightage: createEvalWeightage,
            totalMarks: createEvalTotalMarks,
            openSubmission: createEvalOpenSubmission,
            dueDate: createEvalDueDate,
        };
        // Add the evaluation to your state or database here
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

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
                                <TableHeaderCell align="right">Weightage</TableHeaderCell>
                                <TableHeaderCell align="right">Total Marks</TableHeaderCell>
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
                                        <TableSubHeaderCell align="right">{evaluation.weightage}</TableSubHeaderCell>
                                        <TableSubHeaderCell align="right">{evaluation.totalMarks}</TableSubHeaderCell>
                                        <TableSubHeaderCell align="right">{evaluation.avgMarks}</TableSubHeaderCell>
                                        <TableSubHeaderCell align="right">{evaluation.minMarks}</TableSubHeaderCell>
                                        <TableSubHeaderCell align="right">{evaluation.maxMarks}</TableSubHeaderCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={open[evalIndex]} timeout="auto" unmountOnExit>
                                                <Box margin={1}>
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
                                                                            {submission.rollNum}
                                                                        </TableCell>
                                                                        <TableCell>{submission.name}</TableCell>
                                                                        <TableCell align="left">
                                                                            {submission.attachment &&
                                                                                <Chip
                                                                                    icon={<AttachFile />}
                                                                                    label={submission.attachment.name}
                                                                                    clickable
                                                                                    component="a"
                                                                                    href={submission.attachment.url}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                />
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell align="right">{obtainedWeightage.toFixed(2)}</TableCell>
                                                                        <TableCell align="right">
                                                                            {editMode ? (
                                                                                <TextField
                                                                                    value={submission.obtainedMarks}
                                                                                    onChange={(event) => handleMarksChange(event, evalIndex, subIndex)}
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
                                                            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
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
                            error={titleError}
                            helperText={titleError ? "An evaluation item with this title already exists." : ""}
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

