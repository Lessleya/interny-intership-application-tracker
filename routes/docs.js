const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// router.use('/api-docs', require('./docs'))

module.exports = router;