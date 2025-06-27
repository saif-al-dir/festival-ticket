const express = require('express');
const router = express.Router();
const db = require('./../db');

// GET all concerts
router.get('/concerts', (req, res) => {
    res.json(db.concerts);
});

// GET concert by ID
router.get('/concerts/:id', (req, res) => {
    const concert = db.concerts.find(con => con.id == req.params.id);
    concert ? res.json(concert) : res.status(404).send('Not found');
});

// POST new concert
router.post('/concerts', (req, res) => {
    const newConcert = { id: db.concerts.length + 1, ...req.body };
    db.concerts.push(newConcert);
    res.json(newConcert);
});

// PUT update concert
router.put('/concerts/:id', (req, res) => {
    const concert = db.concerts.find(con => con.id == req.params.id);
    if (concert) {
        Object.assign(concert, req.body);
        res.json(concert);
    } else res.status(404).send('Not found');
});

// DELETE concert
router.delete('/concerts/:id', (req, res) => {
    const index = db.concerts.findIndex(con => con.id == req.params.id);
    if (index !== -1) {
        db.concerts.splice(index, 1);
        res.send('Deleted');
    } else res.status(404).send('Not found');
});

module.exports = router;