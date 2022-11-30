//! server.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');


//! Throwing exception message to API!
process.on('uncaughtException', err => {
  console.log('Uncaught EXCEPTION! 🔥 Shutting Down...')
  console.log(err.name, err.message);
  process.exit(1);
})


dotenv.config({ path: './config.env' });

//! DB connection
const DB = process.env.DATABASE.replace(
    '<PASSWORD>', 
    process.env.DATABASE_PASSWORD); 

mongoose
  .connect(DB, { 
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {console.log('DB connection succesful...')});


//! PORT
const port = 8800;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})


//! IF the PORT process in not goes well...
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 🔥 Shutting Down...')
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    }) 
  })
