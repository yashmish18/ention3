const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const Order = require('../models/Order');

// Get addresses for a user
router.get('/addresses/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

// Save a new address
router.post('/addresses', async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    console.error('Error saving address:', error);
    res.status(500).json({ error: 'Failed to save address' });
  }
});

// Update an address
router.put('/addresses/:addressId', async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findByIdAndUpdate(addressId, req.body, { new: true });
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json(address);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'Failed to update address' });
  }
});

// Delete an address
router.delete('/addresses/:addressId', async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findByIdAndDelete(addressId);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Failed to delete address' });
  }
});

// Create a new order
router.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user's orders
router.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get a specific order
router.get('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status
router.put('/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Update payment status
router.put('/orders/:orderId/payment', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus, transactionId } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { 
      paymentStatus, 
      transactionId 
    }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Razorpay Integration Routes

// Create Razorpay order for payment
router.post('/payment/create-order', async (req, res) => {
  try {
    console.log('Received payment order request:', req.body);
    
    // Handle both direct data and nested orderData
    const orderData = req.body.orderData || req.body;
    const { amount, orderNumber, product, shippingAddress } = orderData;
    
    if (!amount || !orderNumber) {
      console.log('Missing required fields:', { amount, orderNumber });
      return res.status(400).json({ error: 'Amount and order number are required' });
    }

    // For "Coming Soon" products, use minimal amount
    const testAmount = amount === 1 ? 100 : Math.min(amount, 1000); // Use ₹100 for coming soon products (Razorpay minimum)
    
    // Use actual Razorpay service to create order
    const getRazorpayInstance = require('../lib/razorpayService');
    const razorpayService = getRazorpayInstance();
    
    const razorpayOrderData = {
      amount: testAmount,
      orderNumber: orderNumber,
      product: {
        name: product || 'ENTION Laptop'
      },
      shippingAddress: shippingAddress || {}
    };
    
    const razorpayOrder = await razorpayService.createOrder(razorpayOrderData);
    
    console.log('Created Razorpay order:', razorpayOrder);
    
    res.json({
      success: true,
      order: razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_pePfQTitk8KOIT'
    });
  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify payment
router.post('/payment/verify', async (req, res) => {
  try {
    const { paymentId, orderId, signature } = req.body;
    
    if (!paymentId || !orderId || !signature) {
      return res.status(400).json({ error: 'Payment verification data is required' });
    }

    // Use actual Razorpay service to verify payment
    const getRazorpayInstance = require('../lib/razorpayService');
    const razorpayService = getRazorpayInstance();
    const verificationResult = await razorpayService.verifyPayment(paymentId, orderId, signature);
    
    if (verificationResult.verified) {
      res.json({
        success: true,
        verified: true,
        message: 'Payment verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        verified: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Get payment methods
router.get('/payment/methods', (req, res) => {
  try {
    const methods = [
      { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
      { id: 'upi', name: 'UPI', icon: '📱' },
      { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
      { id: 'wallet', name: 'Wallet', icon: '👛' }
    ];
    res.json(methods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ error: 'Failed to fetch payment methods' });
  }
});

// Delivery Integration Routes

// Check pincode serviceability
router.get('/delivery/pincode/:pincode', async (req, res) => {
  try {
    const { pincode } = req.params;
    
    // Mock response for pincode serviceability
    // In production, you would integrate with actual delivery service API
    const serviceability = {
      pincode,
      serviceable: true,
      estimatedDays: 3,
      couriers: ['Delhivery', 'DTDC', 'BlueDart']
    };
    
    res.json(serviceability);
  } catch (error) {
    console.error('Error checking pincode serviceability:', error);
    res.status(500).json({ error: 'Failed to check pincode serviceability' });
  }
});

// Get pincode details
router.get('/delivery/pincode-details/:pincode', async (req, res) => {
  try {
    const { pincode } = req.params;
    
    // Mock response for pincode details
    const details = {
      pincode,
      city: 'Sample City',
      state: 'Sample State',
      country: 'India'
    };
    
    res.json(details);
  } catch (error) {
    console.error('Error fetching pincode details:', error);
    res.status(500).json({ error: 'Failed to fetch pincode details' });
  }
});

// Calculate shipping cost
router.post('/delivery/calculate-shipping', async (req, res) => {
  try {
    const { fromPincode, toPincode, weight = 2.5 } = req.body;
    
    // Mock shipping cost calculation
    const shippingCost = {
      cost: 150,
      estimatedDays: 3,
      courier: 'Delhivery'
    };
    
    res.json(shippingCost);
  } catch (error) {
    console.error('Error calculating shipping cost:', error);
    res.status(500).json({ error: 'Failed to calculate shipping cost' });
  }
});

// Get estimated delivery date
router.post('/delivery/estimated-delivery', async (req, res) => {
  try {
    const { fromPincode, toPincode } = req.body;
    
    // Mock estimated delivery calculation
    const estimatedDelivery = {
      estimatedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDays: 3,
      serviceable: true
    };
    
    res.json(estimatedDelivery);
  } catch (error) {
    console.error('Error getting estimated delivery:', error);
    res.status(500).json({ error: 'Failed to get estimated delivery' });
  }
});

// Validate address
router.post('/delivery/validate-address', async (req, res) => {
  try {
    const addressData = req.body;
    
    // Mock address validation
    const validation = {
      valid: true,
      suggestions: [],
      correctedAddress: addressData
    };
    
    res.json(validation);
  } catch (error) {
    console.error('Error validating address:', error);
    res.status(500).json({ error: 'Failed to validate address' });
  }
});

// Create waybill for order
router.post('/delivery/create-waybill/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Mock waybill creation
    const waybillData = {
      waybill: `WB${Date.now()}`,
      courier: 'Delhivery',
      trackingUrl: `https://www.delhivery.com/track/${Date.now()}`
    };
    
    res.json({
      success: true,
      waybill: waybillData
    });
  } catch (error) {
    console.error('Error creating waybill:', error);
    res.status(500).json({ error: 'Failed to create waybill' });
  }
});

// Track shipment
router.get('/delivery/track/:waybillNumber', async (req, res) => {
  try {
    const { waybillNumber } = req.params;
    
    // Mock tracking information
    const trackingInfo = {
      waybillNumber,
      status: 'In Transit',
      location: 'Mumbai',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      updates: [
        { status: 'Order Placed', timestamp: new Date().toISOString() },
        { status: 'Picked Up', timestamp: new Date().toISOString() },
        { status: 'In Transit', timestamp: new Date().toISOString() }
      ]
    };
    
    res.json(trackingInfo);
  } catch (error) {
    console.error('Error tracking shipment:', error);
    res.status(500).json({ error: 'Failed to track shipment' });
  }
});

// Health check for checkout service
router.get('/health', (req, res) => {
  res.json({ status: 'Checkout service is running' });
});

module.exports = router; 