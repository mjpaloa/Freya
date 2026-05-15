import nodemailer from 'nodemailer';

// Configure the email transporter
// NOTE: You need to set these in your .env file
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Use a Gmail App Password
  },
});

// Verify connection configuration
if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
  console.warn('WARNING: EMAIL_USER or EMAIL_APP_PASSWORD is not set. Emails will not be sent.');
}

export const sendInquiryEmail = async (inquiry: any) => {
  const isTechnical = inquiry.type === 'technical';
  const recipient = process.env.EMAIL_USER || 'michaeljoshuabpaloa@adssu.edu.ph';
  const customerName = isTechnical ? inquiry.full_name : `${inquiry.first_name} ${inquiry.last_name}`;
  const customerEmail = inquiry.email;

  let subject = `[New Inquiry] ${isTechnical ? 'Technical Support' : 'Product Inquiry'} - ${customerName}`;
  
  const headerColor = isTechnical ? '#6366f1' : '#10b981';
  
  const html = `
    <div style="font-family: 'Inter', sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <div style="background-color: ${headerColor}; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">Freya Medical</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0 0; font-size: 14px;">New ${isTechnical ? 'Technical Support' : 'Product Inquiry'} Received</p>
      </div>
      
      <div style="padding: 32px; background: white;">
        <p style="margin-top: 0;">You have received a new inquiry from your website. Here are the details:</p>
        
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h3 style="margin-top: 0; font-size: 14px; color: #6b7280; text-transform: uppercase; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Customer Information</h3>
          <table style="width: 100%; font-size: 14px; border-spacing: 0 8px;">
            <tr><td style="width: 120px; color: #6b7280;">Name:</td><td style="font-weight: 600;">${customerName}</td></tr>
            <tr><td style="color: #6b7280;">Email:</td><td style="font-weight: 600;">${customerEmail}</td></tr>
            <tr><td style="color: #6b7280;">Contact:</td><td style="font-weight: 600;">${inquiry.contact_number || 'N/A'}</td></tr>
            ${!isTechnical ? `
            <tr><td style="color: #6b7280;">Job Title:</td><td style="font-weight: 600;">${inquiry.job_title || 'N/A'}</td></tr>
            <tr><td style="color: #6b7280;">Company:</td><td style="font-weight: 600;">${inquiry.company_hospital || 'N/A'}</td></tr>
            ` : ''}
          </table>
        </div>

        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h3 style="margin-top: 0; font-size: 14px; color: #6b7280; text-transform: uppercase; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Inquiry Details</h3>
          <p style="font-size: 14px; margin-bottom: 4px; color: #6b7280;">${isTechnical ? 'Subject:' : 'Product Interest:'}</p>
          <p style="font-weight: 600; margin-top: 0;">${isTechnical ? inquiry.subject : inquiry.product_interest}</p>
          
          <p style="font-size: 14px; margin-bottom: 4px; color: #6b7280; margin-top: 16px;">Message:</p>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; font-style: italic; color: #4b5563;">
            "${inquiry.message || 'No message provided.'}"
          </div>
        </div>

        <div style="text-align: center; margin-top: 32px;">
          <a href="mailto:${customerEmail}" style="background-color: ${headerColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
            Reply to Customer
          </a>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 12px;">(Clicking this will open your mail app to reply to ${customerEmail})</p>
        </div>
      </div>
      
      <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
        <p style="margin: 0;">This is an automated notification from the Freya Medical Admin System.</p>
        <p style="margin: 4px 0 0 0;">&copy; 2026 Freya Medical. All rights reserved.</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Freya Inquiries" <${process.env.EMAIL_USER}>`,
    to: recipient,
    replyTo: customerEmail, // Important: Replies go directly to the customer
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Premium Inquiry Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending premium email:', error);
    return false;
  }
};

export const sendReplyEmail = async (to: string, subject: string, message: string) => {
  const mailOptions = {
    from: `"Freya Medical Support" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: `Re: ${subject}`,
    html: `
      <div style="font-family: 'Inter', sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #6366f1; padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Freya Medical</h1>
          <p style="color: rgba(255,255,255,0.8); margin-top: 8px;">Official Response</p>
        </div>
        
        <div style="padding: 40px; background: white;">
          <p style="font-size: 16px;">Hello,</p>
          <div style="margin: 24px 0; font-size: 16px; color: #374151; white-space: pre-line;">
            ${message}
          </div>
          <br>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 32px 0;">
          <p style="font-size: 14px; color: #6b7280;">
            Thank you for reaching out to us. If you have any further questions, feel free to reply directly to this email.
          </p>
          <p style="font-size: 14px; color: #4b5563; font-weight: 700; margin-top: 16px;">
            Best regards,<br>
            Freya Medical Support Team
          </p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 24px; text-align: center; font-size: 12px; color: #9ca3af;">
          <p>&copy; 2026 Freya Medical. Building a healthier future.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending professional reply:', error);
    return false;
  }
};
