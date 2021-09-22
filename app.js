var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool = require('./modelos/bd');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/productos');
var contactoRouter = require('./routes/contacto');
var nosotrosRouter = require('./routes/nosotros');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/productos');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', productosRouter);
app.use('/contacto', contactoRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/productos', adminRouter);
// app.use ('admin/productos', secured, adminproductosRouter)

// secured = async(req,res,next) => {
//   try{
//     console.log(req.session.id_usuario){
//       next();
//     } else {
//       res.redirect('admin/login');
//     }
//   } catch (error){
//     console.log(error);
//   }
// }

// select 
// pool.query('select * from empleados').then(function (resultados) {
//   console.log(resultados)
// });

// fin select

// insert

// var obj = {
//   nombre: 'Juan',
//   apellido: 'Garcia',
//   trabajo: 'Programador',
//   edad: 25,
//   salario: 45000,
//   mail: 'juanlpz@gmail.com',
// }

// pool.query('insert into empleados set ?', [obj]).then(function (resultados) {
//   console.log(resultados)
// });

// fin insert

// update

// var id = 5
// var obj = {
//   nombre: 'Agustin',
//   apellido: 'Fernandez',
// }

// pool.query('update empleados set ? where id_emp=?',
// [obj, id]).then(function (resultados){
// console.log(resultados);
// });

// fin update

// delete

// var id = 26;

// pool.query('delete from empleados where id_emp=?',
// [id]).then(function(resultados){
// console.log(resultados);
// });

// fin delete


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
