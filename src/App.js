import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { RideProvider } from './context/RideContext'; // Import the provider
import Login from './components/Login';
import Booking from './components/Booking';
import Profile from './components/Profile';
import RideHistory from './components/RideHistory';
import Payment from './components/Payment';
import Sidebar from './components/Sidebar';
import LogoutButton from './components/LogoutButton';
import 'mapbox-gl/dist/mapbox-gl.css';

// Load Stripe with a test key
const stripePromise = loadStripe('pk_test_TYooMQauyJYxP1s0No6z'); // Use the test key

// Function to check login state from localStorage
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); // Returns true if token exists
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  // Update login state when localStorage changes (simulate login check)
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  // Handle login and set token in localStorage
  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token from storage
    setIsLoggedIn(false); // Update state to logged out
  };

  return (
    <ChakraProvider>
      <RideProvider>
        <Elements stripe={stripePromise}>
          <Router>
            {/* Show Sidebar and LogoutButton only if logged in */}
            {isLoggedIn && (
              <>
                <Sidebar />
                <LogoutButton onLogout={handleLogout} />
              </>
            )}

            <Routes>
              {/* Default route should redirect based on authentication */}
              <Route
                path="/"
                element={<Navigate to={isLoggedIn ? "/booking" : "/login"} />}
              />

              {/* Login route */}
              <Route
                path="/login"
                element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/booking" />}
              />

              {/* Protected routes */}
              <Route
                path="/booking"
                element={isLoggedIn ? <Booking /> : <Navigate to="/login" />}
              />

              <Route
                path="/profile"
                element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
              />

              <Route
                path="/ride-history"
                element={isLoggedIn ? <RideHistory /> : <Navigate to="/login" />}
              />

              <Route
                path="/payment"
                element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
              />

              {/* Catch-all route that redirects to login */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Router>
        </Elements>
      </RideProvider>
    </ChakraProvider>
  );
};

export default App;
