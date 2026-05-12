import React, { useState, useEffect } from 'react';
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

export interface Product {
  id: string;
  name: string;
  type: string;
  info?: string;
  image_url?: string;
  created_at: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // --- UPDATED FORM STATE (Separated Contexts) ---
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    image_url: '',
    short_desc: '',
    tech_specs: '',
    usage_purpose: ''
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

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);

      // I-format ang info string pabalik sa 3 sections para sa Edit Mode
      const infoText = product.info || '';
      setFormData({
        name: product.name,
        type: product.type,
        image_url: product.image_url || '',
        // Simple parsing logic (Split by our markers)
        short_desc: infoText.split('[TECHNICAL SPECS]')[0]?.replace('[DESCRIPTION]', '').trim() || infoText,
        tech_specs: infoText.split('[TECHNICAL SPECS]')[1]?.split('[USAGE]')[0]?.trim() || '',
        usage_purpose: infoText.split('[USAGE]')[1]?.trim() || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', type: '', image_url: '', short_desc: '', tech_specs: '', usage_purpose: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- LOGIC: Combine the 3 contexts into ONE info string ---
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
      info: combinedInfo // This goes to your single 'info' column in DB
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

  return (
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
          <div className="glass-panel loading-container">
            <Loader2 className="spinner" size={40} />
            <p>Fetching database records...</p>
          </div>
        ) : viewMode === 'table' ? (
          <div className="glass-panel table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th className="id-col">Id</th>
                  <th className="photo-col">Photo</th>
                  <th className="name-col">Product Name</th>
                  <th className="type-col">Product Type</th>
                  <th className="info-col">Details</th>
                  <th className="date-col"> Date Added</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td className="index-column">{index + 1}</td>
                    <td>
                      <div className="product-img small">
                        {product.image_url ? <img src={product.image_url} alt="" /> : <ImageIcon size={18} />}
                      </div>
                    </td>
                    <td className="name-col"><span className="product-name">{product.name}</span></td>
                    <td className="type-col"><span className="badge">{product.type}</span></td>
                    <td className="info-col">
                      <div className="info-cell">{product.info || 'No details'}</div>
                    </td>
                    <td className="date-col">
                      <div className="date-wrapper">
                        <span>{new Date(product.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action view" onClick={() => setViewingProduct(product)}><Eye size={16} /></button>
                        <button className="btn-action edit" onClick={() => handleOpenModal(product)}><Edit3 size={16} /></button>
                        <button className="btn-action delete" onClick={() => handleDelete(product.id)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <motion.div layout key={product.id} className="product-card glass-panel">
                <div className="card-image">
                  {product.image_url ? <img src={product.image_url} alt="" /> : <div className="card-image-placeholder"><ImageIcon size={40} /></div>}
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

      {/* --- ADD / EDIT MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="modal-content glass-panel">
              <div className="modal-header">
                <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Product Category / Type</label>
                    <input type="text" required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input type="text" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                  </div>
                </div>

                {/* THE 3 CONTEXT FIELDS */}
                <div className="form-group">
                  <label style={{ color: 'var(--primary)', fontSize: '0.75rem' }}>SECTION 1: INFO / DESCRIPTION</label>
                  <textarea rows={2} placeholder="Brief overview..." value={formData.short_desc} onChange={(e) => setFormData({ ...formData, short_desc: e.target.value })} />
                </div>

                <div className="form-group">
                  <label style={{ color: 'var(--primary)', fontSize: '0.75rem' }}>SECTION 2: TECHNICAL SPECS</label>
                  <textarea rows={2} placeholder="Dimensions, Power, Material..." value={formData.tech_specs} onChange={(e) => setFormData({ ...formData, tech_specs: e.target.value })} />
                </div>

                <div className="form-group">
                  <label style={{ color: 'var(--primary)', fontSize: '0.75rem' }}>SECTION 3: USAGE & PURPOSE</label>
                  <textarea rows={2} placeholder="What is it for? How to use?" value={formData.usage_purpose} onChange={(e) => setFormData({ ...formData, usage_purpose: e.target.value })} />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">{editingProduct ? 'Update Product' : 'Create Product'}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- DETAIL MODAL --- */}
      <AnimatePresence>
        {viewingProduct && (
          <div className="modal-overlay" onClick={() => setViewingProduct(null)}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="detail-modal glass-panel" onClick={e => e.stopPropagation()}>
              <div className="detail-hero">
                {viewingProduct.image_url ? <img src={viewingProduct.image_url} alt="" /> : <div className="detail-hero-placeholder"><ImageIcon size={60} /></div>}
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
                    <div className="item-info"><label>Date Added</label><span>{new Date(viewingProduct.created_at).toLocaleDateString()}</span></div>
                  </div>
                  <div className="detail-item">
                    <div className="item-icon"><Tag size={18} /></div>
                    <div className="item-info"><label>Status</label><span className="status-active">Active</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;