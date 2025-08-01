# 🚀 ENTION - Empowering Nations through Technology

A comprehensive e-commerce platform for high-performance laptops, built with Next.js frontend and Node.js backend.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup Instructions](#-setup-instructions)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Email System](#-email-system)
- [Payment Integration](#-payment-integration)
- [Deployment](#-deployment)

## ✨ Features

### 🛍️ E-commerce Features
- **Product Catalog**: E3, E4, E5 laptop models with detailed specifications
- **Product Customization**: Configurable features and specifications
- **Shopping Cart**: Add/remove items with quantity management
- **Checkout System**: Complete checkout flow with address management
- **Order Management**: Track orders and payment status
- **User Dashboard**: Personal account management

### 🔐 Authentication & Security
- **User Registration/Login**: Secure authentication system
- **JWT Tokens**: Stateless authentication
- **Password Hashing**: bcrypt encryption
- **Account Lockout**: Security against brute force attacks
- **Email Verification**: Welcome and confirmation emails

### 💳 Payment Integration
- **Razorpay Integration**: Secure payment processing
- **Multiple Payment Methods**: UPI, Cards, Net Banking
- **Payment Verification**: Secure payment confirmation
- **Order Tracking**: Real-time order status updates

### 📧 Email System
- **Welcome Emails**: Professional welcome messages
- **Confirmation Emails**: Account creation confirmations
- **Order Notifications**: Order status updates
- **Nodemailer Integration**: Gmail SMTP support

### 🚚 Delivery Integration
- **Delhivery Integration**: Shipping and tracking
- **Pincode Validation**: Serviceability checking
- **Shipping Cost Calculation**: Dynamic pricing
- **Delivery Tracking**: Real-time shipment status

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean and professional interface
- **Product Carousels**: Interactive product showcases
- **Pre-book System**: Google Forms integration for pre-orders
- **Admin Dashboard**: Order and review management

## 🛠️ Tech Stack

### Frontend
- **Next.js**: React framework for production
- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript/JSX**: Frontend logic and components

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

### Payment & Services
- **Razorpay**: Payment gateway
- **Delhivery**: Shipping and logistics
- **Nodemailer**: Email service
- **JWT**: Authentication tokens

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Git**: Version control

## 📁 Project Structure

```
ention2/
├── backend/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── lib/               # Service libraries
│   │   ├── razorpayService.js
│   │   ├── delhiveryService.js
│   │   └── emailService.js
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── checkout.js
│   │   ├── admin/
│   │   └── orders/
│   └── uploads/           # File uploads
├── frontend/              # Next.js frontend
│   ├── components/        # React components
│   │   ├── admin/
│   │   ├── layout/
│   │   ├── product/
│   │   └── generic/
│   ├── lib/              # Frontend services
│   ├── pages/            # Next.js pages
│   │   ├── ecommerce/
│   │   ├── admin/
│   │   └── api/
│   ├── public/           # Static assets
│   └── styles/           # CSS files
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Git

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Database Setup
1. Install MongoDB
2. Create a database named `ention`
3. Update connection string in `backend/config/db.js`

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ention

# JWT
JWT_SECRET=your-jwt-secret-key

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:3000

# Server
PORT=4000
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/test-email` - Test email service

### Checkout & Orders
- `POST /api/checkout/create-order` - Create Razorpay order
- `POST /api/checkout/verify` - Verify payment
- `GET /api/checkout/orders/:userId` - Get user orders
- `POST /api/checkout/orders` - Create order

### Admin
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/stats` - Get dashboard stats
- `GET /api/admin/reviews` - Get all reviews

### Delivery
- `GET /api/delivery/pincode/:pincode` - Check serviceability
- `POST /api/delivery/calculate-shipping` - Calculate shipping cost
- `GET /api/delivery/track/:waybill` - Track shipment

## 📧 Email System

The project includes a comprehensive email system with:

### Email Types
1. **Confirmation Email**: Sent immediately after signup
2. **Welcome Email**: Sent 5 seconds after confirmation
3. **Order Notifications**: Order status updates
4. **Password Reset**: Account recovery

### Email Features
- Professional HTML templates
- Responsive design
- ENTION branding
- Special offers and discounts
- Support information

### Setup Email Service
1. Enable 2-factor authentication on Gmail
2. Generate App Password
3. Update `.env` with email credentials
4. Test with `/api/auth/test-email` endpoint

## 💳 Payment Integration

### Razorpay Features
- Secure payment processing
- Multiple payment methods
- Payment verification
- Order management
- Refund handling

### Payment Flow
1. User selects products
2. Creates Razorpay order
3. Processes payment
4. Verifies payment signature
5. Updates order status
6. Sends confirmation

## 🚀 Deployment

### Railway Deployment
1. Connect GitHub repository to Railway
2. Set environment variables
3. Deploy automatically

### Vercel Deployment (Frontend)
1. Connect repository to Vercel
2. Set build settings
3. Deploy frontend

### MongoDB Atlas
1. Create MongoDB Atlas cluster
2. Update connection string
3. Configure network access

## 🎯 Key Features Implemented

### ✅ Completed Features
- [x] User authentication system
- [x] Product catalog and customization
- [x] Shopping cart functionality
- [x] Razorpay payment integration
- [x] Email notification system
- [x] Order management
- [x] Admin dashboard
- [x] Responsive design
- [x] Pre-book system with Google Forms
- [x] Delhivery integration
- [x] Security features

### 🔄 Current Status
- **Buy Now Buttons**: Temporarily disabled
- **Pre-book System**: Active with Google Forms
- **Email System**: Fully functional
- **Payment System**: Ready for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: support@ention.com
- Phone: +91 1800-ENTION
- Live Chat: Available on website

## 📄 License

This project is proprietary software. All rights reserved.

---

**Made with ❤️ in India 🇮🇳**

*Empowering Nations through Technology*
