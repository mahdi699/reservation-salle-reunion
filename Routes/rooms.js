const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Route pour récupérer toutes les salles de réunion
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour ajouter une nouvelle salle de réunion
router.post('/', async (req, res) => {
  const room = new Room({
    name: req.body.name,
    capacity: req.body.capacity,
    equipment: req.body.equipment,
    available: req.body.available
  });

  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
