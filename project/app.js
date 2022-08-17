//built in npm module imports
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path');
const app = express();

//custom module imports
const _config = require('../project/app/helper/config');
const _userRouter=require('./app/router/userRouter');
const _authrouter=require('./app/router/authrouter');
const { errorMiddleware, notFound }=require('./app/middleware/ErrorHandlerMiddleWare')


// middleware list
//app.use(cors({ credentials:true, origin: process.env.CORS_ORIGIN }))

app.use(cors({ credentials:true, origin:'http://localhost:4200' }))
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json({ limit: '5000mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname+'/uploads')));
dotenv.config();

//route middleware list
app.use('/auth', _authrouter)
app.use('/users',_userRouter)

// error and not-found route middleware
app.use(notFound);
app.use(errorMiddleware);

app.set('port', _config.serverPort || 5000)
app.listen(app.get('port'), () =>
  console.log(`http://localhost:${app.get('port')}`)
)
