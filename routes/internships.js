const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Internship')



// @desc    Show add page
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('internships/add')
  })


  module.exports = router