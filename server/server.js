//Basic server setup using node
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const bucket = require("./firebase_init");

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

  //error handling in case cannot connect to database
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

mongoose.connection.on('connected', () => {
    console.log('Connected to database');
});

const app = express();
app.use(cookieParser());
app.use(express.json());    
app.use(fileUpload());
app.use(cors({
  origin: 'http://localhost:5000', // specify the origin
  credentials: true // include credentials
}));


const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const authRouter = require('./routes/authRoutes');
const threadRouter = require('./routes/threadRoutes');
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/auth', authRouter);
app.use('/thread', threadRouter);

app.post('/', async (req, res) => {
    try {
           
        
        if(!req.files) {
            res.status(400).send('No file uploaded.');
            return;
        }
        const file = req.files.xyz
        ;
        console.log(file);
        if (!file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        const blob = bucket.file(file.originalname);
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
        blobWriter.on('error', (err) => next(err));
        blobWriter.on('finish', () => {
            // Assembling public URL for accessing the file via HTTP
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            // Return the file name and its public URL
            res.status(200).send({ fileName: file.originalname, fileLocation: publicUrl });
        });
        blobWriter.end(file.buffer);
    } catch (err) {
        console.log(err.message);
        res.json({ message: err });
    }
});

const port = 3000;
app.listen(port, () => console.log("Server is running, Listening on port " + port));