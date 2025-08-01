require('dotenv').config();
const emailService = require('./lib/emailService');

async function testEmail() {
  console.log('Testing email service...');
  
  // Test connection
  const isReady = await emailService.testConnection();
  if (!isReady) {
    console.error('❌ Email service is not ready');
    return;
  }
  
  console.log('✅ Email service is ready');
  
  // Test confirmation email
  const testUser = {
    name: 'Test User',
    email: 'test@example.com', // Replace with your email for testing
    phone: '+91 9876543210'
  };
  
  try {
    await emailService.sendConfirmationEmail(testUser);
    console.log('✅ Confirmation email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error.message);
  }
  
  // Test welcome email
  try {
    await emailService.sendWelcomeEmail(testUser);
    console.log('✅ Welcome email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error.message);
  }
}

testEmail(); 