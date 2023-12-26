//Basic server setup using node
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bucket = require("./firebase_init");
const serverless = require("serverless-http");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

//error handling in case cannot connect to database
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(
  cors({
    origin:["http://localhost:3000","https://web-eng-project.vercel.app"],
    credentials: true, // include credentials
  })
);

const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const authRouter = require("./routes/authRoutes");
const threadRouter = require("./routes/threadRoutes");
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/auth", authRouter);
app.use("/thread", threadRouter);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "fb71459@gmail.com",
    pass: "phph yuzs zwhl wohj",
  },
});

app.post("/admin/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
  console.log(to, subject, text);

  const mailOptions = {
    from: "fb71459@gmail.com",
    to,
    subject,
    text,
  };

  //sending the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true });
    }
  });
});

const port = 3000;
app.listen(port, () =>
  console.log("Server is running, Listening on port " + port)
);