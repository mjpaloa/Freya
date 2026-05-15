import { useState } from 'react';
import { submitInquiry } from '../../../services/inquiryService';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    facilityId: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitInquiry({
        type: 'technical',
        full_name: formData.fullName,
        email: formData.email,
        facility_id: formData.facilityId,
        subject: formData.subject,
        message: formData.message
      });
      alert('Your inquiry has been submitted. Our team will respond within 12 hours.');
      setFormData({ fullName: '', email: '', facilityId: '', subject: '', message: '' });
    } catch (error) {
      alert('Failed to submit inquiry. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Technical Inquiry</h2>
      <p className="desc">
        Our clinical specialists respond to all technical and maintenance inquiries within 12 hours.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Dr. Elena Santos"
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
            placeholder="doctor@facility.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="facilityId">Facility ID</label>
          <input
            type="text"
            id="facilityId"
            name="facilityId"
            placeholder="MED-992-00"
            required
            value={formData.facilityId}
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
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Please describe your requirements or technical issue in detail."
            required
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Secure Message'}
        </button>
      </form>
    </div>
  );
}
