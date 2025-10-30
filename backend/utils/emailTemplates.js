// Booking Confirmation Email Template
export const bookingConfirmationEmail = (booking, property, user) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; }
        .property { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
        .button { display: inline-block; background: #FF385C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏡 Booking Confirmed!</h1>
          <p>Your reservation at ${property.title} is confirmed</p>
        </div>
        <div class="content">
          <p>Hi ${user.name},</p>
          <p>Great news! Your booking has been confirmed. Here are your reservation details:</p>
          
          <div class="property">
            <h2>${property.title}</h2>
            <div class="detail-row">
              <span>📅 Check-in:</span>
              <strong>${new Date(booking.checkIn).toLocaleDateString('en-IN')}</strong>
            </div>
            <div class="detail-row">
              <span>📅 Check-out:</span>
              <strong>${new Date(booking.checkOut).toLocaleDateString('en-IN')}</strong>
            </div>
            <div class="detail-row">
              <span>👥 Guests:</span>
              <strong>${booking.totalGuests}</strong>
            </div>
            <div class="detail-row">
              <span>🌙 Nights:</span>
              <strong>${booking.nights}</strong>
            </div>
            <div class="detail-row">
              <span>💰 Total Amount:</span>
              <strong>₹${booking.pricing.total}</strong>
            </div>
            <div class="detail-row">
              <span>🆔 Booking ID:</span>
              <strong>${booking._id}</strong>
            </div>
          </div>

          <p><strong>Check-in Time:</strong> ${property.rules.checkIn}</p>
          <p><strong>Check-out Time:</strong> ${property.rules.checkOut}</p>

          <center>
            <a href="${process.env.FRONTEND_URL}/trips" class="button">View Booking Details</a>
          </center>

          <p>If you have any questions, feel free to message your host or contact our support team.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} HomelyHub. All rights reserved.</p>
          <p>Find where you belong 🏡</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Booking Cancellation Email Template
export const bookingCancellationEmail = (booking, property, user) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #6c757d; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; }
        .property { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Cancelled</h1>
        </div>
        <div class="content">
          <p>Hi ${user.name},</p>
          <p>Your booking at <strong>${property.title}</strong> has been cancelled.</p>
          
          <div class="property">
            <p><strong>Booking ID:</strong> ${booking._id}</p>
            <p><strong>Check-in Date:</strong> ${new Date(booking.checkIn).toLocaleDateString('en-IN')}</p>
            <p><strong>Check-out Date:</strong> ${new Date(booking.checkOut).toLocaleDateString('en-IN')}</p>
            <p><strong>Amount:</strong> ₹${booking.pricing.total}</p>
          </div>

          <p>Your refund will be processed according to the cancellation policy within 5-7 business days.</p>
          <p>We hope to serve you again in the future!</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} HomelyHub. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Welcome Email Template
export const welcomeEmail = (user) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; }
        .button { display: inline-block; background: #FF385C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to HomelyHub!</h1>
        </div>
        <div class="content">
          <p>Hi ${user.name},</p>
          <p>Welcome to HomelyHub! We're excited to have you join our community of travelers and hosts.</p>
          
          <p>With HomelyHub, you can:</p>
          <ul>
            <li>🏠 Discover unique places to stay around the world</li>
            <li>💰 Earn money by hosting your property</li>
            <li>⭐ Read and write reviews</li>
            <li>💬 Connect with hosts and guests</li>
            <li>🎯 Save your favorite properties</li>
          </ul>

          <center>
            <a href="${process.env.FRONTEND_URL}/explore" class="button">Start Exploring</a>
          </center>

          <p>If you have any questions, our support team is here to help!</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} HomelyHub. All rights reserved.</p>
          <p>Find where you belong 🏡</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
