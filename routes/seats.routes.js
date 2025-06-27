const express = require('express');
const router = express.Router();
const db = require('./../db');

// GET all seats
router.get('/seats', (req, res) => {
    res.json(db.seats);
});

// GET seat by ID
router.get('/seats/:id', (req, res) => {
    const seat = db.seats.find(seat => seat.id == req.params.id);
    seat ? res.json(seat) : res.status(404).send('Not found');
});

// POST new seat
router.post('/seats', (req, res) => {
    try {
        const { day, seat, client, email } = req.body;

        // Check if seat on same day is already taken
        const isTaken = db.seats.some(
            (s) => s.day === day && s.seat === seat
        );

        if (isTaken) {
            return res.status(409).json({ message: "The slot is already taken..." });
        }

        const newSeat = {
            id: db.seats.length + 1,
            day,
            seat,
            client,
            email
        };

        db.seats.push(newSeat);
        res.status(201).json({ message: 'Seat reserved!', seat: newSeat });
    } catch (error) {
        console.error("Error reserving seat:", error);
        res.status(500).json({ message: "Internal server error" });
    }

});

// PUT update seat
router.put('/seats/:id', (req, res) => {
    const seat = db.seats.find(seat => seat.id == req.params.id);
    if (seat) {
        Object.assign(seat, req.body);
        res.json(seat);
    } else res.status(404).send('Not found');
});

// DELETE seat
router.delete('/seats/:id', (req, res) => {
    const index = db.seats.findIndex(seat => seat.id == req.params.id);
    if (index !== -1) {
        db.seats.splice(index, 1);
        res.send('Deleted');
    } else res.status(404).send('Not found');
});

module.exports = router;