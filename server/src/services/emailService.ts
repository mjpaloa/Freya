import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
  console.warn('WARNING: EMAIL_USER or EMAIL_APP_PASSWORD is not set. Emails will not be sent.');
}

const WEBSITE_URL = 'https://freya-web-seven.vercel.app/';

const escapeHtml = (value: unknown) => {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const renderEmailShell = (content: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; border-radius: 0 !important; }
        .content { padding: 20px !important; }
        .hero { padding: 30px 20px !important; }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f7f9; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f7f9; padding: 40px 0;">
      <tr>
        <td align="center">
          <table class="container" role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e1e8ed;">
            ${content}
            <!-- Footer -->
            <tr>
              <td style="padding: 32px; background-color: #fcfdfe; border-top: 1px solid #edf2f7; text-align: center;">
                <p style="margin: 0 0 16px 0; font-size: 14px; color: #64748b;">
                  Connect with us
                </p>
                <div style="margin-bottom: 24px;">
                  <a href="https://www.facebook.com/freyatradinginc" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                    <img src="https://img.icons8.com/color/48/000000/facebook-new.png" width="24" height="24" alt="FB" style="display: block;">
                  </a>
                  <a href="${WEBSITE_URL}" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                    <img src="https://img.icons8.com/ios-filled/50/6366f1/globe.png" width="24" height="24" alt="Web" style="display: block;">
                  </a>
                </div>
                <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.6;">
                  &copy; 2026 Freya Trading Incorporated. All rights reserved.<br>
                  Building a Healthier Future with Innovation and Excellence.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

const resolveLogoAsset = () => {
  const logoCandidates = [
    path.resolve(process.cwd(), 'src/assets/logo1.png'),
    path.resolve(process.cwd(), 'assets/logo1.png'),
    path.resolve(process.cwd(), '../freya-web/public/logo1.png'),
    path.resolve(process.cwd(), '../../freya-web/public/logo1.png'),
  ];

  const logoPath = logoCandidates.find((candidate) => fs.existsSync(candidate));
  const logoAttachment = logoPath
    ? [{ filename: 'logo1.png', path: logoPath, cid: 'freya-logo' }]
    : [];
  const logoMarkup = logoPath
    ? '<img src="cid:freya-logo" alt="Freya" style="display: block; height: 50px; width: auto; margin: 0 auto;">'
    : '<span style="font-size: 28px; font-weight: 800; color: #6366f1; letter-spacing: -1px; display: block; text-align: center;">Freya</span>';

  return { logoAttachment, logoMarkup };
};

export const sendInquiryEmail = async (inquiry: any) => {
  const type = inquiry.type;
  const recipient = process.env.EMAIL_USER || 'michaeljoshuabpaloa@adssu.edu.ph';
  const { logoAttachment, logoMarkup } = resolveLogoAsset();

  let accentColor = '#6366f1';
  let typeTitle = 'General Inquiry';

  if (type === 'technical') {
    accentColor = '#8b5cf6';
    typeTitle = 'Technical Support';
  } else if (type === 'sales') {
    accentColor = '#10b981';
    typeTitle = 'Sales Inquiry';
  } else if (type === 'partnership') {
    accentColor = '#f59e0b';
    typeTitle = 'Partnership Proposal';
  }

  const customerName = type === 'sales' ? `${inquiry.first_name || ''} ${inquiry.last_name || ''}`.trim() : inquiry.full_name || 'Valued Customer';
  const safeName = escapeHtml(customerName);
  const safeEmail = escapeHtml(inquiry.email);
  const safeSubject = escapeHtml(type === 'sales' ? inquiry.product_interest : inquiry.subject);
  const safeMessage = escapeHtml(inquiry.message);

  const html = renderEmailShell(`
    <!-- Header -->
    <tr>
      <td style="padding: 40px 32px; background-color: #ffffff; text-align: center; border-bottom: 1px solid #f1f5f9;">
        ${logoMarkup}
        <div style="margin-top: 12px; color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">Internal Notification</div>
      </td>
    </tr>
    <!-- Hero Section -->
    <tr>
      <td style="padding: 48px 32px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); text-align: center;">
        <h1 style="margin: 0 0 16px 0; font-size: 28px; color: #ffffff; font-weight: 800; letter-spacing: -0.5px;">New ${typeTitle}</h1>
        <p style="margin: 0; font-size: 16px; color: #94a3b8; line-height: 1.5;">You have received a new request from ${safeName}</p>
      </td>
    </tr>
    <!-- Details -->
    <tr>
      <td style="padding: 32px;">
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 16px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Customer Details</h3>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding-bottom: 8px; font-size: 14px; color: #475569;">Name:</td>
              <td style="padding-bottom: 8px; font-size: 14px; font-weight: 600; color: #1e293b; text-align: right;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding-bottom: 8px; font-size: 14px; color: #475569;">Email:</td>
              <td style="padding-bottom: 8px; font-size: 14px; font-weight: 600; color: ${accentColor}; text-align: right;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding-bottom: 8px; font-size: 14px; color: #475569;">Subject:</td>
              <td style="padding-bottom: 8px; font-size: 14px; font-weight: 600; color: #1e293b; text-align: right;">${safeSubject}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
          <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
          <p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.6; white-space: pre-line;">${safeMessage}</p>
        </div>
        <div style="margin-top: 32px; text-align: center;">
          <a href="mailto:${safeEmail}" style="display: inline-block; padding: 14px 28px; background-color: ${accentColor}; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Reply to Customer</a>
        </div>
      </td>
    </tr>
  `);

  const mailOptions = {
    from: `"Freya System" <${process.env.EMAIL_USER}>`,
    to: recipient,
    replyTo: inquiry.email,
    subject: `[${typeTitle}] ${safeSubject}`,
    html: html,
    attachments: logoAttachment,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending inquiry email:', error);
    return false;
  }
};

export const sendProductBroadcast = async (product: any, recipients: string[]) => {
  if (recipients.length === 0) return;

  const { logoAttachment, logoMarkup } = resolveLogoAsset();
  const safeName = escapeHtml(product.name);
  const safeInfo = escapeHtml(product.info || 'Discover our newest addition to our medical catalog.');
  const safeType = escapeHtml(product.type || '');
  const productImage = product.image_url || '';

  const html = renderEmailShell(`
    <!-- Header -->
    <tr>
      <td style="padding: 40px 32px; background-color: #ffffff; text-align: center; border-bottom: 1px solid #f1f5f9;">
        ${logoMarkup}
      </td>
    </tr>
    <!-- Product Showcase -->
    <tr>
      <td style="padding: 0;">
        ${productImage ? `<img src="${productImage}" alt="${safeName}" style="width: 100%; max-height: 400px; object-fit: cover; display: block;">` : ''}
      </td>
    </tr>
    <tr>
      <td style="padding: 48px 32px; text-align: center;">
        <span style="display: inline-block; padding: 6px 12px; background-color: #e0e7ff; color: #4338ca; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">${safeType || 'New Arrival'}</span>
        <h1 style="margin: 0 0 16px 0; font-size: 32px; color: #1e293b; font-weight: 800; letter-spacing: -1px;">${safeName}</h1>
        <p style="margin: 0 0 32px 0; font-size: 16px; color: #64748b; line-height: 1.6; max-width: 480px; margin-left: auto; margin-right: auto;">
          ${safeInfo}
        </p>
        <a href="${WEBSITE_URL}products" style="display: inline-block; padding: 16px 32px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);">View on Website</a>
      </td>
    </tr>
    <!-- Features -->
    <tr>
      <td style="padding: 0 32px 48px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="background-color: #f8fafc; border-radius: 16px; padding: 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; color: #1e293b; font-weight: 700;">Why choose Freya?</h2>
              <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.6;">
                We provide high-quality medical equipment and supplies, ensuring the best care for your patients. Our team is dedicated to excellence and innovation in the healthcare industry.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `);

  const mailOptions = {
    from: `"Freya Medical" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    bcc: recipients.join(','),
    subject: `🚀 New Product: ${safeName} is now available!`,
    html: html,
    attachments: logoAttachment,
  };

  try {
    console.log(`Attempting to broadcast product update to ${recipients.length} recipients...`);
    await transporter.sendMail(mailOptions);
    console.log('Product broadcast sent successfully.');
    return true;
  } catch (error) {
    console.error('Error sending product broadcast:', error);
    return false;
  }
};

export const sendNewsBroadcast = async (news: any, recipients: string[]) => {
  if (recipients.length === 0) return;

  const { logoAttachment, logoMarkup } = resolveLogoAsset();
  const safeTitle = escapeHtml(news.title);
  const safeCategory = escapeHtml(news.category || 'Latest News');
  const safeExcerpt = escapeHtml(news.excerpt || 'Stay updated with the latest from Freya Medical.');
  const newsImage = news.image_url || '';

  const html = renderEmailShell(`
    <!-- Header -->
    <tr>
      <td style="padding: 40px 32px; background-color: #ffffff; text-align: center; border-bottom: 1px solid #f1f5f9;">
        ${logoMarkup}
      </td>
    </tr>
    <!-- News Header -->
    <tr>
      <td style="padding: 48px 32px; background-color: #f8fafc;">
        <span style="display: inline-block; padding: 4px 8px; background-color: #fef3c7; color: #d97706; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">${safeCategory}</span>
        <h1 style="margin: 0 0 12px 0; font-size: 28px; color: #1e293b; font-weight: 800; line-height: 1.2;">${safeTitle}</h1>
        <p style="margin: 0; font-size: 16px; color: #64748b; line-height: 1.5;">${safeExcerpt}</p>
      </td>
    </tr>
    <!-- Image -->
    ${newsImage ? `
    <tr>
      <td style="padding: 0 32px;">
        <img src="${newsImage}" alt="News" style="width: 100%; border-radius: 12px; display: block; margin-top: -20px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);">
      </td>
    </tr>
    ` : ''}
    <!-- Content -->
    <tr>
      <td style="padding: 48px 32px; text-align: left;">
        <div style="font-size: 16px; color: #334155; line-height: 1.8;">
          ${safeExcerpt}
        </div>
        <div style="margin-top: 40px; text-align: center;">
          <a href="${WEBSITE_URL}news" style="display: inline-block; padding: 14px 28px; background-color: #1e293b; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px;">Read Full Story</a>
        </div>
      </td>
    </tr>
  `);

  const mailOptions = {
    from: `"Freya Updates" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    bcc: recipients.join(','),
    subject: `📰 Fresh News: ${safeTitle}`,
    html: html,
    attachments: logoAttachment,
  };

  try {
    console.log(`Attempting to broadcast news update to ${recipients.length} recipients...`);
    await transporter.sendMail(mailOptions);
    console.log('News broadcast sent successfully.');
    return true;
  } catch (error) {
    console.error('Error sending news broadcast:', error);
    return false;
  }
};

export const sendReplyEmail = async (to: string, subject: string, message: string) => {
  const { logoAttachment, logoMarkup } = resolveLogoAsset();
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  const html = renderEmailShell(`
    <!-- Header -->
    <tr>
      <td style="padding: 40px 32px; background-color: #ffffff; text-align: center; border-bottom: 1px solid #f1f5f9;">
        ${logoMarkup}
      </td>
    </tr>
    <!-- Content -->
    <tr>
      <td style="padding: 48px 32px;">
        <h2 style="margin: 0 0 24px 0; font-size: 20px; color: #1e293b; font-weight: 700;">Re: ${safeSubject}</h2>
        <div style="font-size: 16px; color: #334155; line-height: 1.7; white-space: pre-line; margin-bottom: 40px;">
          ${safeMessage}
        </div>
        <p style="margin: 0; font-size: 15px; color: #64748b;">
          Best regards,<br>
          <strong style="color: #1e293b;">Freya Support Team</strong>
        </p>
      </td>
    </tr>
  `);

  const mailOptions = {
    from: `"Freya Support" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: `Re: ${subject}`,
    html: html,
    attachments: logoAttachment,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending reply email:', error);
    return false;
  }
};
