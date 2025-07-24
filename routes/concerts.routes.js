const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

// GET all concerts
router.get('/concerts', ConcertController.getAll);

// GET concert by ID
router.get('/concerts/:id', ConcertController.getById);

// POST new concert
router.post('/concerts', ConcertController.create);

// PUT update concert
router.put('/concerts/:id', ConcertController.update);

// DELETE concert
router.delete('/concerts/:id', ConcertController.delete);

module.exports = router;
