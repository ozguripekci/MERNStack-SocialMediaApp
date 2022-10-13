const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config({ path: './config.env' });

//! DB connection
const DB = process.env.DATABASE.replace(
    '<PASSWORD>', 
    process.env.DATABASE_PASSWORD); 

mongoose
  .connect(DB, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {console.log('DB connection succesful...')});


//! MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


//! PORT
const port = 8800;
app.listen(port, ()=> {
    console.log(`Backend server is running on port ${port}...`);
})