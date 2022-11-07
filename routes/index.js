const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./docs'));
router.use('/internships', require('./internships'));



module.exports = router;