import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../../services/productService';
import type { WebProduct } from '../../services/productService';
import { submitInquiry } from '../../services/inquiryService';
import './ProductDetailPage.css';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<WebProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalDismissed, setModalDismissed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', hospital: '', jobTitle: '', agreed: false,
  });
  const hasTriggered = useRef(false);

  const handleScroll = useCallback(() => {
    if (hasTriggered.current || modalDismissed) return;
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Trigger when scrolled 50% of the page OR at least 600px down
    if (docHeight > 0 && (scrolled / docHeight >= 0.5 || scrolled > 600)) {
      setShowModal(true);
      hasTriggered.current = true;
    }
  }, [modalDismissed]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const data = await fetchProductById(id);
        if (data) setProduct(data);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const closeModal = () => {
    setShowModal(false);
    setModalDismissed(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !product) return;

    setIsSubmitting(true);
    try {
      await submitInquiry({
        type: 'sales',
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        contact_number: formData.phone,
        company_hospital: formData.hospital,
        job_title: formData.jobTitle,
        product_interest: product.name,
        marketing_consent: formData.agreed
      });
      alert('Thank you! Our sales team will contact you shortly.');
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', hospital: '', jobTitle: '', agreed: false,
      });
      closeModal();
    } catch (error) {
      alert('Failed to submit inquiry. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="loading-state">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="error-state">
            <h2>Product Not Found</h2>
            <p>The product you are looking for does not exist.</p>
            <Link to="/products" className="back-link">Back to Products</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-hero-section">
        <div className="container">
          <Link to="/products" className="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Products
          </Link>
          
          <div className="product-main-layout">
            <div className="product-visual">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            
            <div className="product-intro">
              <span className="product-category-tag">{product.category}</span>
              <h1>{product.name}</h1>
              <p className="product-summary">{product.description}</p>
              
              <div className="product-actions">
                <button className="inquire-btn" onClick={() => setShowModal(true)}>Inquire Now</button>
                {product.brochure_url && (
                  <a href={product.brochure_url} target="_blank" rel="noopener noreferrer" className="brochure-btn">
                    View Brochure (PDF)
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details-content">
        <div className="container">
          <div className="details-full-width">
            {product.features && product.features.length > 0 && (
              <section className="detail-section">
                <h3>Technical Specifications</h3>
                <ul className="specs-list">
                  {product.features.map((feature, i) => (
                    <li key={i}>
                      <span className="dot"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {product.usage && (
              <section className="detail-section">
                <h3>Usage & Application</h3>
                <div className="usage-content">
                  {product.usage}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Product Inquiry Modal */}
      {showModal && (
        <div className="inquiry-modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="inquiry-modal">
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-header">
              <span className="modal-badge">SALES INQUIRY</span>
              <h2>Product Inquiry</h2>
              <p>Complete the form below and our sales team will contact you shortly.</p>
            </div>

            <form className="modal-form" onSubmit={handleFormSubmit}>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>First Name *</label>
                  <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleFormChange} required />
                </div>
                <div className="modal-form-group">
                  <label>Last Name *</label>
                  <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleFormChange} required />
                </div>
              </div>

              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleFormChange} required />
                </div>
                <div className="modal-form-group">
                  <label>Contact Number *</label>
                  <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleFormChange} required />
                </div>
              </div>

              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Company Name *</label>
                  <input type="text" name="hospital" placeholder="e.g. MedSupply Co." value={formData.hospital} onChange={handleFormChange} required />
                </div>
                <div className="modal-form-group">
                  <label>Job Title *</label>
                  <input type="text" name="jobTitle" placeholder="e.g. Purchase Manager" value={formData.jobTitle} onChange={handleFormChange} required />
                </div>
              </div>


              <div className="modal-form-group">
                <label>Product Interest</label>
                <input type="text" value={product.name} readOnly className="modal-readonly-input" />
              </div>

              <div className="modal-policy-checkbox">
                <input type="checkbox" id="modal-policy" name="agreed" checked={formData.agreed} onChange={handleFormChange} required />
                <label htmlFor="modal-policy">
                  By clicking here, you are agreeing to receive marketing emails, newsletters and other promotional communications from Freya Trading Inc. from time to time.
                </label>
              </div>

              <button type="submit" className="modal-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
