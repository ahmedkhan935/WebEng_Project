const Thread = require("../models/Thread");
const Student = require("../models/Student");
const bucket = require("../firebase_init");
const addThread = async (req, res) => {
    if(!req.body.title) {
        {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
    }
    const thread = new Thread({
        title: req.body.title,
    
    });
    try {
        const savedThread = await thread.save();
        res.json(savedThread);
    } catch (err) {
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
            if(!thread) {
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
            const thread = await Thread.findByIdAndRemove(req.params.threadId);

        
            if(!thread) {
                return res.status(404).send({
                    message: "Thread not found with id " + req.params.threadId
                });
            }
           //all students who are enrolled in this thread students have arrray of threads
              //remove this thread from all students
                const students = await Student.find({threads:{$in: req.params.threadId}});
                for (let i = 0; i < students.length; i++) {
                    const student = students[i];
                    student.threads.pull(req.params.threadId);
                    await student.save();
                }

            res.status(200).json({ message: "Thread deleted successfully!" });
        } catch (err) {
            res.json({ message: err });
        }
    }
    const updateThread = async (req, res) => {
        try {
            const thread = await Thread.findByIdAndUpdate(req.params.threadId, {
                title: req.body.title,
                
            }, { new: true });
            if(!thread) {
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
            const thread = await Thread.findById(req.params.threadId);
            if(!thread) {
                return res.status(404).send({
                    message: "Thread not found with id " + req.params.threadId
                });
            }
            const { title, content, attachments } = req.body;
            if(!title || !content) {
                return res.status(400).send({
                    message: "Title and content cannot be empty"
                });
            }
            thread.content.push({
                title:title,
                content:content,
                attachments:attachments,
                date:Date.now()
            })
            await thread.save();
            res.status(200).json(thread);
        } catch (err) {
            res.json({ message: err });
        }
    }
    const deleteAnnouncement = async (req, res) => {
        try {

            const thread = await Thread.findById(req.params.threadId);
            if(!thread) {
                return res.status(404).send({
                    message: "Thread not found with id " + req.params.threadId
                });
            }
            const announcement = thread.content.id(req.params.announcementId);
            if(!announcement) {
                return res.status(404).send({
                    message: "Announcement not found with id " + req.params.announcementId
                });
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
            if(!thread) {
                return res.status(404).send({
                    message: "Thread not found with id " + req.params.threadId
                });
            }
            const announcement = thread.content.id(req.params.announcementId);
            if(!announcement) {
                return res.status(404).send({
                    message: "Announcement not found with id " + req.params.announcementId
                });
            }
            const { title, content, attachments } = req.body;
            announcement.title = title?title:announcement.title;
            announcement.content = content?content:announcement.content;
            announcement.attachments = attachments?attachments:announcement.attachments;
            await thread.save();
            res.status(200).json(thread);
        } catch (err) {
            res.json({ message: err });
        }
    }
    const viewAnnouncements = async (req, res) => {
        try {
            const thread = await Thread.findById(req.params.threadId);
            if(!thread) {
                return res.status(404).send({
                    message: "Thread not found with id " + req.params.threadId
                });
            }
            if(thread.content.length === 0) {
                return res.status(404).send({
                    message: "No announcements found"
                });
            }
            res.status(200).json(thread.content);
        } catch (err) {
            res.json({ message: err });
        }
    }
    const uploadFile= async (req, res) => {
        try {
           
           
            if(!req.files) {
                res.status(400).send('No file uploaded.');
                return;
            }
            const file = req.files.file;
          
            
            if (!file) {
                res.status(400).send('No file uploaded.');
                return;
            }
           
            const blob = bucket.file(file.name);
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
                console.log(err);
                res.status(404).send('File not found');
            });
            blobStream.pipe(res);
            // blobStream.on('end', () => {
            //     console.log('File downloaded.');
            // }
            // );
        } catch (err) {
            console.log(err.message);
            res.json({ message: err });
        }
    }
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

