import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

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
  const type = inquiry.type; // 'technical', 'sales', or 'partnership'
  const recipient = process.env.EMAIL_USER || 'michaeljoshuabpaloa@adssu.edu.ph';
  
  // Handle names correctly based on type
  let customerName = '';
  if (type === 'sales') {
    customerName = `${inquiry.first_name || ''} ${inquiry.last_name || ''}`.trim();
  } else {
    customerName = inquiry.full_name || 'Valued Customer';
  }

  const customerEmail = inquiry.email;

  // Dynamic Title and Header Color
  let typeTitle = 'Inquiry';
  let headerColor = '#6b7280'; // Default gray
  
  if (type === 'technical') {
    typeTitle = 'Technical Support';
    headerColor = '#6366f1'; // Indigo
  } else if (type === 'sales') {
    typeTitle = 'Product Inquiry';
    headerColor = '#10b981'; // Emerald
  } else if (type === 'partnership') {
    typeTitle = 'Partnership Inquiry';
    headerColor = '#f59e0b'; // Amber
  }

  let subject = `[New ${typeTitle}] - ${customerName}`;
  
  const html = `
    <div style="font-family: 'Inter', sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <div style="background-color: ${headerColor}; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">Freya Medical</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0 0; font-size: 14px;">New ${typeTitle} Received</p>
      </div>
      
      <div style="padding: 32px; background: white;">
        <p style="margin-top: 0;">You have received a new ${typeTitle.toLowerCase()} from your website. Here are the details:</p>
        
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h3 style="margin-top: 0; font-size: 14px; color: #6b7280; text-transform: uppercase; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Customer Information</h3>
          <table style="width: 100%; font-size: 14px; border-spacing: 0 8px;">
            <tr><td style="width: 120px; color: #6b7280;">Name:</td><td style="font-weight: 600;">${customerName}</td></tr>
            <tr><td style="color: #6b7280;">Email:</td><td style="font-weight: 600;">${customerEmail}</td></tr>
            <tr><td style="color: #6b7280;">Contact:</td><td style="font-weight: 600;">${inquiry.contact_number || 'N/A'}</td></tr>
            ${type === 'technical' ? `
            <tr><td style="color: #6b7280;">Facility ID:</td><td style="font-weight: 600;">${inquiry.facility_id || 'N/A'}</td></tr>
            ` : `
            <tr><td style="color: #6b7280;">Job Title:</td><td style="font-weight: 600;">${inquiry.job_title || 'N/A'}</td></tr>
            <tr><td style="color: #6b7280;">Company:</td><td style="font-weight: 600;">${inquiry.company_hospital || 'N/A'}</td></tr>
            `}
          </table>
        </div>

        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h3 style="margin-top: 0; font-size: 14px; color: #6b7280; text-transform: uppercase; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Inquiry Details</h3>
          <p style="font-size: 14px; margin-bottom: 4px; color: #6b7280;">${type === 'sales' ? 'Product Interest:' : 'Subject:'}</p>
          <p style="font-weight: 600; margin-top: 0;">${type === 'sales' ? inquiry.product_interest : inquiry.subject}</p>
          
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
    replyTo: customerEmail,
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
  const logoCandidates = [
    path.resolve(process.cwd(), '../freya-web/public/logo1.png'),
    path.resolve(process.cwd(), '../../freya-web/public/logo1.png'),
  ];

  const logoPath = logoCandidates.find((candidate) => fs.existsSync(candidate));
  const logoAttachment = logoPath
    ? [{
        filename: 'logo1.png',
        path: logoPath,
        cid: 'freya-logo',
      }]
    : [];

  const mailOptions = {
    from: `"Freya Medical Support" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: `Re: ${subject}`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #1f2937; line-height: 1.7; max-width: 640px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 28px 32px; text-align: center;">
          <img src="cid:freya-logo" alt="Freya Medical" style="max-width: 160px; width: 100%; height: auto; display: inline-block; margin-bottom: 14px;" />
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px; letter-spacing: 0.12em; text-transform: uppercase;">Official Response</p>
        </div>
        
        <div style="padding: 36px 40px; background: #ffffff;">
          <p style="font-size: 16px; margin-top: 0; color: #111827;">Hello,</p>
          <div style="margin: 20px 0 28px 0; font-size: 15px; color: #374151; white-space: pre-line;">
            ${message}
          </div>

          <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 14px; padding: 24px; margin: 30px 0;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">Contact Us</p>
            <p style="margin: 0 0 8px 0; font-size: 15px; color: #111827;">
              Thank you for reaching out to us. We truly appreciate the opportunity to assist you.
            </p>
            <p style="margin: 0 0 8px 0; font-size: 15px; color: #374151;">
              For faster assistance, you may contact us at <strong>283629227</strong>.
            </p>
            <p style="margin: 0; font-size: 15px; color: #374151;">
              You may also message us on our Facebook page:
              <a href="https://www.facebook.com/freyatradinginc" target="_blank" rel="noopener noreferrer" style="color: #4f46e5; font-weight: 700; text-decoration: none;">
                Freya Trading Incorporated
              </a>
            </p>
          </div>

          <p style="font-size: 14px; color: #4b5563; margin: 0;">
            Best regards,<br>
            <strong>Freya Medical Support Team</strong>
          </p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 18px 24px; text-align: center; font-size: 12px; color: #9ca3af;">
          <p>&copy; 2026 Freya Medical. Building a healthier future.</p>
        </div>
      </div>
    `,
    attachments: logoAttachment,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending professional reply:', error);
    return false;
  }
};
