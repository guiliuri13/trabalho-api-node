let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

let employeeRouter = require('./routes/employee');
let employerRouter = require('./routes/employer');
let pontoRouter = require('./routes/pontos');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOption = {
  origin: '*',
};

app.use(cors(corsOption));

app.use('/employee', employeeRouter);
app.use('/employer', employerRouter);
app.use('/ponto', pontoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// log de inicialização
console.log('Servidor iniciado na porta 3000');

module.exports = app;
