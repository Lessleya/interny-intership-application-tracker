const express = require('express');
const router = express.Router();

router.use('/', require('../swagger'));
router.use('/internships', require('./internships'));




module.exports = router;