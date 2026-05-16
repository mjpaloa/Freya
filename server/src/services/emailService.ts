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

const escapeHtml = (value: unknown) => {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const renderContactRows = (accentColor: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0 8px;">
    <tr>
      <td style="padding:0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:separate;">
          <tr>
            <td style="display:block;padding:12px 14px;background:#ffffff;border-radius:8px;border:0.5px solid #e5e7eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
                <tr>
                  <td width="36" valign="top" style="width:36px;padding:0 12px 0 0;">
                    <div style="width:36px;height:36px;background:#ede9fe;border-radius:8px;text-align:center;line-height:36px;font-size:18px;flex-shrink:0;">📞</div>
                  </td>
                  <td valign="top" style="padding:0;">
                    <p style="margin:0;font-size:11px;color:#9ca3af;">For faster assistance</p>
                    <p style="margin:0;font-size:14px;font-weight:700;color:#111827;letter-spacing:0.02em;">283629227</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:separate;">
          <tr>
            <td style="display:block;padding:12px 14px;background:#ffffff;border-radius:8px;border:0.5px solid #e5e7eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
                <tr>
                  <td width="36" valign="top" style="width:36px;padding:0 12px 0 0;">
                    <div style="width:36px;height:36px;background:#eff6ff;border-radius:8px;text-align:center;line-height:36px;font-size:18px;flex-shrink:0;">💬</div>
                  </td>
                  <td valign="top" style="padding:0;">
                    <p style="margin:0;font-size:11px;color:#9ca3af;">Message us on Facebook</p>
                    <a href="https://www.facebook.com/freyatradinginc" style="display:block;font-size:14px;font-weight:700;color:#1877f2;text-decoration:none;">Freya Trading Incorporated</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

const renderEmailShell = (content: string) => `
  <style>
    @media only screen and (max-width: 600px) {
      .email-shell { width: 100% !important; }
      .email-pad { padding-left: 20px !important; padding-right: 20px !important; }
      .email-hero { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
  <div class="email-shell" style="font-family:-apple-system,'Segoe UI',sans-serif;color:#111827;line-height:1.6;max-width:560px;width:100%;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
    ${content}
  </div>
`;

const resolveLogoAsset = () => {
  const logoCandidates = [
    path.resolve(process.cwd(), '../freya-web/public/logo1.png'),
    path.resolve(process.cwd(), '../../freya-web/public/logo1.png'),
  ];

  const logoPath = logoCandidates.find((candidate) => fs.existsSync(candidate));
  const logoAttachment = logoPath
    ? [{ filename: 'logo1.png', path: logoPath, cid: 'freya-logo' }]
    : [];
  const logoMarkup = logoPath
    ? '<img src="cid:freya-logo" alt="Freya Medical" style="display:block;width:100%;max-width:160px;height:auto;object-fit:contain;" />'
    : '';

  return { logoAttachment, logoMarkup, logoPath };
};

export const sendInquiryEmail = async (inquiry: any) => {
  const type = inquiry.type;
  const recipient = process.env.EMAIL_USER || 'michaeljoshuabpaloa@adssu.edu.ph';

  let customerName = '';
  if (type === 'sales') {
    customerName = `${inquiry.first_name || ''} ${inquiry.last_name || ''}`.trim();
  } else {
    customerName = inquiry.full_name || 'Valued Customer';
  }

  const customerEmail = inquiry.email;

  let typeTitle = 'Inquiry';
  let accentColor = '#6b7280';

  if (type === 'technical') {
    typeTitle = 'Technical Support';
    accentColor = '#7c3aed';
  } else if (type === 'sales') {
    typeTitle = 'Product Inquiry';
    accentColor = '#059669';
  } else if (type === 'partnership') {
    typeTitle = 'Partnership Inquiry';
    accentColor = '#d97706';
  }

  const safeCustomerName = escapeHtml(customerName);
  const safeCustomerEmail = escapeHtml(customerEmail);
  const safeContactNumber = escapeHtml(inquiry.contact_number || 'N/A');
  const safeSubject = escapeHtml(type === 'sales' ? inquiry.product_interest : inquiry.subject);
  const safeMessage = escapeHtml(inquiry.message || 'No message provided.');
  const safeFacilityId = escapeHtml(inquiry.facility_id || 'N/A');
  const safeJobTitle = escapeHtml(inquiry.job_title || 'N/A');
  const safeCompany = escapeHtml(inquiry.company_hospital || 'N/A');
  const safeEmailUser = escapeHtml(process.env.EMAIL_USER);
  const { logoAttachment, logoMarkup } = resolveLogoAsset();

  const subject = `[New ${typeTitle}] - ${customerName}`;

  const extraRows =
    type === 'technical'
      ? `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;">
          <span style="font-size:13px;color:#6b7280;">Facility ID</span>
          <span style="font-size:13px;font-weight:600;font-family:monospace;color:#111827;">${safeFacilityId}</span>
        </div>`
      : `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-bottom:0.5px solid #e5e7eb;">
          <span style="font-size:13px;color:#6b7280;">Job Title</span>
          <span style="font-size:13px;font-weight:600;color:#111827;">${safeJobTitle}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;">
          <span style="font-size:13px;color:#6b7280;">Company</span>
          <span style="font-size:13px;font-weight:600;color:#111827;">${safeCompany}</span>
        </div>`;

  const html = `
    ${renderEmailShell(`
      <div class="email-hero" style="background:#0a0a0a;padding:28px 32px 24px;display:flex;align-items:center;gap:14px;">
        <div style="width:72px;min-width:72px;flex-shrink:0;background:#ffffff;border-radius:12px;padding:10px 12px;display:flex;align-items:center;justify-content:center;">
          ${logoMarkup || `<span style="font-size:12px;font-weight:700;color:${accentColor};">Freya</span>`}
        </div>
        <div>
          <p style="margin:0;font-size:15px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;">Freya Medical</p>
          <p style="margin:0;font-size:12px;color:#71717a;">${safeEmailUser}</p>
        </div>
      </div>
      <div class="email-hero" style="background:#0a0a0a;padding:0 32px 28px;border-bottom:0.5px solid #1f1f1f;">
        <h2 style="margin:0 0 6px 0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.03em;line-height:1.2;">New ${escapeHtml(typeTitle)}<br>Request Received</h2>
        <p style="margin:0;font-size:13px;color:#71717a;">A new inquiry has arrived</p>
      </div>
      <div class="email-pad" style="padding:28px 32px 0;background:#ffffff;">
        <p style="margin:0 0 20px;font-size:14px;color:#374151;line-height:1.6;">
          You have received a new ${escapeHtml(typeTitle.toLowerCase())} from your website. Here are the details:
        </p>
        <div style="background:#f9fafb;border-radius:10px;border:0.5px solid #e5e7eb;overflow:hidden;margin-bottom:16px;">
          <div style="padding:12px 16px;border-bottom:0.5px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Customer information</p>
          </div>
          <div style="padding:4px 0;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-bottom:0.5px solid #e5e7eb;">
              <span style="font-size:13px;color:#6b7280;">Name</span>
              <span style="font-size:13px;font-weight:600;color:#111827;">${safeCustomerName}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-bottom:0.5px solid #e5e7eb;">
              <span style="font-size:13px;color:#6b7280;">Email</span>
              <span style="font-size:13px;font-weight:600;color:${accentColor};">${safeCustomerEmail}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-bottom:0.5px solid #e5e7eb;">
              <span style="font-size:13px;color:#6b7280;">Contact</span>
              <span style="font-size:13px;font-weight:600;color:#111827;">${safeContactNumber}</span>
            </div>
            ${extraRows}
          </div>
        </div>
        <div style="background:#f9fafb;border-radius:10px;border:0.5px solid #e5e7eb;overflow:hidden;margin-bottom:16px;">
          <div style="padding:12px 16px;border-bottom:0.5px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Inquiry details</p>
          </div>
          <div style="padding:4px 0;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-bottom:0.5px solid #e5e7eb;">
              <span style="font-size:13px;color:#6b7280;">${type === 'sales' ? 'Product Interest' : 'Subject'}</span>
              <span style="font-size:13px;font-weight:600;color:#111827;">${safeSubject}</span>
            </div>
            <div style="padding:12px 16px;">
              <p style="margin:0 0 6px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Message</p>
              <p style="margin:0;font-size:13px;color:#4b5563;line-height:1.6;font-style:italic;">${safeMessage}</p>
            </div>
          </div>
        </div>
        <div style="background:#f9fafb;border-radius:10px;border:0.5px solid #e5e7eb;overflow:hidden;margin-bottom:24px;">
          <div style="padding:12px 16px;border-bottom:0.5px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Contact us</p>
          </div>
          <div style="padding:14px 16px;">
            <p style="margin:0 0 12px;font-size:13px;color:#374151;line-height:1.6;">
              Thank you for reaching out to us. We truly appreciate the opportunity to assist you.
            </p>
            ${renderContactRows(accentColor)}
          </div>
        </div>
      </div>
      <div class="email-pad" style="padding:0 32px 28px;background:#ffffff;">
        <a href="mailto:${safeCustomerEmail}" style="display:block;text-align:center;background:${accentColor};color:white;text-decoration:none;padding:12px 0;border-radius:8px;font-size:13px;font-weight:700;letter-spacing:0.01em;">
          Reply to customer
        </a>
      </div>
      <div class="email-pad" style="padding:20px 32px;border-top:0.5px solid #e5e7eb;background:#f9fafb;">
        <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;line-height:1.6;">
          This is an automated notification from the Freya Medical admin system.<br>
          &copy; 2026 Freya Medical. All rights reserved.
        </p>
      </div>
    `)}
  `;

  const mailOptions = {
    from: `"Freya Inquiries" <${process.env.EMAIL_USER}>`,
    to: recipient,
    replyTo: customerEmail,
    subject: subject,
    html: html,
    attachments: logoAttachment,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Inquiry email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending inquiry email:', error);
    return false;
  }
};

export const sendReplyEmail = async (to: string, subject: string, message: string) => {
  const { logoAttachment, logoMarkup } = resolveLogoAsset();

  const html = `
    ${renderEmailShell(`
      <div class="email-hero" style="background:#0a0a0a;padding:28px 32px 24px;display:flex;align-items:center;gap:14px;">
        <div style="width:72px;min-width:72px;flex-shrink:0;background:#ffffff;border-radius:12px;padding:10px 12px;display:flex;align-items:center;justify-content:center;">
          ${logoMarkup}
        </div>
        <div>
          <p style="margin:0;font-size:15px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;">Freya Medical</p>
          <p style="margin:0;font-size:12px;color:#71717a;">Official Response</p>
        </div>
      </div>
      <div class="email-hero" style="background:#0a0a0a;padding:0 32px 28px;border-bottom:0.5px solid #1f1f1f;">
        <h2 style="margin:0 0 6px 0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.03em;line-height:1.2;">We've responded<br>to your inquiry</h2>
        <p style="margin:0;font-size:13px;color:#71717a;">Re: ${escapeHtml(subject)}</p>
      </div>
      <div class="email-pad" style="padding:32px;background:#ffffff;">
        <p style="font-size:15px;margin-top:0;color:#111827;">Hello,</p>
        <div style="margin:16px 0 28px;font-size:14px;color:#374151;line-height:1.7;white-space:pre-line;">${escapeHtml(message)}</div>
        <div style="background:#f9fafb;border-radius:10px;border:0.5px solid #e5e7eb;overflow:hidden;margin-bottom:24px;">
          <div style="padding:12px 16px;border-bottom:0.5px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Contact us</p>
          </div>
          <div style="padding:14px 16px;">
            <p style="margin:0 0 12px;font-size:13px;color:#374151;line-height:1.6;">
              Thank you for reaching out to us. We truly appreciate the opportunity to assist you.
            </p>
            ${renderContactRows('#7c3aed')}
          </div>
        </div>
        <p style="font-size:14px;color:#4b5563;margin:0;">
          Best regards,<br>
          <strong>Freya Medical Support Team</strong>
        </p>
      </div>
      <div class="email-pad" style="padding:20px 32px;border-top:0.5px solid #e5e7eb;background:#f9fafb;">
        <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;line-height:1.6;">
          &copy; 2026 Freya Medical. Building a healthier future.
        </p>
      </div>
    `)}
  `;

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
