// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router for navigation
import FrontPage from './components/frontPage'; // Import the FrontPage component
import Menu from './components/menuPage'; // Import the Menu component
import Login from './components/Login'; // Import the Login component
import Cart from './components/Cart'; // Import the Cart component
import { CartProvider } from './components/CartContext'; // Import the CartProvider for managing cart state
import SignUp from './components/Signup'; // Import the SignUp component
import Contact from './components/Contact'; // Import the Contact component
import About from './components/aboutUs'; // Import the About Us component
import AdminDashboard from './components/AdminDashboard'; // Import the AdminDashboard component
import OrderTracking from './components/OrderTracking'; // Import the OrderTracking component
import './App.css'; // Import the CSS file for styling

function App() {
  return (
    // CartProvider wraps the entire app to provide cart state globally
    <CartProvider>
      {/* Router wraps the app to enable navigation between pages */}
      <Router>
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<FrontPage />} /> {/* Home page */}
          <Route path="/menu" element={<Menu />} /> {/* Menu page */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/cart" element={<Cart />} /> {/* Cart page */}
          <Route path="/signup" element={<SignUp />} /> {/* Sign-up page */}
          <Route path="/contact" element={<Contact />} /> {/* Contact page */}
          <Route path="/about" element={<About />} /> {/* About Us page */}
          <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard page */}
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} /> {/* Order Tracking page */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;