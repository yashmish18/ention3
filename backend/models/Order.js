const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // User information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Order details
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  
  // Product information
  product: {
    name: { type: String, required: true },
    model: { type: String, required: true }, // E3, E4, E5
    configuration: {
      ram: { type: String, required: true },
      ssd: { type: String, required: true },
      warranty: { type: String, required: true }
    },
    features: [{ type: String }],
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    discount: { type: Number, default: 0 }
  },
  
  // Shipping information
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
  },
  
  // Payment information
  payment: {
    method: { type: String, required: true }, // 'card', 'upi', 'cod'
    status: { type: String, default: 'pending' }, // 'pending', 'completed', 'failed'
    transactionId: { type: String },
    upiApp: { type: String }, // for UPI payments
    upiId: { type: String }, // for UPI payments
    cardDetails: {
      last4: { type: String },
      brand: { type: String }
    }
  },
  
  // Order status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  
  // Delivery information
  delivery: {
    estimatedDate: { type: Date },
    trackingNumber: { type: String },
    courier: { type: String }
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate order number
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `ENTION-${timestamp}-${random}`;
  }
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Order', orderSchema); 