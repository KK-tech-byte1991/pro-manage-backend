let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongoose = require("mongoose")
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
const bodyParser = require("body-parser");
const uri = "mongodb+srv://kishor:Durva@cluster0.mirndhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uri = "mongodb://127.0.0.1:27017/test"
const swagger = require('./swagger')
let app = express();
const toDoRoute = require('./routes/toDos')
const { createUser, loginUser, authMiddleware } = require("./controllers/user")
// view engine setup


let cors = require('cors');
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a simple message
 *     responses:
 *       200:
 *         description: A simple message
 */

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// app.use('/', indexRouter);

/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to request all users
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.use('/users', usersRouter);
/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to request all toddos
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.use("/todo", authMiddleware, toDoRoute)
swagger(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



mongoose.connect(uri).then(() => console.log("Database connected"))

  .catch((err) => console.log(err));
module.exports = app;
