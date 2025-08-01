# ENTION Backend - Checkout System

This backend provides a complete checkout system for the ENTION laptop e-commerce platform, including order management, address management, and payment processing.

## 🚀 Features

- **Order Management**: Create, view, and update orders
- **Address Management**: Save and manage shipping addresses
- **Payment Processing**: Support for multiple payment methods (Card, UPI, COD)
- **Admin Dashboard**: Order tracking and management
- **RESTful API**: Clean and well-documented endpoints

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Delhivery API account
- Razorpay account
- npm or yarn

## 🔒 Security Setup

⚠️ **IMPORTANT**: Never commit API keys to version control!

1. **Environment Variables**: All sensitive data is stored in `.env` file
2. **API Keys**: Delhivery and Razorpay API keys are loaded from environment variables
3. **Git Ignore**: The `.env` file is automatically ignored by git

### Required Environment Variables

Create a `.env` file in the backend directory with:

```env
# Delhivery API Configuration
DELHIVERY_API_KEY=your_delhivery_api_key_here

# Razorpay API Configuration  
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ention_db

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_key_here
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory with all required environment variables (see Security Setup section above).

4. **Start the server**
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Address Management
- `GET /api/checkout/addresses/:userId` - Get user's saved addresses
- `POST /api/checkout/addresses` - Save a new address
- `PUT /api/checkout/addresses/:id` - Update an address
- `DELETE /api/checkout/addresses/:id` - Delete an address

### Order Management
- `POST /api/checkout/orders` - Create a new order
- `GET /api/checkout/orders/:userId` - Get user's orders
- `GET /api/checkout/orders/:id` - Get specific order details
- `PUT /api/checkout/orders/:id/status` - Update order status
- `PUT /api/checkout/orders/:id/payment` - Update payment status
- `PUT /api/checkout/orders/:id/delivery` - Update delivery information

### Admin Endpoints
- `GET /api/checkout/admin/orders` - Get all orders (with pagination and filters)

## 🗄️ Database Models

### User Model
```javascript
{
  username: String (required, unique),
  password: String (required),
  name: String,
  email: String,
  phone: String
}
```

### Address Model
```javascript
{
  userId: ObjectId (ref: User),
  label: String (enum: ['Home', 'Work', 'Other']),
  firstName: String (required),
  lastName: String (required),
  addressLine1: String (required),
  addressLine2: String,
  city: String (required),
  state: String (required),
  zipCode: String (required),
  country: String (required, default: 'India'),
  phone: String (required),
  isDefault: Boolean (default: false)
}
```

### Order Model
```javascript
{
  userId: ObjectId (ref: User),
  orderNumber: String (required, unique, auto-generated),
  product: {
    name: String (required),
    model: String (required), // E3, E4, E5
    configuration: {
      ram: String (required),
      ssd: String (required),
      warranty: String (required)
    },
    features: [String],
    price: Number (required),
    mrp: Number (required),
    discount: Number (default: 0)
  },
  shippingAddress: {
    firstName: String (required),
    lastName: String (required),
    addressLine1: String (required),
    addressLine2: String,
    city: String (required),
    state: String (required),
    zipCode: String (required),
    country: String (required),
    phone: String (required)
  },
  payment: {
    method: String (required), // 'card', 'upi', 'cod'
    status: String (default: 'pending'), // 'pending', 'completed', 'failed'
    transactionId: String,
    upiApp: String,
    upiId: String,
    cardDetails: {
      last4: String,
      brand: String
    }
  },
  status: String (enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
  delivery: {
    estimatedDate: Date,
    trackingNumber: String,
    courier: String
  }
}
```

## 🔧 Configuration

### Payment Integration
The system is designed to integrate with:
- **Razorpay**: For UPI and card payments
- **Delivery APIs**: For shipping and tracking

### Environment Variables
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ention

# Server
PORT=5000

# JWT
JWT_SECRET=your_secret_key_here

# Payment Gateway (when integrated)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Delivery API (when integrated)
DELIVERY_API_KEY=your_delivery_api_key
```

## 🚀 Usage Examples

### Creating an Order
```javascript
const orderData = {
  userId: "507f1f77bcf86cd799439011",
  product: {
    name: "ENTION WORKBOOK SERIES E5",
    model: "E5",
    configuration: {
      ram: "8GB",
      ssd: "512GB",
      warranty: "18 Months"
    },
    features: ["Laptop bag worth 1500", "Free shipping"],
    price: 28000,
    mrp: 35000,
    discount: 20
  },
  shippingAddress: {
    firstName: "John",
    lastName: "Doe",
    addressLine1: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    country: "India",
    phone: "+91 98765 43210"
  },
  payment: {
    method: "upi",
    upiApp: "googlepay",
    upiId: "john.doe@upi"
  }
};

const response = await fetch('http://localhost:5000/api/checkout/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderData)
});
```

### Getting User Orders
```javascript
const response = await fetch('http://localhost:5000/api/checkout/orders/507f1f77bcf86cd799439011');
const orders = await response.json();
```

## 🔒 Security Considerations

1. **Authentication**: Implement proper JWT authentication
2. **Input Validation**: All inputs are validated on both frontend and backend
3. **Data Sanitization**: User inputs are sanitized to prevent injection attacks
4. **Rate Limiting**: Consider implementing rate limiting for API endpoints
5. **HTTPS**: Use HTTPS in production

## 🧪 Testing

Run tests (when implemented):
```bash
npm test
```

## 📝 API Response Format

### Success Response
```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439011",
    "orderNumber": "ENTION-12345678-001",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Error Response
```json
{
  "message": "Missing required fields",
  "error": "firstName is required"
}
```

## 🔄 Order Status Flow

1. **pending** - Order created, awaiting confirmation
2. **confirmed** - Order confirmed by admin
3. **processing** - Order being prepared
4. **shipped** - Order shipped with tracking
5. **delivered** - Order delivered successfully
6. **cancelled** - Order cancelled

## 🚚 Delivery Integration

When you're ready to integrate delivery services:

1. **Add delivery API credentials** to environment variables
2. **Update the delivery endpoints** to call actual delivery APIs
3. **Implement tracking number generation** and courier assignment
4. **Add delivery status webhooks** for real-time updates

## 💳 Payment Integration

When you're ready to integrate Razorpay:

1. **Add Razorpay credentials** to environment variables
2. **Update payment endpoints** to create actual payment orders
3. **Implement payment webhooks** for status updates
4. **Add payment verification** logic

## 📞 Support

For technical support or questions about the API, please contact the development team.

## 📄 License

This project is proprietary to ENTION. 