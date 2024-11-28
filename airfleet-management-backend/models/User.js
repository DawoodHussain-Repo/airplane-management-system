const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const contactDetailsSchema = new mongoose.Schema({
  phone: { type: String },
  emergencyContact: { type: String },
});

const userSchema = new mongoose.Schema({
  role: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  contactDetails: contactDetailsSchema,
  travelPreferences: [String],
  loyaltyPoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
