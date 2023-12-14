const Semester = require('../models/Semester');

const validateSemesterFields = (req) => {
    const { name, year, startDate, endDate, isCurrent } = req.body;

    if (!name || !year || !startDate) {
        throw new Error('Please provide values for name, year, and startDate.');
    }
    if(!isCurrent)
    {
        isCurrent = true;
    }

    return {
        name,
        year,
        startDate,
        endDate,
        isCurrent,
    };
};

const createSemester = async (req, res) => {
    try {
        const validatedFields = validateSemesterFields(req);
        const semester = new Semester(validatedFields);
        const savedSemester = await semester.save();
        res.status(201).json(savedSemester);
    } catch (error) {
        console.error(error);
        res.status(400).json({ errorMessage: error.message || 'Invalid input' });
    }
};

const getAllSemesters = async (req, res) => {
    try {
        const semesters = await Semester.find();
        res.status(200).json(semesters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Internal server error' });
    }
};

const getSemesterById = async (req, res) => {
    try {
        const semester = await Semester.findById(req.params.id);
        if (!semester) {
            return res.status(404).json({ errorMessage: 'Semester not found' });
        }
        res.status(200).json(semester);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Internal server error' });
    }
};

const updateSemesterById = async (req, res) => {
    try {
        const validatedFields = validateSemesterFields(req);    
        const semester = await Semester.findByIdAndUpdate(req.params.id, validatedFields, { new: true });
        if (!semester) {
            return res.status(404).json({ errorMessage: 'Semester not found' });
        }
        res.status(200).json(semester);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Internal server error' });
    }
};

const deleteSemesterById = async (req, res) => {
    try {
        const semester = await Semester.findByIdAndDelete(req.params.id);
        if (!semester) {
            return res.status(404).json({ errorMessage: 'Semester not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Internal server error' });
    }
};

const markFinished = async (req, res) => {
    try {
        const semester = await Semester.findByIdAndUpdate(req.params.id, { isCurrent: false,endDate:Date.now() }, { new: true });
        if (!semester) {
            return res.status(404).json({ errorMessage: 'Semester not found' });
        }
        res.status(200).json(semester);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Internal server error' });
    }
};

module.exports = {
    createSemester,
    getAllSemesters,
    getSemesterById,
    updateSemesterById,
    deleteSemesterById,
    markFinished,
};
