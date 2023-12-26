const Thread = require("../models/Thread");
const Student = require("../models/Student");
const bucket = require("../firebase_init");
const path = require('path');
const Teacher   = require("../models/Teacher");
const addThread = async (req, res) => {
    if (!req.body.title) {
        {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
    }
    const thread = new Thread({
        title: req.body.title,

    });
    const students=await Student.find();
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        student.threads.push({threadId:thread._id});
        await student.save();
    }
    const teacher = await Teacher.find();
    for (let i = 0; i < teacher.length; i++) {

        teacher[i].threads.push({threadId:thread._id});
        await teacher[i].save();
        }
    try {
        const savedThread = await thread.save();
        res.status(200).json(savedThread);
    }
    catch (err) {
        res.json({ message: err });
    }
}
const getThreads = async (req, res) => {
    try {
        const threads = await Thread.find();
        res.status(200).json(threads);
    } catch (err) {
        res.json({ message: err });
    }
}
const getThread = async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.threadId);
        if (!thread) {
            return res.status(404).send({
                message: "Thread not found with id " + req.params.threadId
            });
        }
        res.status(200).json(thread);
    } catch (err) {
        res.json({ message: err });
    }
}
const deleteThread = async (req, res) => {
    try {
        const thread = await Thread.findByIdAndDelete(req.params.id);


        if (!thread) {
            return res.status(404).send({
                message: "Thread not found with id " + req.params.threadId
            });
        }
        //all students who are enrolled in this thread students have arrray of threads
        //remove this thread from all students
        const students = await Student.find({ threads: { $in: req.params.threadId } });
        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            student.threads.pull(req.params.threadId);
            await student.save();
        }
        //remove this thread from all teachers
        const teachers = await Teacher.find({ threads: { $in: req.params.threadId } });
        for (let i = 0; i < teachers.length; i++) {
            const teacher = teachers[i];
            teacher.threads.pull(req.params.threadId);
            await teacher.save();
        }


        res.status(200).json({ message: "Thread deleted successfully!" });
    } catch (err) {
        res.json({ message: err.message });
    }
}
const updateThread = async (req, res) => {
    try {
        const thread = await Thread.findByIdAndUpdate(req.params.id, {
            title: req.body.title,

        }, { new: true });
        if (!thread) {
            return res.status(404).send({
                message: "Thread not found with id " + req.params.threadId
            });
        }
        res.status(200).json(thread);
    } catch (err) {
        res.json({ message: err });
    }
}
const addAnnouncement = async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.id);
        if (!thread) {
            return res.status(404).send({
                message: "Thread not found with id " + req.params.id
            });
        }
        const { title, content, attachments } = req.body;
        if (!title || !content) {
            return res.status(400).send({
                message: "Title and content cannot be empty"
            });
        }

        //upload file 
        const file = req.files ? req.files.file : null;
        var fileName = null;
        if (file) {
            //add timestamp to file name only excluding path
            const fileExtension = path.extname(file.name);
            const fileNameWithoutExtension = path.basename(file.name, fileExtension);
            fileName = `${fileNameWithoutExtension}-${Date.now()}${fileExtension}`;
            
            const blob = bucket.file(fileName);
            const blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });
            blobWriter.on('error', ((err) => {

                res.status(404).send('File couldnot be uploaded');
            }));
            blobWriter.on('finish', async () => {
                await blob.makePublic();
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                // Return the file name and its public URL

            });
            blobWriter.end(file.data);
        }







        const announcement = {
            title: title,
            content: content,
            attachments: {

                orignalName: file ? file.name : null,
                name: file ? fileName : null

            },
            date: Date.now()
        };

        thread.content.push(
            announcement

        )
        await thread.save();
        res.status(200).json(thread.content[thread.content.length - 1]);
    } catch (err) {


        res.json({ message: err });
    }
}
const deleteAnnouncement = async (req, res) => {
    try {

        const thread = await Thread.findById(req.params.threadId);
        if (!thread) {
            return res.status(404).send({
                message: "Thread not found with id " + req.params.threadId
            });
        }
        const announcement = thread.content.id(req.params.announcementId);
        if (!announcement) {
            return res.status(404).send({
                message: "Announcement not found with id " + req.params.announcementId
            });
        }
        //remove file from firebase
        if (announcement.attachments.name) {
            const file = bucket.file(announcement.attachments.name);
            await file.delete();
        }
        thread.content.pull(announcement);
        await thread.save();
        res.status(200).json(thread);
    } catch (err) {
        res.json({ message: err });
    }
}
const updateAnnouncement = async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.threadId);
        if (!thread) {
            return res.status(404).send({
                message: "Thread not found with id " + req.params.threadId
            });
        }
        const deleteFile = req.body.deleteFile;

        const announcement = thread.content.id(req.params.announcementId);
        console.log(announcement);
        if (!announcement) {
            return res.status(404).send({
                message: "Announcement not found with id " + req.params.announcementId
            });
        }
        const { title, content } = req.body;
        announcement.title = title ? title : announcement.title;
        announcement.content = content ? content : announcement.content;
        //check for new file
        const file = req.files ? req.files.file : null;
        if (deleteFile) {
            //remove old file
            if (announcement.attachments.name) {
                const file = bucket.file(announcement.attachments.name);
                await file.delete();
                announcement.attachments.orignalName = null;
                announcement.attachments.name = null;
            }
        }
        if (file) {


            //remove old file
            if (announcement.attachments.name) {
                const file = bucket.file(announcement.attachments.name);
                await file.delete();
            }
            //upload new file
            var fileName = file.name + '-' + Date.now();
            const blob = bucket.file(fileName);
            const blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });
            blobWriter.on('error', ((err) => {

                res.status(404).send('File couldnot be uploaded');
            }));
            blobWriter.on('finish', async () => {
                await blob.makePublic();

                // Return the file name and its public URL

            });
            blobWriter.end(file.data);
            announcement.attachments.orignalName = file.name;
            announcement.attachments.name = fileName;
        }
        await thread.save();
        res.status(200).json(thread);
    } catch (err) {
        //stop uploading file if error occurs
        if (file) {
            const file = bucket.file(fileName);
            await file.delete();
        }
        res.json({ message: err.message });
    }
}
const viewAnnouncements = async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.threadId);
        if (!thread) {
            return res.status(404).send({
                message: "Thread not found with id " + req.params.threadId
            });
        }
        if (thread.content.length === 0) {
            return res.status(404).send({
                message: "No announcements found"
            });
        }
        res.status(200).json(thread.content);
    } catch (err) {
        res.json({ message: err });
    }
}
const uploadFile = async (req, res) => {
    try {

        const { threadid, announcementid } = req.body;
        const thread = await Thread.findById(threadid);
        if (!thread) {
            return res.status(404).send({
                message: "Thread not found with id " + threadid
            });
        }
        const announcement = thread.content.id(announcementid);
        if (!announcement) {
            return res.status(404).send({
                message: "Announcement not found with id " + announcementid
            });
        }
        if (!req.files) {
            res.status(400).send('No file uploaded.');
            return;
        }
        const file = req.files.file;


        if (!file) {
            res.status(400).send('No file uploaded.');
            return;
        }

        const blob = bucket.file(file.name + '-' + Date.now());
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },

        });
        blobWriter.on('error', (err) => next(err));
        blobWriter.on('finish', async () => {
            await blob.makePublic();
            // Assembling public URL for accessing the file via HTTP
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            // Return the file name and its public URL
            res.status(200).send({ fileName: file.name, fileLocation: publicUrl });
        });
        blobWriter.end(file.data);
    } catch (err) {
        console.log(err.message);
        res.json({ message: err });
    }
}

const downloadFile = async (req, res) => {
    try {
        const file = bucket.file(req.params.fileName);
        const blobStream = file.createReadStream();

        blobStream.on('error', (err) => {
            console.error(err);
            return res.status(404).json({message:'File not found'});
        });

      
        res.setHeader('Content-Type', 'application/octet-stream;,charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${req.params.fileName}; filename*=${req.params.fileName}"`);

        blobStream.pipe(res);

        blobStream.on('end', () => {
            return res.status(200).end();
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    addThread,
    getThreads,
    getThread,
    deleteThread,
    updateThread,
    addAnnouncement,
    deleteAnnouncement,
    updateAnnouncement,
    viewAnnouncements,
    uploadFile,
    downloadFile

}

