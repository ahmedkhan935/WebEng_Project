//Basic server setup using node
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.listen(port, () => {
    console.log("Server is running, Listening on port " + port);
});
