const axios = require('axios');

class DelhiveryService {
  constructor() {
    this.apiKey = process.env.DELHIVERY_API_KEY;
    this.baseURL = 'https://track.delhivery.com/api';
    this.baseURLV3 = 'https://api.delhivery.com/v3';
    
    if (!this.apiKey) {
      throw new Error('DELHIVERY_API_KEY environment variable is required');
    }
  }

  // Get Pincode Details
  async getPincodeDetails(pincode) {
    try {
      const response = await axios.get(`${this.baseURL}/pin/${pincode}`, {
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching pincode details:', error.response?.data || error.message);
      throw new Error('Unable to fetch pincode details');
    }
  }

  // Check Pincode Serviceability
  async checkPincodeServiceability(pincode) {
    try {
      const response = await axios.get(`${this.baseURL}/pin/${pincode}`, {
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = response.data;
      if (data && data.length > 0) {
        const pincodeData = data[0];
        return {
          serviceable: pincodeData.delivery_status === 'Delivery',
          city: pincodeData.city,
          state: pincodeData.state,
          district: pincodeData.district,
          postOffice: pincodeData.postOffice
        };
      }
      return { serviceable: false };
    } catch (error) {
      console.error('Error checking pincode serviceability:', error.response?.data || error.message);
      return { serviceable: false };
    }
  }

  // Calculate Shipping Cost
  async calculateShippingCost(fromPincode, toPincode, weight = 2.5) {
    try {
      const response = await axios.post(`${this.baseURLV3}/shipment/rate`, {
        from_pincode: fromPincode,
        to_pincode: toPincode,
        weight: weight,
        cod: 0
      }, {
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error calculating shipping cost:', error.response?.data || error.message);
      throw new Error('Unable to calculate shipping cost');
    }
  }

  // Create Waybill
  async createWaybill(orderData) {
    try {
      const waybillData = {
        shipment: {
          pickup_location: {
            name: "ENTION Laptops",
            address: "ENTION Office",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001",
            phone: "+91 98765 43210"
          },
          delivery_location: {
            name: `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`,
            address: orderData.shippingAddress.addressLine1,
            city: orderData.shippingAddress.city,
            state: orderData.shippingAddress.state,
            pincode: orderData.shippingAddress.zipCode,
            phone: orderData.shippingAddress.phone
          },
          package_details: {
            weight: 2.5,
            dimensions: "30x20x5",
            declared_value: orderData.product.price || 1
          },
          payment_mode: orderData.payment.method === 'cod' ? 'COD' : 'Prepaid',
          order: orderData.orderNumber,
          sub_order: orderData.orderNumber,
                      total_amount: orderData.product.price || 1,
            cod_amount: orderData.payment.method === 'cod' ? (orderData.product.price || 1) : 0
        }
      };

      const response = await axios.post(`${this.baseURLV3}/shipment/create`, waybillData, {
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error creating waybill:', error.response?.data || error.message);
      throw new Error('Unable to create waybill');
    }
  }

  // Track Shipment
  async trackShipment(waybillNumber) {
    try {
      const response = await axios.get(`${this.baseURL}/track?waybill=${waybillNumber}`, {
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error tracking shipment:', error.response?.data || error.message);
      throw new Error('Unable to track shipment');
    }
  }

  // Get Estimated Delivery Date
  async getEstimatedDelivery(fromPincode, toPincode) {
    try {
      const response = await axios.get(`${this.baseURL}/pin/${toPincode}`, {
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = response.data;
      if (data && data.length > 0) {
        const pincodeData = data[0];
        // Calculate estimated delivery (usually 3-7 days for domestic)
        const estimatedDays = pincodeData.delivery_status === 'Delivery' ? 3 : 7;
        const estimatedDate = new Date();
        estimatedDate.setDate(estimatedDate.getDate() + estimatedDays);
        
        return {
          estimatedDate: estimatedDate.toISOString(),
          estimatedDays: estimatedDays,
          serviceable: pincodeData.delivery_status === 'Delivery'
        };
      }
      
      return {
        estimatedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedDays: 7,
        serviceable: false
      };
    } catch (error) {
      console.error('Error getting estimated delivery:', error.response?.data || error.message);
      // Return default estimate
      return {
        estimatedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedDays: 7,
        serviceable: false
      };
    }
  }

  // Validate Address
  async validateAddress(addressData) {
    try {
      const pincodeDetails = await this.getPincodeDetails(addressData.zipCode);
      
      if (pincodeDetails && pincodeDetails.length > 0) {
        const pincodeData = pincodeDetails[0];
        
        // Check if city and state match
        const cityMatch = pincodeData.city.toLowerCase().includes(addressData.city.toLowerCase()) ||
                         addressData.city.toLowerCase().includes(pincodeData.city.toLowerCase());
        
        const stateMatch = pincodeData.state.toLowerCase().includes(addressData.state.toLowerCase()) ||
                          addressData.state.toLowerCase().includes(pincodeData.state.toLowerCase());
        
        return {
          valid: cityMatch && stateMatch,
          pincodeData: pincodeData,
          suggestions: {
            city: pincodeData.city,
            state: pincodeData.state,
            district: pincodeData.district
          }
        };
      }
      
      return { valid: false };
    } catch (error) {
      console.error('Error validating address:', error);
      return { valid: false };
    }
  }
}

module.exports = new DelhiveryService(); 