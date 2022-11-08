const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Internship = require('../models/Internship')



// @desc    Show add page
// @route   GET /internships/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('internships/add')
  })


  // @desc    Process add form
// @route   POST /internships
router.post('/', ensureAuth, async (req, res) => {
    try {
      req.body.user = req.user.id
      await Internship.create(req.body)
      res.redirect('/dashboard')
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })

  // @desc    Show all internships
// @route   GET /internships
router.get('/', ensureAuth, async (req, res) => {
    try {
      const internships = await Internship.find({ applied: 'applied' })
        .sort({ createdAt: 'desc' })
        .lean()
  
      res.render('internships/index', {
        internships,
      })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })

  // @desc    Show single internship
// @route   GET /internships/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
      let internship = await Internship.findById(req.params.id).populate('user').lean()
  
      if (!internship) {
        return res.render('error/404')
      }
  
      if (internship.user._id != req.user.id && internship.applied == 'applied') {
        res.render('error/404')
      } else {
        res.render('internships/show', {
          internship,
        })
      }
    } catch (err) {
      console.error(err)
      res.render('error/404')
    }
  })
  // @desc    Show edit page
// @route   GET /internships/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
      const internship = await Internship.findOne({
        _id: req.params.id,
      }).lean()
  
      if (!internship) {
        return res.render('error/404')
      }

       else {
        res.render('internships/edit', {
          internship,
        })
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

  // @desc    Update internship
// @route   PUT /internship/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
      let internship = await Internship.findById(req.params.id).lean()
  
      if (!internship) {
        return res.render('error/404')
      }
  
      if (internship.user != req.user.id) {
        res.redirect('/internships')
      } else {
        internship = await Internship.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })
  
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })
  
  // @desc    Delete internship
// @route   DELETE /internships/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
      let internship = await Internship.findById(req.params.id).lean()
  
      if (!internship) {
        return res.render('error/404')
      }
  
      if (internship.user != req.user.id) {
        res.redirect('/internships')
      } else {
        await Internship.remove({ _id: req.params.id })
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })
  


  module.exports = router