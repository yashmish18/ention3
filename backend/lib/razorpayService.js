const Razorpay = require('razorpay');

class RazorpayService {
  constructor() {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    console.log('Razorpay Key ID:', keyId ? `${keyId.substring(0, 10)}...` : 'NOT FOUND');
    console.log('Razorpay Key Secret:', keySecret ? `${keySecret.substring(0, 10)}...` : 'NOT FOUND');
    
    if (!keyId || !keySecret) {
      throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables are required');
    }
    
    // Create Razorpay instance
    this.razorpay = new Razorpay({
      key_id: keyId.trim(),
      key_secret: keySecret.trim()
    });
    
    this.keySecret = keySecret.trim();
    console.log('Razorpay instance created successfully');
  }

  // Create a new order for payment
  async createOrder(orderData) {
    try {
      console.log('RazorpayService.createOrder called with:', JSON.stringify(orderData, null, 2));
      
      const options = {
        amount: Math.round(orderData.amount * 100), // Convert to paise
        currency: 'INR',
        receipt: orderData.orderNumber,
        notes: {
          order_id: orderData.orderNumber,
          product: typeof orderData.product === 'string' ? orderData.product : orderData.product.name,
          customer_name: orderData.shippingAddress && orderData.shippingAddress.firstName && orderData.shippingAddress.lastName 
            ? `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`
            : 'Customer'
        }
      };

      console.log('Razorpay options being sent:', JSON.stringify(options, null, 2));
      const razorpayOrder = await this.razorpay.orders.create(options);
      return razorpayOrder;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new Error('Unable to create payment order');
    }
  }

  // Verify payment signature
  async verifyPayment(paymentId, orderId, signature) {
    try {
      const text = orderId + '|' + paymentId;
      const crypto = require('crypto');
      const generated_signature = crypto
        .createHmac('sha256', this.keySecret)
        .update(text)
        .digest('hex');

      if (generated_signature === signature) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Payment verification failed');
    }
  }

  // Get payment details
  async getPaymentDetails(paymentId) {
    try {
      const payment = await this.razorpay.payments.fetch(paymentId);
      return payment;
    } catch (error) {
      console.error('Error fetching payment details:', error);
      throw new Error('Unable to fetch payment details');
    }
  }

  // Refund payment
  async refundPayment(paymentId, amount) {
    try {
      const refund = await this.razorpay.payments.refund(paymentId, {
        amount: Math.round(amount * 100) // Convert to paise
      });
      return refund;
    } catch (error) {
      console.error('Error refunding payment:', error);
      throw new Error('Unable to process refund');
    }
  }

  // Get payment methods available
  getPaymentMethods() {
    return {
      card: true,
      upi: true,
      netbanking: true,
      wallet: true,
      emi: true
    };
  }
}

// Create a singleton instance
let razorpayInstance = null;

function getRazorpayInstance() {
  if (!razorpayInstance) {
    razorpayInstance = new RazorpayService();
  }
  return razorpayInstance;
}

module.exports = getRazorpayInstance; 