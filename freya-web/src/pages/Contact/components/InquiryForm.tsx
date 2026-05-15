import { useState } from 'react';
import { submitInquiry } from '../../../services/inquiryService';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    facilityId: '',
    type: 'technical' as 'technical' | 'partnership',
    subject: '',
    message: ''
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
    try {
      await submitInquiry({
        type: formData.type,
        full_name: formData.fullName,
        email: formData.email,
        facility_id: formData.type === 'technical' ? formData.facilityId : 'N/A',
        subject: formData.subject,
        message: formData.message
      });
      alert('Your inquiry has been submitted. Our team will respond shortly.');
      setFormData({ fullName: '', email: '', facilityId: '', type: 'technical', subject: '', message: '' });
    } catch (error) {
      alert('Failed to submit inquiry. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <h2>General & Technical Inquiries</h2>
      <p className="desc">
        Select the type of inquiry below. Our team responds to all requests within 12-24 hours.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group full-width">
          <label htmlFor="type">Inquiry Type</label>
          <select
            id="type"
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: '#fff' }}
          >
            <option value="technical">Technical Support / Maintenance</option>
            <option value="partnership">Business Partnership / Collaboration</option>
          </select>
        </div>

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

        {formData.type === 'technical' && (
          <div className="form-group">
            <label htmlFor="facilityId">Facility ID</label>
            <input
              type="text"
              id="facilityId"
              name="facilityId"
              placeholder="MED-000-00"
              required
              value={formData.facilityId}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group full-width">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder={formData.type === 'technical' ? "e.g. Equipment Maintenance" : "e.g. Distribution Partnership"}
            required
            value={formData.subject}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
        </div>

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
