import React, { useState, useEffect } from 'react';
import {
  Mail,
  Tag,
  Calendar,
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  Phone
} from 'lucide-react';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import '../styles/Products.css';
import '../styles/Inquiries.css';

interface Inquiry {
  id: string;
  type: 'technical' | 'sales';
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  contact_number?: string;
  facility_id?: string;
  subject?: string;
  message?: string;
  job_title?: string;
  clinical_specialty?: string;
  company_hospital?: string;
  product_interest?: string;
  marketing_consent?: boolean;
  status: 'pending' | 'responded' | 'closed';
  created_at: string;
}

const InquiryManagement: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'technical' | 'sales'>('all');
  const [statusFilter, setStatusFilter] = useState<'active' | 'closed'>('active');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/inquiries');
      setInquiries(response.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/inquiries/${id}/status`, { status });
      setInquiries(inquiries.map(iq => iq.id === id ? { ...iq, status: status as any } : iq));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: status as any });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSendReply = async () => {
    if (!selectedInquiry || !replyMessage.trim()) return;

    setIsSending(true);
    try {
      await api.post(`/inquiries/${selectedInquiry.id}/reply`, {
        to: selectedInquiry.email,
        subject: selectedInquiry.type === 'technical' ? selectedInquiry.subject : `Product Inquiry: ${selectedInquiry.product_interest}`,
        message: replyMessage
      });

      // Update local state to responded
      setInquiries(inquiries.map(iq => iq.id === selectedInquiry.id ? { ...iq, status: 'responded' } : iq));
      setSelectedInquiry({ ...selectedInquiry, status: 'responded' });
      setReplyMessage('');
      alert('Reply sent successfully to ' + selectedInquiry.email);
    } catch (error: any) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply: ' + (error.response?.data?.error || 'Server error'));
    } finally {
      setIsSending(false);
    }
  };

  const filteredInquiries = inquiries.filter(iq => {
    const matchesSearch =
      (iq.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (iq.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (iq.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (iq.message?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || iq.type === filterType;

    const matchesStatus = statusFilter === 'active'
      ? (iq.status === 'pending' || iq.status === 'responded')
      : iq.status === 'closed';

    return matchesSearch && matchesType && matchesStatus;
  });

  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="inquiries-page animate-fade-in">
        <header className="page-header">
          <div>
            <h1>Customer Inquiries</h1>
            <p>Monitor and respond to technical support and sales requests.</p>
          </div>
        </header>

        <div className="table-controls">
          <div className="status-tabs glass-panel" style={{ display: 'flex', marginBottom: '1.5rem', padding: '4px', width: 'fit-content' }}>
            <button
              className={`toggle-btn ${statusFilter === 'active' ? 'active' : ''}`}
              onClick={() => setStatusFilter('active')}
              style={{ width: '150px', padding: '8px' }}
            >
              Active Inquiries
            </button>
            <button
              className={`toggle-btn ${statusFilter === 'closed' ? 'active' : ''}`}
              onClick={() => setStatusFilter('closed')}
              style={{ width: '150px', padding: '8px' }}
            >
              Closed / Archive
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="search-box glass-panel" style={{ flex: 1, minWidth: '300px' }}>
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="toggle-group glass-panel" style={{ padding: '4px' }}>
              <button
                className={`toggle-btn ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
                style={{ width: 'auto', padding: '0 15px', fontSize: '0.85rem' }}
              >
                All
              </button>
              <button
                className={`toggle-btn ${filterType === 'technical' ? 'active' : ''}`}
                onClick={() => setFilterType('technical')}
                style={{ width: 'auto', padding: '0 15px', fontSize: '0.85rem' }}
              >
                Technical
              </button>
              <button
                className={`toggle-btn ${filterType === 'sales' ? 'active' : ''}`}
                onClick={() => setFilterType('sales')}
                style={{ width: 'auto', padding: '0 15px', fontSize: '0.85rem' }}
              >
                Product
              </button>
            </div>
          </div>
        </div>

        <div className="modern-list-container">
          {isLoading ? (
            <div className="glass-panel loading-container">
              <Loader />
            </div>
          ) : (
            <div className="products-list">
              {paginatedInquiries.length > 0 ? (
                paginatedInquiries.map((iq) => (
                  <div key={iq.id} className="product-item-card inquiry-card glass-panel" onClick={() => setSelectedInquiry(iq)}>
                    <div className="col-photo">
                      <div className={`type-icon-circle ${iq.type}`}>
                        {iq.type === 'technical' ? <Tag size={20} /> : <ExternalLink size={20} />}
                      </div>
                    </div>
                    <div className="col-name">
                      <span className="product-name-text">
                        {iq.type === 'sales' ? `${iq.first_name} ${iq.last_name}` : iq.full_name}
                      </span>
                      <span className="product-id-tag">{iq.email}</span>
                    </div>
                    <div className="col-type">
                      <span className={`category-pill ${iq.type}`}>
                        {iq.type === 'technical' ? 'Technical Inquiry' : 'Product Inquiry'}
                      </span>
                    </div>
                    <div className="col-info">
                      <div className="inquiry-subject-preview">
                        {iq.type === 'technical' ? iq.subject : `Interest: ${iq.product_interest}`}
                      </div>
                    </div>
                    <div className="col-date">
                      <div className="date-badge">
                        <Calendar size={14} />
                        <span>{new Date(iq.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="col-actions">
                      <div className={`status-indicator ${iq.status}`}>
                        {iq.status === 'pending' ? <Clock size={16} /> : <CheckCircle2 size={16} />}
                        <span>{iq.status}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-panel empty-state">
                  <MessageSquare size={48} />
                  <p>No inquiries found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredInquiries.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="modal-overlay" onClick={() => setSelectedInquiry(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="detail-modal inquiry-detail glass-panel"
              onClick={e => e.stopPropagation()}
            >
              <div className="detail-header-strip" style={{ background: selectedInquiry.type === 'technical' ? 'var(--accent)' : 'var(--primary)' }}></div>
              <div className="detail-body">
                <div className="detail-top">
                  <div>
                    <span className={`badge ${selectedInquiry.type}`}>
                      {selectedInquiry.type === 'technical' ? 'Technical Support' : 'Product Inquiry'}
                    </span>
                    <h2>{selectedInquiry.type === 'sales' ? `${selectedInquiry.first_name} ${selectedInquiry.last_name}` : selectedInquiry.full_name}</h2>
                    <p className="email-row"><Mail size={16} /> {selectedInquiry.email}</p>
                    {selectedInquiry.contact_number && (
                      <p className="email-row"><Phone size={16} /> {selectedInquiry.contact_number}</p>
                    )}
                  </div>
                  <div className="status-selector">
                    <label>Inquiry Status</label>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => handleUpdateStatus(selectedInquiry.id, e.target.value)}
                      className="glass-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="responded">Responded</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="detail-grid-3">
                  {selectedInquiry.type === 'technical' ? (
                    <>
                      <div className="detail-info-item">
                        <label>Facility ID</label>
                        <span>{selectedInquiry.facility_id || 'N/A'}</span>
                      </div>
                      <div className="detail-info-item">
                        <label>Subject</label>
                        <span>{selectedInquiry.subject}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="detail-info-item">
                        <label>Company / Hospital</label>
                        <span>{selectedInquiry.company_hospital}</span>
                      </div>
                      <div className="detail-info-item">
                        <label>Job Title</label>
                        <span>{selectedInquiry.job_title}</span>
                      </div>
                      <div className="detail-info-item">
                        <label>Product Interest</label>
                        <span>{selectedInquiry.product_interest}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="message-container">
                  <label>Inquiry Message</label>
                  <div className="message-content">
                    {selectedInquiry.message || 'No message provided.'}
                  </div>
                </div>

                <div className="reply-section" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Send Official Reply via Email
                  </label>
                  <textarea
                    className="glass-input"
                    placeholder="Type your reply to the customer here..."
                    style={{ width: '100%', minHeight: '150px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '15px', color: 'white', resize: 'vertical' }}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  ></textarea>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button
                      className="btn-primary"
                      onClick={handleSendReply}
                      disabled={isSending || !replyMessage.trim()}
                      style={{ padding: '10px 25px' }}
                    >
                      {isSending ? 'Sending...' : 'Send Official Reply'}
                    </button>
                  </div>
                </div>

                <div className="modal-footer-actions">
                  <button className="btn-secondary" onClick={() => setSelectedInquiry(null)}>Close View</button>
                  <a href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.type === 'technical' ? selectedInquiry.subject : 'Product Inquiry'}`} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', border: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>
                    <ExternalLink size={18} />
                    Open in Mail App
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );

};

export default InquiryManagement;
