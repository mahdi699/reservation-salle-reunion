const Reservation = require('/models/reservation');

// Permettre aux utilisateurs de consulter leurs réservations existantes
const getUserReservations = async (req, res) => {
    try {
        // Find reservations associated with the logged-in user
        const userId = req.userId;
        const reservations = await Reservation.find({ user: userId });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Permettre aux utilisateurs de modifier une réservation existante
const updateReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Permettre aux utilisateurs d'annuler une réservation existante
const cancelReservation = async (req, res) => {
    const { id } = req.params;
    try {
        await Reservation.findByIdAndDelete(id);
        res.json({ message: 'Reservation canceled successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getUserReservations,
    updateReservation,
    cancelReservation
};
