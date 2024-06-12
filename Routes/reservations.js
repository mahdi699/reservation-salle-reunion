const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const reservationsController = require('/controllers/reservationsController');
const { ensureAuth } = require('../middleware/auth');

// Route pour ajouter une nouvelle réservation
router.post('/', ensureAuth, async (req, res) => {
  const { room, startTime, endTime } = req.body;

  // Vérifier si la salle est disponible pour la plage horaire spécifiée
  const existingReservations = await Reservation.find({
    room: room,
    $or: [
      { startTime: { $lt: endTime, $gt: startTime } },
      { endTime: { $lt: endTime, $gt: startTime } },
      { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
    ]
  });

  if (existingReservations.length > 0) {
    return res.status(400).json({ message: 'La salle est déjà réservée pour cette plage horaire' });
  }

  const reservation = new Reservation({
    user: req.user._id, // Assurez-vous que l'utilisateur est correctement ajouté ici
    room: room,
    startTime: startTime,
    endTime: endTime
  });

  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware to verify JWT token
router.use(authMiddleware.verifyToken);

// GET endpoint to fetch user's reservations
router.get('/', reservationsController.getUserReservations);

// PUT endpoint to update a reservation
router.put('/:id', reservationsController.updateReservation);

// DELETE endpoint to cancel a reservation
router.delete('/:id', reservationsController.cancelReservation);


module.exports = router;
