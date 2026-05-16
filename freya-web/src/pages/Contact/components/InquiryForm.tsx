import { useState } from 'react';
import { submitInquiry } from '../../../services/inquiryService';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    facilityId: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const isBusinessPartnership = formData.subject === 'Business Partnership / Collaboration' || formData.subject === 'Business Partnership';
    const inquiryType = isBusinessPartnership ? 'partnership' : 'technical';

    try {
      await submitInquiry(
        inquiryType === 'partnership'
            ? {
                type: 'partnership',
                full_name: formData.fullName,
                email: formData.email,
                contact_number: formData.phone || '',
                facility_id: 'N/A',
                subject: formData.subject,
                message: formData.message,
              }
            : {
                type: 'technical',
                full_name: formData.fullName,
                email: formData.email,
                contact_number: formData.phone || '',
                facility_id: formData.facilityId || '',
                subject: formData.subject,
                message: formData.message,
              }
      );
      alert('Your inquiry has been submitted. Our team will respond shortly.');
      setFormData({ fullName: '', email: '', phone: '', facilityId: '', subject: '', message: '' });
    } catch (error) {
      alert('Failed to submit inquiry. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Contact Freya Medical</h2>
      <p className="desc">
        For technical support, equipment maintenance, or business partnership inquiries.
      </p>

      <form className="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 1, minWidth: '250px' }}>
            <label htmlFor="fullName" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#1a1c2e', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="e.g. Juan Dela Cruz"
              required
              value={formData.fullName}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
            />
          </div>

          <div className="form-group" style={{ flex: 1, minWidth: '250px' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#1a1c2e', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@email.com"
              required
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 1, minWidth: '250px' }}>
            <label htmlFor="phone" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#1a1c2e', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Contact Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g. 0912 345 6789"
              value={formData.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
            />
          </div>

          <div className="form-group" style={{ flex: 1, minWidth: '250px' }}>
            <label htmlFor="facilityId" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#1a1c2e', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Facility ID (Optional)</label>
            <input
              type="text"
              id="facilityId"
              name="facilityId"
              placeholder="e.g. MED-992-00"
              value={formData.facilityId}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="subject" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#1a1c2e', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Subject of Inquiry *</label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid #e2e8f0', background: '#f8fafc', color: formData.subject ? '#1a1c2e' : '#64748b' }}
          >
            <option value="">Select a subject...</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Equipment Maintenance">Equipment Maintenance</option>
            <option value="Software/System Issue">Software/System Issue</option>
            <option value="Warranty Claim">Warranty Claim</option>
            <option value="Business Partnership / Collaboration">Business Partnership / Collaboration</option>
            <option value="Other">Other</option>
          </select>
        </div>


        <div className="form-group full-width">
          <label htmlFor="message" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#1a1c2e', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Your Message *</label>
          <textarea
            id="message"
            name="message"
            placeholder="Please describe your requirements in detail."
            required
            value={formData.message}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid #e2e8f0', background: '#f8fafc', minHeight: '120px' }}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
          style={{ 
            width: '100%', 
            padding: '16px', 
            borderRadius: '4px', 
            background: '#eb6a35', 
            color: 'white', 
            border: 'none', 
            fontWeight: '700', 
            fontSize: '1rem', 
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
        >
          {isSubmitting ? 'Sending...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}
