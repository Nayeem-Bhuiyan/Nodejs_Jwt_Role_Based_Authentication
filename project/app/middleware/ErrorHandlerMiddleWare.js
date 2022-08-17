const errorResponse = {}
// catch 404 and forward to error handler
errorResponse.error = async (req, res, next) => {
    next(createError(404));
  };

// error handler
errorResponse.errorHandler = async (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
};

  module.exports = errorResponse;