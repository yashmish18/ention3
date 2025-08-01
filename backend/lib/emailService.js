const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD // Your Gmail app password
      }
    });
  }

  // Send confirmation email to new user
  async sendConfirmationEmail(user) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'ENTION - Account Created Successfully! ✅',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">✅ Account Created!</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your ENTION account has been successfully created</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #133B5C; margin-bottom: 20px;">Hello ${user.name},</h2>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Great news! Your ENTION account has been successfully created. You can now log in and start exploring our amazing products.
              </p>
              
              <div style="background-color: #e8f5e8; border: 2px solid #28a745; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #28a745; margin-top: 0;">✅ Account Confirmation:</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${user.name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${user.phone}</p>
                <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">Active</span></p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" 
                   style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
                  Login to Your Account
                </a>
              </div>
              
              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                You'll receive a welcome email shortly with more details about your account and our services.
              </p>
              
              <p style="color: #666; font-size: 14px;">
                Best regards,<br>
                The ENTION Team
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              <p>© 2024 ENTION. All rights reserved.</p>
              <p>Proudly Made in India 🇮🇳</p>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Confirmation email sent successfully:', result.messageId);
      return result;
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw error;
    }
  }

  // Send welcome email to new user (sent after confirmation)
  async sendWelcomeEmail(user) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Welcome to ENTION - Your Journey Begins! 🚀',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #133B5C 0%, #0FAFCA 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to ENTION!</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Empowering Nations through Technology</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #133B5C; margin-bottom: 20px;">Hello ${user.name},</h2>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Welcome to the ENTION family! We're thrilled to have you join our community of technology enthusiasts and professionals. Your account is now ready and you can start exploring our amazing products.
              </p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #133B5C; margin-top: 0;">Your Account Details:</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${user.name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${user.phone}</p>
              </div>
              
              <h3 style="color: #133B5C;">🚀 What's Next?</h3>
              <ul style="color: #333; line-height: 1.6;">
                <li>🖥️ Explore our range of high-performance laptops</li>
                <li>⚙️ Customize your perfect machine</li>
                <li>🛡️ Enjoy our 18-month onsite warranty</li>
                <li>🎯 Get expert technical support</li>
                <li>💳 Save with exclusive member discounts</li>
              </ul>
              
              <div style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
                <h3 style="color: white; margin: 0 0 10px 0;">🎁 Special Welcome Offer!</h3>
                <p style="color: white; margin: 0;">Get 5% off your first purchase with code: <strong>WELCOME5</strong></p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" 
                   style="background: linear-gradient(135deg, #0FAFCA 0%, #007e9e 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
                  Start Shopping Now
                </a>
              </div>
              
              <h3 style="color: #133B5C;">📞 Need Help?</h3>
              <p style="color: #333; line-height: 1.6;">
                Our support team is here to help you with any questions:
              </p>
              <ul style="color: #333; line-height: 1.6;">
                <li>📧 Email: <a href="mailto:support@ention.com" style="color: #0FAFCA;">support@ention.com</a></li>
                <li>📱 Phone: +91 1800-ENTION</li>
                <li>💬 Live Chat: Available on our website</li>
              </ul>
              
              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                Best regards,<br>
                The ENTION Team
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              <p>© 2024 ENTION. All rights reserved.</p>
              <p>Proudly Made in India 🇮🇳</p>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully:', result.messageId);
      return result;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(user, resetToken) {
    try {
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'ENTION - Password Reset Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #133B5C;">Password Reset Request</h2>
            <p>Hello ${user.name},</p>
            <p>You requested a password reset for your ENTION account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetUrl}" style="background-color: #0FAFCA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br>The ENTION Team</p>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent successfully:', result.messageId);
      return result;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  // Send both confirmation and welcome emails
  async sendSignupEmails(user) {
    try {
      // Send confirmation email first
      await this.sendConfirmationEmail(user);
      console.log('Confirmation email sent to:', user.email);
      
      // Send welcome email after 5 seconds
      setTimeout(async () => {
        try {
          await this.sendWelcomeEmail(user);
          console.log('Welcome email sent to:', user.email);
        } catch (error) {
          console.error('Failed to send welcome email:', error);
        }
      }, 5000);
      
      return true;
    } catch (error) {
      console.error('Error sending signup emails:', error);
      throw error;
    }
  }

  // Test email service
  async testConnection() {
    try {
      await this.transporter.verify();
      console.log('Email service is ready');
      return true;
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
  }
}

module.exports = new EmailService(); 