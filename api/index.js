const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require("multer");
const router = express.Router();
const path = require("path");

const userRoute =  require("./routes/users")
const authRoute =  require("./routes/auth")
const postRoute = require("./routes/posts")

const conversationRoute = require("./routes/conversations")
const messageRoute = require("./routes/messages")



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

app.use("/images", express.static(path.join(__dirname, "public/images/")));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (err) {
    console.error(err);
  }
});

//! MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/posts", postRoute) 
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)



//! PORT
const port = 8800;
app.listen(port, ()=> {
    console.log(`Backend server is running on port ${port}...`);
})