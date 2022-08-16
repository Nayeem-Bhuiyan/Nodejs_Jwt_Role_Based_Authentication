const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');
const _config = require('../project/app/helper/config');

const app = express()

app.set('port', _config.serverPort || 5000)

app.use(morgan('dev'))
//app.use(cors({ credentials:true, origin: process.env.CORS_ORIGIN }))
app.use(cors({ credentials:true, origin:'http://localhost:4200' }))

app.use(cookieParser())
app.use(express.json({ limit: '5000mb' }));
app.use(express.static(path.join(__dirname+'/uploads')));
app.use(express.urlencoded())
app.use('/auth', require('./app/router/authrouter'))
app.use('/users', require('./app/router/userRouter'))

app.listen(app.get('port'), () =>
  console.log(`http://localhost:${app.get('port')}`)
)
