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
  const recipient = 'michaeljoshuabpaloa@adssu.edu.ph';

  let subject = '';
  let html = '';

  if (isTechnical) {
    subject = `Technical Inquiry: ${inquiry.subject}`;
    html = `
      <h3>New Technical Inquiry</h3>
      <p><strong>Full Name:</strong> ${inquiry.full_name}</p>
      <p><strong>Facility ID:</strong> ${inquiry.facility_id}</p>
      <p><strong>Subject:</strong> ${inquiry.subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
        ${inquiry.message}
      </div>
      <hr>
      <p><em>Respond within 12 hours as per service agreement.</em></p>
    `;
  } else {
    subject = `Sales Inquiry: Product Interest - ${inquiry.product_interest}`;
    html = `
      <h3>New Product Inquiry</h3>
      <p><strong>Name:</strong> ${inquiry.first_name} ${inquiry.last_name}</p>
      <p><strong>Email:</strong> ${inquiry.email}</p>
      <p><strong>Contact:</strong> ${inquiry.contact_number}</p>
      <p><strong>Job Title:</strong> ${inquiry.job_title}</p>
      <p><strong>Specialty:</strong> ${inquiry.clinical_specialty}</p>
      <p><strong>Company/Hospital:</strong> ${inquiry.company_hospital}</p>
      <p><strong>Product Interest:</strong> ${inquiry.product_interest}</p>
      <p><strong>Marketing Consent:</strong> ${inquiry.marketing_consent ? 'Yes' : 'No'}</p>
    `;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
