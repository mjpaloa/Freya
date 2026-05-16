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
  type: 'technical' | 'sales' | 'partnership';
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
  status: 'pending' | 'done';
  created_at: string;
}

const normalizeStatus = (status: string): Inquiry['status'] => {
  return status === 'pending' ? 'pending' : 'done';
};

const getStatusLabel = (status: Inquiry['status']) => {
  return status === 'pending' ? 'Pending' : 'Done';
};

const InquiryManagement: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'technical' | 'sales' | 'partnership'>('all');
  const [statusFilter, setStatusFilter] = useState<'active' | 'archive'>('active');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/inquiries');
      setInquiries(response.data.map((iq: any) => ({
        ...iq,
        status: normalizeStatus(iq.status),
      })));
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
      const normalizedStatus = normalizeStatus(status);
      setInquiries(inquiries.map(iq => iq.id === id ? { ...iq, status: normalizedStatus } : iq));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: normalizedStatus });
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

      setInquiries(inquiries.map(iq => iq.id === selectedInquiry.id ? { ...iq, status: 'done' } : iq));
      setSelectedInquiry({ ...selectedInquiry, status: 'done' });
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
      ? iq.status === 'pending'
      : iq.status === 'done';

    return matchesSearch && matchesType && matchesStatus;
  });

  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="inquiries-page animate-fade-in">
        <div className="inquiry-header">
          <div className="header-title-section">
            <h1>Customer Inquiries <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>v2.1</span></h1>
            <p>Monitor and respond to technical support, sales, and partnership requests.</p>
          </div>
          
          <div className="status-tabs-wrapper">
            <button 
              className={`status-tab-btn ${statusFilter === 'active' ? 'active' : ''}`}
              onClick={() => setStatusFilter('active')}
            >
              <Clock size={16} />
              Active
            </button>
            <button 
              className={`status-tab-btn ${statusFilter === 'archive' ? 'active' : ''}`}
              onClick={() => setStatusFilter('archive')}
            >
              <CheckCircle2 size={16} />
              Archive
            </button>
          </div>
        </div>

        <div className="table-controls">
          <div className="search-box glass-panel">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-pills glass-panel">
            {['all', 'technical', 'sales', 'partnership'].map((type) => (
              <button
                key={type}
                className={`filter-pill ${filterType === type ? 'active' : ''}`}
                onClick={() => setFilterType(type as any)}
              >
                {type === 'sales' ? 'Product' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
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
                        {iq.type === 'technical' ? 'Technical Support' : iq.type === 'partnership' ? 'Partnership' : 'Product Inquiry'}
                      </span>
                    </div>
                    <div className="col-info">
                      <div className="inquiry-subject-preview">
                        {iq.type === 'sales' ? `Interest: ${iq.product_interest || 'N/A'}` : (iq.subject || 'No Subject')}
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
                        <span>{getStatusLabel(iq.status)}</span>
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
              <div className="detail-header-strip" style={{ background: selectedInquiry.type === 'technical' ? 'var(--accent)' : selectedInquiry.type === 'partnership' ? '#f59e0b' : 'var(--primary)' }}></div>
              <div className="detail-body">
                <div className="detail-top">
                  <div>
                    <span className={`badge ${selectedInquiry.type}`}>
                      {selectedInquiry.type === 'technical' ? 'Technical Support' : selectedInquiry.type === 'partnership' ? 'Partnership' : 'Product Inquiry'}
                    </span>
                    <h2>{selectedInquiry.type === 'sales' ? `${selectedInquiry.first_name} ${selectedInquiry.last_name}` : selectedInquiry.full_name}</h2>
                    <p className="email-row"><Mail size={16} /> {selectedInquiry.email}</p>
                    {selectedInquiry.contact_number && (
                      <p className="email-row"><Phone size={16} /> {selectedInquiry.contact_number}</p>
                    )}
                  </div>
                  <div className="status-selector">
                    <label>Status</label>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => handleUpdateStatus(selectedInquiry.id, e.target.value)}
                      className="glass-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>

                <div className="detail-grid-3">
                  {selectedInquiry.type === 'technical' ? (
                    <>
                      <div className="detail-info-item"><label>Facility ID</label><span>{selectedInquiry.facility_id || 'N/A'}</span></div>
                      <div className="detail-info-item"><label>Subject</label><span>{selectedInquiry.subject}</span></div>
                    </>
                  ) : (
                    <>
                      <div className="detail-info-item"><label>Company</label><span>{selectedInquiry.company_hospital}</span></div>
                      <div className="detail-info-item"><label>Job Title</label><span>{selectedInquiry.job_title}</span></div>
                      {selectedInquiry.type === 'sales' && <div className="detail-info-item"><label>Interest</label><span>{selectedInquiry.product_interest}</span></div>}
                    </>
                  )}
                </div>

                <div className="message-container">
                  <label>Message</label>
                  <div className="message-content">{selectedInquiry.message}</div>
                </div>

                <div className="reply-section" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '12px' }}>Send Official Reply</label>
                  <textarea
                    className="glass-input"
                    placeholder="Type your reply..."
                    style={{ width: '100%', minHeight: '120px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '15px', color: 'white' }}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button className="btn-primary" onClick={handleSendReply} disabled={isSending || !replyMessage.trim()}>
                      {isSending ? 'Sending...' : 'Send Reply'}
                    </button>
                  </div>
                </div>

                <div className="modal-footer-actions">
                  <button className="btn-secondary" onClick={() => setSelectedInquiry(null)}>Close</button>
                  <a href={`mailto:${selectedInquiry.email}`} className="btn-outline">Open Mail App</a>
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
