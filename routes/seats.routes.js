const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

// GET all seats
router.get('/seats', SeatController.getAll);

// GET seat by ID
router.get('/seats/:id', SeatController.getById);

// POST new seat
router.post('/seats', SeatController.create);

// PUT update seat
router.put('/seats/:id', SeatController.update);

// DELETE seat
router.delete('/seats/:id', SeatController.delete);

module.exports = router;
