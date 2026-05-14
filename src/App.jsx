import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
// This is a special component that checks if a user is logged in.
// If they have a token, it shows the page. If not, it kicks them back to login.
const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Automatically redirect the root URL to the login page */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* The Login Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* The Protected Product List Route */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              {/* We will build the actual ProductList component next */}
              <ProductList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;