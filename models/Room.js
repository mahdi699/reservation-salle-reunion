const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  equipment: {
    type: [String],
    required: true
  },
  available: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Room', RoomSchema);
