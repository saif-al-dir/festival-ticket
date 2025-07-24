const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

// GET all testimonials
router.get('/testimonials', TestimonialController.getAll);

// GET testimonial by ID
router.get('/testimonials/:id', TestimonialController.getById);

// POST new testimonial
router.post('/testimonials', TestimonialController.create);

// PUT update testimonial
router.put('/testimonials/:id', TestimonialController.update);

// DELETE testimonial
router.delete('/testimonials/:id', TestimonialController.delete);

module.exports = router;
