const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const port = 8800;
app.listen(port, ()=> {
    console.log(`Backend server is running on port ${port}...`);
})