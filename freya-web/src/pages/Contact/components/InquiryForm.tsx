import { useState } from 'react';
import { submitInquiry } from '../../../services/inquiryService';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    facilityId: '',
    subject: '',
    message: '',
    company: '',
    jobTitle: ''
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
    
    // Auto-detect type based on subject
    const inquiryType = formData.subject === 'Business Partnership' ? 'partnership' : 'technical';

    try {
      await submitInquiry({
        type: inquiryType,
        full_name: formData.fullName,
        email: formData.email,
        facility_id: inquiryType === 'technical' ? formData.facilityId : 'N/A',
        subject: formData.subject,
        message: formData.message,
        company_hospital: formData.company,
        job_title: formData.jobTitle
      });
      alert('Your inquiry has been submitted. Our team will respond shortly.');
      setFormData({ fullName: '', email: '', facilityId: '', subject: '', message: '', company: '', jobTitle: '' });
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

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="e.g. Juan Dela Cruz"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@email.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="subject">Subject of Inquiry</label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="">Select a subject...</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Equipment Maintenance">Equipment Maintenance</option>
            <option value="Software/System Issue">Software/System Issue</option>
            <option value="Warranty Claim">Warranty Claim</option>
            <option value="Business Partnership">Business Partnership / Collaboration</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {formData.subject === 'Business Partnership' && (
          <div className="modal-form-row" style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="company">Company Name *</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="e.g. MedSupply Co."
                required
                value={(formData as any).company || ''}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="jobTitle">Job Title *</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                placeholder="e.g. Purchasing Manager"
                required
                value={(formData as any).jobTitle || ''}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>
          </div>
        )}

        {formData.subject !== 'Business Partnership' && formData.subject !== '' && (
          <div className="form-group full-width" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="facilityId">Facility ID (Optional - for technical requests)</label>
            <input
              type="text"
              id="facilityId"
              name="facilityId"
              placeholder="e.g. MED-000-00"
              value={formData.facilityId}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>
        )}

        <div className="form-group full-width">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Please describe your requirements in detail."
            required
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}
