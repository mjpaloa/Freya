import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  LayoutGrid,
  List,
  Calendar,
  Eye,
  Tag,
  Newspaper,
  CheckCircle2,
  Circle,
  Link,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import '../styles/Products.css';
import '../styles/News.css'; // new clean form styles

export interface NewsArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content?: string;
  published_date: string;
  image_url?: string;
  featured: boolean;
  article_url?: string;
  created_at: string;
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [viewingArticle, setViewingArticle] = useState<NewsArticle | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const [formData, setFormData] = useState({
    category: '',
    title: '',
    excerpt: '',
    content: '',
    published_date: new Date().toISOString().split('T')[0],
    image_url: '',
    featured: false,
    article_url: ''
  });

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/news');
      setArticles(response.data);
      setFilteredArticles(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, []);

  useEffect(() => {
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(results);
    setCurrentPage(1);
  }, [searchTerm, articles]);

  const handleOpenModal = (article?: NewsArticle) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        category: article.category,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content || '',
        published_date: article.published_date,
        image_url: article.image_url || '',
        featured: article.featured,
        article_url: article.article_url || ''
      });
    } else {
      setEditingArticle(null);
      setFormData({
        category: '',
        title: '',
        excerpt: '',
        content: '',
        published_date: new Date().toISOString().split('T')[0],
        image_url: '',
        featured: false,
        article_url: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingArticle) {
        await api.put(`/news/${editingArticle.id}`, formData);
      } else {
        await api.post('/news', formData);
      }
      setIsModalOpen(false);
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await api.delete(`/news/${id}`);
        fetchArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="products-page animate-fade-in">
        <header className="page-header">
          <div>
            <h1>News & Updates</h1>
            <p>Manage clinical insights and company announcements.</p>
          </div>
          <button className="btn-primary" onClick={() => handleOpenModal()}>
            <Plus size={20} />
            <span>Add Article</span>
          </button>
        </header>

        <div className="table-controls">
          <div className="search-box glass-panel">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="view-actions">
            <div className="toggle-group glass-panel">
              <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><List size={20} /></button>
              <button className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><LayoutGrid size={20} /></button>
            </div>
          </div>
        </div>

        <div className="products-content">
          {isLoading ? (
            <div className="glass-panel loading-container"><Loader /></div>
          ) : viewMode === 'table' ? (
            <div className="modern-list-container">
              <div className="list-header-row">
                <div className="col-photo">Banner</div>
                <div className="col-name">Article Title</div>
                <div className="col-type">Category</div>
                <div className="col-info">Short Summary</div>
                <div className="col-date">Featured</div>
                <div className="col-actions">Actions</div>
              </div>
              <div className="products-list">
                {paginatedArticles.map((article, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={article.id}
                    className="product-item-card glass-panel"
                  >
                    <div className="col-photo">
                      <div className="product-img-circle">
                        {article.image_url ? <img src={article.image_url} alt="" /> : <Newspaper size={20} />}
                      </div>
                    </div>
                    <div className="col-name">
                      <span className="product-name-text">{article.title}</span>
                      <span className="product-id-tag">Published: {article.published_date}</span>
                    </div>
                    <div className="col-type">
                      <span className="category-pill">{article.category}</span>
                    </div>
                    <div className="col-info">
                      <p className="info-preview">{article.excerpt}</p>
                    </div>
                    <div className="col-date">
                      <div className="date-badge">
                        {article.featured
                          ? <CheckCircle2 size={16} color="var(--primary)" />
                          : <Circle size={16} opacity={0.3} />}
                        <span style={{ marginLeft: '4px' }}>{article.featured ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                    <div className="col-actions">
                      <div className="action-row">
                        <button className="action-btn view" title="View" onClick={() => setViewingArticle(article)}><Eye size={16} /></button>
                        <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal(article)}><Edit3 size={16} /></button>
                        <button className="action-btn delete" title="Delete" onClick={() => handleDelete(article.id)}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="products-grid">
              {paginatedArticles.map((article, index) => (
                <motion.div layout key={article.id} className="product-card glass-panel">
                  <div className="card-image">
                    {article.image_url
                      ? <img src={article.image_url} alt="" />
                      : <div className="card-image-placeholder"><Newspaper size={40} /></div>}
                    <span className="card-id">#{index + 1}</span>
                  </div>
                  <div className="card-body">
                    <div className="card-header">
                      <span className="badge">{article.category}</span>
                      {article.featured && <span className="badge featured">FEATURED</span>}
                    </div>
                    <h3 className="card-title">{article.title}</h3>
                    <p className="card-info">{article.excerpt}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredArticles.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* ── ADD / EDIT MODAL ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="news-modal"
            >
              {/* Header */}
              <div className="news-modal-header">
                <div className="news-modal-header-text">
                  <span className="news-modal-badge">Article Editor</span>
                  <h3>{editingArticle ? 'Update News Article' : 'Compose New Article'}</h3>
                </div>
                <button className="news-close-btn" onClick={() => setIsModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="news-form">

                {/* Section: Article Details */}
                <div className="news-form-section">
                  <div className="news-section-label">Article Details</div>
                  <p className="news-section-desc">Set the headline, banner, source link, and publishing context.</p>

                  {/* Article Title — full width */}
                  <div className="news-field">
                    <label className="news-field-label">Article Title</label>
                    <input
                      type="text"
                      className="news-input"
                      placeholder="e.g. New Breakthrough in Medical Technology"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  {/* Row: Category + Banner Image */}
                  <div className="news-grid-2">
                    <div className="news-field">
                      <label className="news-field-label">Category</label>
                      <input
                        type="text"
                        className="news-input"
                        placeholder="e.g. Healthcare Innovation"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                    <div className="news-field">
                      <label className="news-field-label">Banner Image URL</label>
                      <input
                        type="text"
                        className="news-input"
                        placeholder="https://..."
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row: Published Date + Source Link */}
                  <div className="news-grid-2">
                    <div className="news-field">
                      <label className="news-field-label">Published Date</label>
                      <input
                        type="date"
                        className="news-input"
                        value={formData.published_date}
                        onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                      />
                    </div>
                    <div className="news-field">
                      <label className="news-field-label">Source / Link <span className="news-optional">(Optional)</span></label>
                      <input
                        type="text"
                        className="news-input"
                        placeholder="https://..."
                        value={formData.article_url}
                        onChange={(e) => setFormData({ ...formData, article_url: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Featured checkbox */}
                  <label className="news-checkbox-row">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span>Feature this article on main page carousel</span>
                  </label>
                </div>

                {/* Section: Content Summary & Full Story */}
                <div className="news-form-section">
                  <div className="news-section-label">Content Summary & Full Story</div>
                  <p className="news-section-desc">Keep the excerpt readable and concise for article preview cards. Use the Full Story for the actual news content.</p>

                  <div className="news-field">
                    <label className="news-field-label">Excerpt (Short Summary)</label>
                    <textarea
                      className="news-input news-textarea"
                      rows={5}
                      placeholder="Brief summary of the article..."
                      required
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    />
                  </div>

                  <div className="news-field">
                    <label className="news-field-label">Full Story (Content)</label>
                    <textarea
                      className="news-input news-textarea"
                      rows={8}
                      placeholder="Write the full news story here..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="news-modal-actions">
                  <button type="button" className="news-btn-cancel" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="news-btn-submit">
                    {editingArticle ? 'Update Article' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── VIEW / DETAIL MODAL ── */}
      <AnimatePresence>
        {viewingArticle && (
          <div className="modal-overlay" onClick={() => setViewingArticle(null)}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="detail-modal glass-panel"
              style={{ maxWidth: '700px' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="detail-hero">
                {viewingArticle.image_url
                  ? <img src={viewingArticle.image_url} alt="" />
                  : <div className="detail-hero-placeholder"><Newspaper size={60} /></div>}
                <button className="detail-close" onClick={() => setViewingArticle(null)}><X size={24} /></button>
                <div className="detail-hero-overlay">
                  <span className="badge">{viewingArticle.category}</span>
                  <h2>{viewingArticle.title}</h2>
                </div>
              </div>
              <div className="detail-content">
                <div className="detail-section">
                  <label>Excerpt / Summary</label>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{viewingArticle.excerpt}</p>
                </div>
                {viewingArticle.content && (
                  <div className="detail-section" style={{ marginTop: '20px' }}>
                    <label>Full Story</label>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{viewingArticle.content}</p>
                  </div>
                )}
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="item-icon"><Calendar size={18} /></div>
                    <div className="item-info">
                      <label>Published</label>
                      <span>{viewingArticle.published_date}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="item-icon"><Tag size={18} /></div>
                    <div className="item-info">
                      <label>Status</label>
                      <span className={viewingArticle.featured ? 'status-active' : ''}>
                        {viewingArticle.featured ? 'Featured' : 'Standard'}
                      </span>
                    </div>
                  </div>
                  {viewingArticle.article_url?.trim() && (
                    <div className="detail-item">
                      <div className="item-icon"><Link size={18} /></div>
                      <div className="item-info">
                        <label>Source Link</label>
                        <a
                          href={viewingArticle.article_url.trim().startsWith('http') ? viewingArticle.article_url.trim() : `https://${viewingArticle.article_url.trim()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="source-link"
                        >
                          View Original Article
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default News;
