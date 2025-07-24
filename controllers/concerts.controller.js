const Concert = require('../models/concert.model');

// GET all concerts
exports.getAll = async (req, res) => {
    try {
        const concerts = await Concert.find();
        res.json(concerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET concert by ID
exports.getById = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) return res.status(404).json({ message: 'Concert not found' });
        res.json(concert);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new concert
exports.create = async (req, res) => {
    const newConcert = new Concert(req.body);
    try {
        const savedConcert = await newConcert.save();
        res.status(201).json(savedConcert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT update concert
exports.update = async (req, res) => {
    try {
        const concert = await Concert.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!concert) return res.status(404).json({ message: 'Concert not found' });
        res.json(concert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE concert
exports.delete = async (req, res) => {
    try {
        const concert = await Concert.findByIdAndDelete(req.params.id);
        if (!concert) return res.status(404).json({ message: 'Concert not found' });
        res.send('Deleted');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
