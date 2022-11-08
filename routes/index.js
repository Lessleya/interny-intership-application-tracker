
const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')


const Internship = require('../models/Internship')
// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
      layout: 'login',
    })
  })

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
      const internships = await Internship.find({ user: req.user.id }).lean()
      res.render('dashboard', {
        name: req.user.firstName,
        internships,
      })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })

  router.use('/api-docs', require('./docs'));

module.exports = router;