const express = require('express');
const router = express.Router();

const internshipsController = require('../controllers/internships');

router.get('/', internshipsController.getAll);

router.get('/:id', internshipsController.getSingle);

router.post('/', internshipsController.createInternship);

router.put('/:id', internshipsController.updateInternship);

router.delete('/:id', internshipsController.deleteInternship);

module.exports = router;