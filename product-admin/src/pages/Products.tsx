import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  Loader2,
  Image as ImageIcon,
  LayoutGrid,
  List,
  Calendar,
  Eye,
  Tag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import '../styles/Products.css';
import '../styles/ProductForm.css';

export interface Product {
  id: string;
  name: string;
  type: string;
  info?: string;
  image_url?: string;
  brochure_url?: string;
  created_at: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    image_url: '',
    brochure_url: '',
    short_desc: '',
    tech_specs: '',
    usage_purpose: '',
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      const infoText = product.info || '';
      setFormData({
        name: product.name,
        type: product.type,
        image_url: product.image_url || '',
        brochure_url: product.brochure_url || '',
        short_desc: infoText.split('[TECHNICAL SPECS]')[0]?.replace('[DESCRIPTION]', '').trim() || infoText,
        tech_specs: infoText.split('[TECHNICAL SPECS]')[1]?.split('[USAGE]')[0]?.trim() || '',
        usage_purpose: infoText.split('[USAGE]')[1]?.trim() || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', type: '', image_url: '', brochure_url: '', short_desc: '', tech_specs: '', usage_purpose: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const combinedInfo = `
[DESCRIPTION]
${formData.short_desc}

[TECHNICAL SPECS]
${formData.tech_specs}

[USAGE]
${formData.usage_purpose}
    `.trim();

    const payload = {
      name: formData.name,
      type: formData.type,
      image_url: formData.image_url,
      brochure_url: formData.brochure_url,
      info: combinedInfo,
    };

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="products-page animate-fade-in">
        <header className="page-header">
          <div>
            <h1>Inventory Management</h1>
            <p>Organize and manage your medical and technical products.</p>
          </div>
          <button className="btn-primary" onClick={() => handleOpenModal()}>
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </header>

        <div className="table-controls">
          <div className="search-box glass-panel">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
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
                <div className="col-photo">Photo</div>
                <div className="col-name">Product Name</div>
                <div className="col-type">Category</div>
                <div className="col-info">Short Details</div>
                <div className="col-date">Added</div>
                <div className="col-actions">Actions</div>
              </div>
              <div className="products-list">
                {paginatedProducts.map((product, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={product.id}
                    className="product-item-card glass-panel"
                  >
                    <div className="col-photo">
                      <div className="product-img-circle">
                        {product.image_url ? <img src={product.image_url} alt="" /> : <ImageIcon size={20} />}
                      </div>
                    </div>
                    <div className="col-name">
                      <span className="product-name-text">{product.name}</span>
                      <span className="product-id-tag">ID: {product.id.slice(0, 8)}</span>
                    </div>
                    <div className="col-type">
                      <span className="category-pill">{product.type}</span>
                    </div>
                    <div className="col-info">
                      <p className="info-preview">{product.info || 'No details'}</p>
                    </div>
                    <div className="col-date">
                      <div className="date-badge">
                        <Calendar size={14} />
                        <span>{new Date(product.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="col-actions">
                      <div className="action-row">
                        <button className="action-btn view" title="View Details" onClick={() => setViewingProduct(product)}><Eye size={16} /></button>
                        <button className="action-btn edit" title="Edit Product" onClick={() => handleOpenModal(product)}><Edit3 size={16} /></button>
                        <button className="action-btn delete" title="Delete" onClick={() => handleDelete(product.id)}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="products-grid">
              {paginatedProducts.map((product, index) => (
                <motion.div layout key={product.id} className="product-card glass-panel">
                  <div className="card-image">
                    {product.image_url
                      ? <img src={product.image_url} alt="" />
                      : <div className="card-image-placeholder"><ImageIcon size={40} /></div>}
                    <span className="card-id">#{index + 1}</span>
                  </div>
                  <div className="card-body">
                    <div className="card-header">
                      <span className="badge">{product.type}</span>
                    </div>
                    <h3 className="card-title">{product.name}</h3>
                    <p className="card-info">{product.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
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
              className="product-form-modal"
            >
              {/* Header */}
              <div className="pf-modal-header">
                <div className="pf-modal-header-text">
                  <span className="pf-modal-badge">Product Inventory</span>
                  <h3>{editingProduct ? 'Update Product Details' : 'Register New Product'}</h3>
                </div>
                <button className="pf-close-btn" onClick={() => setIsModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="pf-form">

                {/* ── SECTION 1: Basic Details ── */}
                <div className="pf-section">
                  <div className="pf-section-label">Basic Details</div>
                  <p className="pf-section-desc">Core product information shown in lists and detail views.</p>

                  <div className="pf-field">
                    <label className="pf-label">Product Name</label>
                    <input
                      type="text"
                      className="pf-input"
                      placeholder="e.g. MedScan Pro X1"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="pf-grid-2">
                    <div className="pf-field">
                      <label className="pf-label">Category / Type</label>
                      <input
                        type="text"
                        className="pf-input"
                        placeholder="e.g. Diagnostic Imaging"
                        required
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      />
                    </div>
                    <div className="pf-field">
                      <label className="pf-label">Image URL</label>
                      <input
                        type="text"
                        className="pf-input"
                        placeholder="https://..."
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="pf-field">
                    <label className="pf-label">Product Brochure (PDF)</label>
                    <div className="pf-file-wrapper">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const fd = new FormData();
                          fd.append('brochure', file);
                          try {
                            setIsUploading(true);
                            const res = await api.post('/upload/brochure', fd, {
                              headers: { 'Content-Type': 'multipart/form-data' },
                            });
                            setFormData({ ...formData, brochure_url: res.data.url });
                          } catch (err) {
                            console.error('Upload failed:', err);
                          } finally {
                            setIsUploading(false);
                          }
                        }}
                      />
                      {isUploading && (
                        <span className="pf-upload-loader">
                          <Loader2 size={14} className="spinner" /> Uploading...
                        </span>
                      )}
                      {!isUploading && formData.brochure_url && (
                        <span className="pf-upload-success">✓ PDF Linked</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── SECTION 2: Technical Specifications ── */}
                <div className="pf-section">
                  <div className="pf-section-label">Technical Specifications</div>
                  <p className="pf-section-desc">Separate the overview from the technical data for easier editing.</p>

                  <div className="pf-grid-2">
                    <div className="pf-field">
                      <label className="pf-label">Brief Description</label>
                      <textarea
                        className="pf-input pf-textarea"
                        rows={4}
                        placeholder="General overview of the product..."
                        value={formData.short_desc}
                        onChange={(e) => setFormData({ ...formData, short_desc: e.target.value })}
                      />
                    </div>
                    <div className="pf-field">
                      <label className="pf-label">Technical Specs</label>
                      <textarea
                        className="pf-input pf-textarea"
                        rows={4}
                        placeholder="Dimensions, Power, Frequency..."
                        value={formData.tech_specs}
                        onChange={(e) => setFormData({ ...formData, tech_specs: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* ── SECTION 3: Clinical Application ── */}
                <div className="pf-section">
                  <div className="pf-section-label">Clinical Application</div>
                  <p className="pf-section-desc">Describe the usage context and purpose in plain language.</p>

                  <div className="pf-field">
                    <label className="pf-label">Usage & Clinical Purpose</label>
                    <textarea
                      className="pf-input pf-textarea"
                      rows={4}
                      placeholder="What clinical problems does this solve?"
                      value={formData.usage_purpose}
                      onChange={(e) => setFormData({ ...formData, usage_purpose: e.target.value })}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="pf-modal-actions">
                  <button type="button" className="pf-btn-cancel" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="pf-btn-submit">
                    {editingProduct ? 'Update Product' : 'Register Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── VIEW / DETAIL MODAL ── */}
      <AnimatePresence>
        {viewingProduct && (
          <div className="modal-overlay" onClick={() => setViewingProduct(null)}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="detail-modal glass-panel"
              onClick={e => e.stopPropagation()}
            >
              <div className="detail-hero">
                {viewingProduct.image_url
                  ? <img src={viewingProduct.image_url} alt="" />
                  : <div className="detail-hero-placeholder"><ImageIcon size={60} /></div>}
                <button className="detail-close" onClick={() => setViewingProduct(null)}><X size={24} /></button>
                <div className="detail-hero-overlay">
                  <span className="badge">{viewingProduct.type}</span>
                  <h2>{viewingProduct.name}</h2>
                </div>
              </div>
              <div className="detail-content">
                <div className="detail-section">
                  <label>Full Product Information</label>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{viewingProduct.info || 'No detailed information available.'}</p>
                </div>
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="item-icon"><Calendar size={18} /></div>
                    <div className="item-info">
                      <label>Date Added</label>
                      <span>{new Date(viewingProduct.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="item-icon"><Tag size={18} /></div>
                    <div className="item-info">
                      <label>Status</label>
                      <span className="status-active">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Products;
