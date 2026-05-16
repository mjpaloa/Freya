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
    <div style="font-family:-apple-system,'Segoe UI',sans-serif;color:#111827;line-height:1.6;max-width:560px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#0a0a0a;padding:28px 32px 24px;display:flex;align-items:center;gap:12px;">
        <div style="width:36px;height:36px;background:${accentColor};border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
        </div>
        <div>
          <p style="margin:0;font-size:15px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;">Freya Medical</p>
          <p style="margin:0;font-size:12px;color:#71717a;">${safeEmailUser}</p>
        </div>
      </div>
      <div style="background:#0a0a0a;padding:0 32px 28px;border-bottom:0.5px solid #1f1f1f;">
        <h2 style="margin:0 0 6px 0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.03em;line-height:1.2;">New ${escapeHtml(typeTitle)}<br>Request Received</h2>
        <p style="margin:0;font-size:13px;color:#71717a;">A new inquiry has arrived</p>
      </div>
      <div style="padding:28px 32px 0;background:#ffffff;">
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
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:#ffffff;border-radius:8px;border:0.5px solid #e5e7eb;margin-bottom:8px;">
              <div style="width:28px;height:28px;background:#ede9fe;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
              </div>
              <div>
                <p style="margin:0;font-size:11px;color:#9ca3af;">For faster assistance</p>
                <p style="margin:0;font-size:13px;font-weight:700;color:#111827;font-family:monospace;">283629227</p>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:#ffffff;border-radius:8px;border:0.5px solid #e5e7eb;">
              <div style="width:28px;height:28px;background:#eff6ff;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877f2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </div>
              <div>
                <p style="margin:0;font-size:11px;color:#9ca3af;">Message us on Facebook</p>
                <a href="https://www.facebook.com/freyatradinginc" style="display:block;font-size:13px;font-weight:700;color:#1877f2;text-decoration:none;">Freya Trading Incorporated</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="padding:0 32px 28px;background:#ffffff;">
        <a href="mailto:${safeCustomerEmail}" style="display:block;text-align:center;background:${accentColor};color:white;text-decoration:none;padding:12px 0;border-radius:8px;font-size:13px;font-weight:700;letter-spacing:0.01em;">
          Reply to customer
        </a>
      </div>
      <div style="padding:20px 32px;border-top:0.5px solid #e5e7eb;background:#f9fafb;">
        <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;line-height:1.6;">
          This is an automated notification from the Freya Medical admin system.<br>
          &copy; 2026 Freya Medical. All rights reserved.
        </p>
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
    console.log('Inquiry email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending inquiry email:', error);
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
    ? [{ filename: 'logo1.png', path: logoPath, cid: 'freya-logo' }]
    : [];

  const logoMarkup = logoPath
    ? '<img src="cid:freya-logo" alt="Freya Medical" style="width:24px;height:24px;object-fit:contain;" />'
    : '';

  const html = `
    <div style="font-family:-apple-system,'Segoe UI',sans-serif;color:#111827;line-height:1.7;max-width:560px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#0a0a0a;padding:28px 32px 24px;display:flex;align-items:center;gap:12px;">
        <div style="width:36px;height:36px;background:#7c3aed;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          ${logoMarkup}
        </div>
        <div>
          <p style="margin:0;font-size:15px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;">Freya Medical</p>
          <p style="margin:0;font-size:12px;color:#71717a;">Official Response</p>
        </div>
      </div>
      <div style="background:#0a0a0a;padding:0 32px 28px;border-bottom:0.5px solid #1f1f1f;">
        <h2 style="margin:0 0 6px 0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.03em;line-height:1.2;">We've responded<br>to your inquiry</h2>
        <p style="margin:0;font-size:13px;color:#71717a;">Re: ${escapeHtml(subject)}</p>
      </div>
      <div style="padding:32px;background:#ffffff;">
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
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:#ffffff;border-radius:8px;border:0.5px solid #e5e7eb;margin-bottom:8px;">
              <div style="width:28px;height:28px;background:#ede9fe;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
              </div>
              <div>
                <p style="margin:0;font-size:11px;color:#9ca3af;">For faster assistance</p>
                <p style="margin:0;font-size:13px;font-weight:700;color:#111827;font-family:monospace;">283629227</p>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:#ffffff;border-radius:8px;border:0.5px solid #e5e7eb;">
              <div style="width:28px;height:28px;background:#eff6ff;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877f2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </div>
              <div>
                <p style="margin:0;font-size:11px;color:#9ca3af;">Message us on Facebook</p>
                <a href="https://www.facebook.com/freyatradinginc" style="display:block;font-size:13px;font-weight:700;color:#1877f2;text-decoration:none;">Freya Trading Incorporated</a>
              </div>
            </div>
          </div>
        </div>
        <p style="font-size:14px;color:#4b5563;margin:0;">
          Best regards,<br>
          <strong>Freya Medical Support Team</strong>
        </p>
      </div>
      <div style="padding:20px 32px;border-top:0.5px solid #e5e7eb;background:#f9fafb;">
        <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;line-height:1.6;">
          &copy; 2026 Freya Medical. Building a healthier future.
        </p>
      </div>
    </div>
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
