const express = require('express');
const router = express.Router();
const db = require('./../db');

// GET all testimonials
router.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

// GET testimonial by ID
router.get('/testimonials/:id', (req, res) => {
    const testimonial = db.testimonials.find(t => t.id == req.params.id);
    testimonial ? res.json(testimonial) : res.status(404).send('Not found');
});

// POST new testimonial
router.post('/testimonials', (req, res) => {
    const newTestimonial = { id: db.testimonials.length + 1, ...req.body };
    db.testimonials.push(newTestimonial);
    res.json(newTestimonial);
});

// PUT update testimonial
router.put('/testimonials/:id', (req, res) => {
    const testimonial = db.testimonials.find(t => t.id == req.params.id);
    if (testimonial) {
        Object.assign(testimonial, req.body);
        res.json(testimonial);
    } else res.status(404).send('Not found');
});

// DELETE testimonial
router.delete('/testimonials/:id', (req, res) => {
    const index = db.testimonials.findIndex(t => t.id == req.params.id);
    if (index !== -1) {
        db.testimonials.splice(index, 1);
        res.send('Deleted');
    } else res.status(404).send('Not found');
});

module.exports = router;