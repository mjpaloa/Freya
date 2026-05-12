import { useState } from 'react';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    facilityId: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Your inquiry has been submitted. Our team will respond within 12 hours.');
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
            value={formData.fullName}
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
            value={formData.facilityId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="subject">Subject of Inquiry</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="">Select a subject...</option>
            <option value="procurement">Procurement &amp; Logistics</option>
            <option value="technical">Technical Support</option>
            <option value="maintenance">Equipment Maintenance</option>
            <option value="partnership">Partnership Inquiry</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Please describe your requirements or technical issue in detail."
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Send Secure Message
        </button>
      </form>
    </div>
  );
}
