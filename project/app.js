//built npm module imports
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');
const app = express();

//built custom module imports
const _config = require('../project/app/helper/config');
const _userRouter=require('./app/router/userRouter');
const _authrouter=require('./app/router/authrouter')



app.set('port', _config.serverPort || 5000)

app.use(morgan('dev'))
//app.use(cors({ credentials:true, origin: process.env.CORS_ORIGIN }))
app.use(cors({ credentials:true, origin:'http://localhost:4200' }))

app.use(cookieParser())
app.use(express.json({ limit: '5000mb' }));
app.use(express.static(path.join(__dirname+'/uploads')));
app.use(express.urlencoded())
app.use('/auth', _authrouter)
app.use('/users',_userRouter)

app.listen(app.get('port'), () =>
  console.log(`http://localhost:${app.get('port')}`)
)
