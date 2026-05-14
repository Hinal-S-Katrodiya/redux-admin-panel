import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, addProduct, updateProduct } from '../features/productSlice';
import { logout } from '../features/authSlice';

export default function ProductList() {
    const dispatch = useDispatch();
    const { items, total, isLoading, error } = useSelector((state) => state.products);

    // Form & Modal State
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: '', title: '', category: '', price: '', stock: '' });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Modal Controllers
    const openModal = (product = null) => {
        if (product) {
            setIsEditing(true);
            setFormData(product);
        } else {
            setIsEditing(false);
            setFormData({ id: '', title: '', category: '', price: '', stock: '' });
        }
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    // Form Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let safeValue = value;

        // Convert price to a standard number
        if (name === 'price') {
            safeValue = Number(value);
        }
        // Convert stock to a number, and force it to be AT LEAST 0
        else if (name === 'stock') {
            safeValue = Math.max(0, Number(value));
        }

        setFormData({ ...formData, [name]: safeValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updateProduct(formData));
        } else {
            dispatch(addProduct(formData));
        }
        closeModal();
    };

    return (
        <div className="container mt-5 position-relative">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Product Dashboard</h2>
                <div>
                    <button onClick={() => openModal()} className="btn btn-success me-2">
                        + Add Product
                    </button>
                    <button onClick={() => dispatch(logout())} className="btn btn-outline-danger">
                        Logout
                    </button>
                </div>
            </div>

            <div className="alert alert-info shadow-sm">
                <strong>Total Records:</strong> {total} products found in the database.
            </div>

            {isLoading && <p className="text-center mt-5">Loading products...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* The Data Table */}
            {!isLoading && !error && items.length > 0 && (
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover table-bordered align-middle mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {items.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td className="fw-bold">{product.title}</td>
                                    <td><span className="badge bg-secondary">{product.category}</span></td>
                                    <td>${Number(product.price).toFixed(2)}</td>
                                    <td>
                                        <span className={`fw-bold text-${product.stock > 10 ? 'success' : 'danger'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button onClick={() => openModal(product)} className="btn btn-sm btn-primary me-2">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this?')) dispatch(deleteProduct(product.id))
                                            }}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody> */}
                        <tbody>
                            {items.map((product) => (

                                < tr key={product.id} className={product.stock === 0 ? 'opacity-50 bg-light' : ''} >

                                    <td>{product.id}</td>

                                    <td className="fw-bold">
                                        {product.title}
                                        {/* 2. Add the Out of Stock Badge next to the title */}
                                        {product.stock === 0 && (
                                            <span className="badge bg-danger ms-2">Out of Stock</span>
                                        )}
                                    </td>

                                    <td><span className="badge bg-secondary">{product.category}</span></td>

                                    <td>${Number(product.price).toFixed(2)}</td>

                                    <td>
                                        {/* 3. Handle the stock number colors clearly */}
                                        {product.stock === 0 ? (
                                            <span className="text-danger fw-bold">0</span>
                                        ) : (
                                            <span className={`fw-bold text-${product.stock > 10 ? 'success' : 'warning'}`}>
                                                {product.stock}
                                            </span>
                                        )}
                                    </td>

                                    <td className="text-center">
                                        <button onClick={() => openModal(product)} className="btn btn-sm btn-primary me-2">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this?')) dispatch(deleteProduct(product.id))
                                            }}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            }

            {/* Custom Bootstrap Modal */}
            {
                showModal && (
                    <>
                        <div className="modal show d-block" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header bg-light">
                                        <h5 className="modal-title">{isEditing ? 'Edit Product' : 'Add New Product'}</h5>
                                        <button type="button" className="btn-close" onClick={closeModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label">Title</label>
                                                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Category</label>
                                                <input type="text" className="form-control" name="category" value={formData.category} onChange={handleInputChange} required />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Price ($)</label>
                                                    <input type="number" className="form-control" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Stock</label>
                                                    <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleInputChange} required min="0" />
                                                </div>
                                            </div>
                                            <div className="modal-footer px-0 pb-0">
                                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                                <button type="submit" className="btn btn-primary">{isEditing ? 'Save Changes' : 'Create Product'}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Modal Backdrop */}
                        <div className="modal-backdrop show" style={{ opacity: 0.5 }}></div>
                    </>
                )
            }
        </div >
    );
}