const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  label: {
    type: String,
    required: true,
    enum: ['Home', 'Work', 'Other']
  },
  
  firstName: {
    type: String,
    required: true
  },
  
  lastName: {
    type: String,
    required: true
  },
  
  addressLine1: {
    type: String,
    required: true
  },
  
  addressLine2: {
    type: String
  },
  
  city: {
    type: String,
    required: true
  },
  
  state: {
    type: String,
    required: true
  },
  
  zipCode: {
    type: String,
    required: true
  },
  
  country: {
    type: String,
    required: true,
    default: 'India'
  },
  
  phone: {
    type: String,
    required: true
  },
  
  isDefault: {
    type: Boolean,
    default: false
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure only one default address per user
addressSchema.pre('save', function(next) {
  if (this.isDefault) {
    this.constructor.updateMany(
      { userId: this.userId, _id: { $ne: this._id } },
      { isDefault: false }
    );
  }
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Address', addressSchema); 