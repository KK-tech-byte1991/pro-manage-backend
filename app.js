let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongoose = require("mongoose")
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let boardRouter = require("./routes/board")
const bodyParser = require("body-parser");
const uri = "mongodb+srv://kishor:Durva@cluster0.mirndhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uri = "mongodb://127.0.0.1:27017/test"
const swagger = require('./swagger')
let app = express();
const toDoRoute = require('./routes/toDos')
const { authMiddleware } = require("./controllers/user")



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


app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.use('/users', usersRouter);

app.use("/todo", authMiddleware, toDoRoute)

app.use("/board", authMiddleware, boardRouter)
swagger(app)


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
