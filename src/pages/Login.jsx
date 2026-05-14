import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom'; // Add Link here!

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Grab state variables from Redux
    const { isLoading, error, token } = useSelector((state) => state.auth);

    // If the token exists, the user is logged in. Redirect them.
    useEffect(() => {
        if (token) {
            navigate('/products'); // We will build this page next
        }
    }, [token, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            // Dispatch the thunk with the user's input
            dispatch(loginUser({ username, password }));
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Admin Login</h2>

                {/* Error Feedback */}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username (e.g., emilys)"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password (e.g., emilyspass)"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {/* NEW: Link to Register Page */}
                <div className="text-center mt-3">
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/register" className="text-decoration-none">Register here</Link>
                </div>
            </div>
        </div>

    );
}