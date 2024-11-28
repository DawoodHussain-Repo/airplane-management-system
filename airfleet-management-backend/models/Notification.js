const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Flight Update', 'Assignment Change', 'Booking Confirmation'], 
    required: true 
  },
  status: { type: String, enum: ['Unread', 'Read'], default: 'Unread' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
