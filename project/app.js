//built in npm module imports
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');
const createError = require('http-errors');
const app = express();

//built custom module imports
const _config = require('../project/app/helper/config');
const _userRouter=require('./app/router/userRouter');
const _authrouter=require('./app/router/authrouter');
const _projectMiddleware=require('./app/middleware/projectMiddleware')
const _errorHandlerMiddleWare=require('./app/middleware/ErrorHandlerMiddleWare')

app.set('port', _config.serverPort || 5000)

//app.use(cors({ credentials:true, origin: process.env.CORS_ORIGIN }))
app.use(cors({ credentials:true, origin:'http://localhost:4200' }))
app.use(logger('dev'));
app.use(express.json({ limit: '5000mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname+'/uploads')));

app.use(_projectMiddleware);

app.use('/auth', _authrouter)
app.use('/users',_userRouter)

app.use(_errorHandlerMiddleWare);





app.listen(app.get('port'), () =>
  console.log(`http://localhost:${app.get('port')}`)
)
