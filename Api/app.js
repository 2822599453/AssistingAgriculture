var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('./utils/jwt');

// 跨域
var cors = require('cors');

var userRouter = require('./routes/admin/userRouter');
var categoryRouter = require('./routes/admin/categoryRouter');
var articleRouter = require('./routes/admin/articleRouter');
var departmentRouter = require('./routes/admin/departmentRouter');
var farmerRouter = require('./routes/admin/farmerRouter');
var storeRouter = require('./routes/admin/storeRouter');
var gdpRouter = require('./routes/admin/gdpRouter');
var populationRouter = require('./routes/admin/populationRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
// token校验
// app.use((req, res, next) => {
//   console.log('req', req.headers['authorization']);
//   if (req.url === '/web/login') {
//     next();
//     return;
//   }
//   const token = req.headers['authorization'];
//   if (token) {
//     const payload = jwt.verify(token);
//     if (payload) {
//       const newToken = jwt.generate(
//         {
//           id: payload.id,
//           username: payload.username
//         },
//         '1d'
//       );
//       res.header('Authoization', newToken);
//       next();
//     } else {
//       res.status(401).send({
//         code: -1,
//         message: 'token过期了'
//       });
//     }
//   }
  
// });

app.use('/web', userRouter);
app.use('/web', categoryRouter);
app.use('/web', articleRouter);
app.use('/web', departmentRouter);
app.use('/web', farmerRouter);
app.use('/web', storeRouter);
app.use('/web', gdpRouter);
app.use('/web', populationRouter);

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

module.exports = app;
