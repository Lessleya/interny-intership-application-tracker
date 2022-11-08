const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const path = require('path')
const methodOverride = require('method-override')

const MongoStore = require('connect-mongo');


// Load config
dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)


connectDB()

const app = express()


// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) 

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)
// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// Handlebars Helpers

const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs')

//Handlebars

app.engine ( '.hbs', exphbs.engine({ helpers: {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
}, defaultLayaout: 'main', extname: '.hbs'}))
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

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

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