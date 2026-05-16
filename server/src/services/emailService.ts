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

const resolveLogoAsset = () => {
  // We still attach the logo for branding in some clients, but we won't show it in the header
  const logoPath = path.resolve(__dirname, '../assets/logo1.png');
  const logoAttachment = fs.existsSync(logoPath)
    ? [{ filename: 'logo1.png', path: logoPath, cid: 'freya-logo' }]
    : [];
  
  // Empty markup to keep the header small
  const logoMarkup = '';

  return { logoAttachment, logoMarkup };
};

const renderEmailShell = (content: string) => `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;line-height:1.6;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;background-color:#ffffff;">
    ${content}
  </div>
`;

const renderContactRows = (accentColor: string) => `
  <div style="display:table;width:100%;border-collapse:separate;border-spacing:0 12px;">
    <div style="display:table-row;">
      <div style="display:table-cell;vertical-align:middle;padding:16px;background:#f8fafc;border-radius:12px;border:1px solid #edf2f7;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="48" style="padding-right:16px;">
              <div style="width:40px;height:40px;background:#ede9fe;border-radius:10px;text-align:center;line-height:40px;font-size:20px;">📞</div>
            </td>
            <td>
              <p style="margin:0;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Support Hotline</p>
              <p style="margin:0;font-size:15px;font-weight:800;color:#1e293b;">283629227</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="display:table-row;">
      <div style="display:table-cell;vertical-align:middle;padding:16px;background:#f8fafc;border-radius:12px;border:1px solid #edf2f7;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="48" style="padding-right:16px;">
              <div style="width:40px;height:40px;background:#eff6ff;border-radius:10px;text-align:center;line-height:40px;font-size:20px;">💬</div>
            </td>
            <td>
              <p style="margin:0;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Messenger</p>
              <a href="https://www.facebook.com/freyatradinginc" style="display:block;font-size:15px;font-weight:800;color:#1877f2;text-decoration:none;">Freya Trading Incorporated</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
`;

export const sendInquiryEmail = async (inquiry: any) => {
  const type = inquiry.type;
  const recipient = process.env.EMAIL_USER || 'michaeljoshuabpaloa@adssu.edu.ph';
  const { logoAttachment, logoMarkup } = resolveLogoAsset();

  let accentColor = '#6366f1';
  let typeTitle = 'General Inquiry';

  if (type === 'technical') {
    accentColor = '#7c3aed';
    typeTitle = 'Technical Support';
  } else if (type === 'sales') {
    accentColor = '#059669';
    typeTitle = 'Sales Inquiry';
  } else if (type === 'partnership') {
    accentColor = '#d97706';
    typeTitle = 'Partnership Proposal';
  }

  const customerName = type === 'sales' ? `${inquiry.first_name || ''} ${inquiry.last_name || ''}`.trim() : inquiry.full_name || 'Valued Customer';
  const safeName = escapeHtml(customerName);
  const safeEmail = escapeHtml(inquiry.email);
  const safeSubject = escapeHtml(type === 'sales' ? inquiry.product_interest : inquiry.subject);
  const safeMessage = escapeHtml(inquiry.message);
  const safeEmailUser = escapeHtml(process.env.EMAIL_USER);

  const html = renderEmailShell(`
    <div style="background:#0a0a0a;padding:24px 32px;text-align:center;">
      <h2 style="margin:0 0 4px 0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">New ${typeTitle}</h2>
      <p style="margin:0;font-size:13px;color:#9ca3af;">Internal notification from ${safeEmailUser}</p>
    </div>
    <div style="padding:32px;">
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-bottom:24px;">
        <div style="padding:12px 16px;background:#f3f4f6;border-bottom:1px solid #e5e7eb;">
          <p style="margin:0;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Customer Information</p>
        </div>
        <div style="padding:16px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:4px 0;font-size:13px;color:#6b7280;">Name</td><td style="padding:4px 0;font-size:13px;font-weight:700;color:#111827;text-align:right;">${safeName}</td></tr>
            <tr><td style="padding:4px 0;font-size:13px;color:#6b7280;">Email</td><td style="padding:4px 0;font-size:13px;font-weight:700;color:${accentColor};text-align:right;">${safeEmail}</td></tr>
            <tr><td style="padding:4px 0;font-size:13px;color:#6b7280;">Subject</td><td style="padding:4px 0;font-size:13px;font-weight:700;color:#111827;text-align:right;">${safeSubject}</td></tr>
          </table>
        </div>
      </div>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-bottom:32px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Message Content</p>
        <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;font-style:italic;">"${safeMessage}"</p>
      </div>
      <a href="mailto:${safeEmail}" style="display:block;text-align:center;background:${accentColor};color:#ffffff;text-decoration:none;padding:14px;border-radius:10px;font-size:14px;font-weight:700;box-shadow:0 4px 6px rgba(0,0,0,0.05);">Reply to Customer</a>
    </div>
    <div style="padding:24px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">&copy; 2026 Freya Medical System. All rights reserved.</p>
    </div>
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
  const safeType = escapeHtml(product.type || 'New Arrival');
  const productImage = product.image_url || '';

  const html = renderEmailShell(`
    <div style="background:#0a0a0a;padding:24px 32px;text-align:center;">
      <span style="display:inline-block;padding:4px 12px;background:#4f46e5;color:#ffffff;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">${safeType}</span>
      <h2 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-1px;">${safeName}</h2>
    </div>
    ${productImage ? `<div style="padding:0;"><img src="${productImage}" alt="${safeName}" style="width:100%;height:auto;display:block;" /></div>` : ''}
    <div style="padding:32px;">
      <p style="margin:0 0 24px;font-size:16px;color:#374151;line-height:1.7;">${safeInfo}</p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:32px;">
        <h3 style="margin:0 0 16px;font-size:14px;font-weight:700;color:#1e293b;">Why choose this product?</h3>
        <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">Our medical equipment is sourced from the most reliable manufacturers, ensuring durability and precision for your facility.</p>
      </div>
      <a href="${WEBSITE_URL}products" style="display:block;text-align:center;background:#0a0a0a;color:#ffffff;text-decoration:none;padding:16px;border-radius:12px;font-size:15px;font-weight:700;">Explore Product Catalog</a>
      <div style="margin-top:32px;padding-top:32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#1e293b;text-transform:uppercase;letter-spacing:1px;text-align:center;">Need Assistance?</p>
        ${renderContactRows('#4f46e5')}
      </div>
    </div>
    <div style="padding:24px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">&copy; 2026 Freya Medical. Building a healthier future.</p>
    </div>
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
  const safeCategory = escapeHtml(news.category || 'Updates');
  const safeExcerpt = escapeHtml(news.excerpt || 'Stay updated with the latest from Freya Medical.');
  const newsImage = news.image_url || '';

  const html = renderEmailShell(`
    <div style="background:#0a0a0a;padding:24px 32px;text-align:center;">
      <span style="display:inline-block;padding:4px 12px;background:#d97706;color:#ffffff;border-radius:4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">${safeCategory}</span>
      <h2 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">${safeTitle}</h2>
    </div>
    ${newsImage ? `<div style="padding:0;"><img src="${newsImage}" alt="News" style="width:100%;height:auto;display:block;" /></div>` : ''}
    <div style="padding:32px;">
      <div style="font-size:15px;color:#374151;line-height:1.8;margin-bottom:32px;">${safeExcerpt}</div>
      <a href="${WEBSITE_URL}news" style="display:block;text-align:center;background:#d97706;color:#ffffff;text-decoration:none;padding:14px;border-radius:8px;font-size:14px;font-weight:700;">Read Full Article</a>
      <div style="margin-top:40px;padding-top:32px;border-top:1px solid #e5e7eb;">
        ${renderContactRows('#d97706')}
      </div>
    </div>
    <div style="padding:24px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">&copy; 2026 Freya Medical. Stay informed.</p>
    </div>
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
    <div style="background:#0a0a0a;padding:24px 32px;text-align:center;">
      <h2 style="margin:0 0 4px 0;font-size:22px;font-weight:700;color:#ffffff;">Official Response</h2>
      <p style="margin:0;font-size:13px;color:#71717a;">Re: ${safeSubject}</p>
    </div>
    <div style="padding:32px;">
      <p style="font-size:15px;margin-top:0;color:#111827;">Hello,</p>
      <div style="margin:16px 0 32px;font-size:14px;color:#374151;line-height:1.7;white-space:pre-line;">${safeMessage}</div>
      <div style="background:#f9fafb;border-radius:12px;border:0.5px solid #e5e7eb;padding:20px;margin-bottom:32px;">
        <p style="margin:0 0 16px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Need to reach us again?</p>
        ${renderContactRows('#7c3aed')}
      </div>
      <p style="font-size:14px;color:#4b5563;margin:0;">
        Best regards,<br>
        <strong style="color:#111827;">Freya Medical Support Team</strong>
      </p>
    </div>
    <div style="padding:24px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">&copy; 2026 Freya Medical. Building a healthier future.</p>
    </div>
  `);

  const mailOptions = {
    from: `"Freya Medical Support" <${process.env.EMAIL_USER}>`,
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
