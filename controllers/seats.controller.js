const Seat = require('../models/seat.model');

// GET all seats
exports.getAll = async (req, res) => {
    try {
        const seats = await Seat.find();
        res.json(seats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET seat by ID
exports.getById = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if (!seat) return res.status(404).json({ message: 'Seat not found' });
        res.json(seat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new seat
exports.create = async (req, res) => {
    const { day, seat, client, email } = req.body;

    // Check if seat on the same day is already taken
    const isTaken = await Seat.findOne({ day, seat });
    if (isTaken) {
        return res.status(409).json({ message: "The slot is already taken..." });
    }

    const newSeat = new Seat({ day, seat, client, email });
    try {
        const savedSeat = await newSeat.save();
        res.status(201).json({ message: 'Seat reserved!', seat: savedSeat });
    } catch (error) {
        console.error("Error reserving seat:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// PUT update seat
exports.update = async (req, res) => {
    try {
        const seat = await Seat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!seat) return res.status(404).json({ message: 'Seat not found' });
        res.json(seat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE seat
exports.delete = async (req, res) => {
    try {
        const seat = await Seat.findByIdAndDelete(req.params.id);
        if (!seat) return res.status(404).json({ message: 'Seat not found' });
        res.send('Deleted');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
