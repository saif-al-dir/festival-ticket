const Testimonial = require('../models/testimonial.model');

// GET all testimonials
exports.getAll = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET testimonial by ID
exports.getById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
        res.json(testimonial);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new testimonial
exports.create = async (req, res) => {
    const newTestimonial = new Testimonial(req.body);
    try {
        const savedTestimonial = await newTestimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT update testimonial
exports.update = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
        res.json(testimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE testimonial
exports.delete = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
        res.send('Deleted');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
