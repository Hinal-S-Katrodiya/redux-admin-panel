import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../features/authSlice';

export default function Register() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', username: '', password: '' });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the register action and wait for it to finish
    const resultAction = await dispatch(registerUser(formData));
    
    // If successful, alert the user and send them to the login page
    if (registerUser.fulfilled.match(resultAction)) {
      alert('Registration successful! Please log in with your new credentials.');
      navigate('/login');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '450px' }}>
        <h2 className="text-center mb-4">Create an Account</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="col">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          
          <button type="submit" className="btn btn-success w-100 mb-3" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center">
          <span className="text-muted">Already have an account? </span>
          <Link to="/login" className="text-decoration-none">Log in here</Link>
        </div>
      </div>
    </div>
  );
}