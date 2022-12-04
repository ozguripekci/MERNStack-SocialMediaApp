//! 1) IMPORTS
const path = require("path");
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')
const multer = require("multer");

// Calling Error handlers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Durumu göre sadece router file inda kullaniriz.
const router = express.Router();

// Calling Routers 
//const userRoute =  require("./routes/userRoutes")
const userRoute =  require("./routes/users")
const authRoute =  require("./routes/auth")
const postRoute = require("./routes/posts")
const conversationRoute = require("./routes/conversations")
const messageRoute = require("./routes/messages")

const app = express();

//! 2) GLOBAL MIDDLEWARES
// Helmet
app.use("/images", express.static(path.join(__dirname, "public/images/")));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


// Multer for the file storage
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



//! 3) MIDDLEWARES

// Set security http headers
app.use(helmet())

// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set limit many request one IP. It prevents DDOS attacks from malware!
// Need to be configure, after 10th click on website, it doesn't take any data from db.
/* const limiter = rateLimit({
    max: 100,
    windowMs: 60*60*1000,
    message: 'Rate limit exceeded! Too many request from this IP, please try again in an hour.',
    });
    app.use('/api', limiter); */ 

// body parser, reading data from body onto req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({extended:true, limit:'10kb'}))
app.use(cookieParser())

// data sanitization again NoSql query injection
app.use(mongoSanitize());

// data sanitization agains xss
app.use(xss());

// Prevent parameter pollution
app.use(hpp( {
    whitelist : [ 
      'duration', 
      'ratingsQuality',
      'price',
      'ratingsAverage',
    ]
}))

// test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    /* console.log(req.cookies); */
    next();
});

//! 4) ROUTES

app.use("/api/posts", postRoute) 
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;