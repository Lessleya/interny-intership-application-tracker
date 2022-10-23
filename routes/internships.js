const express = require('express');
const router = express.Router();

const internshipsController = require('../controllers/internships');

router.get('/', internshipsController.getAll);

router.get('/:id', internshipsController.getSingle);

router.post('/', internshipsController.createInternships);

router.put('/:id', internshipsController.updateInternships);

router.delete('/:id', internshipsController.deleteInternships);

module.exports = router;