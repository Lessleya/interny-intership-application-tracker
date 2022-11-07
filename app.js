const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const path = require('path')

const MongoStore = require('connect-mongo');


// Load config
dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)


connectDB()

const app = express()

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Handlebars

app.engine ( '.hbs', exphbs.engine({defaultLayaout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
const PORT = process.env.PORT || 3000

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,})
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/internships', require('./routes/internships'))

// Static folder
app.use(express.static(path.join(__dirname, 'public')))


app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)