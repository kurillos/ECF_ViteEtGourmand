import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/admin/AdminDashboard';
import Login from './pages/Login';
import Contact from './components/Contact';
import AdminOrders from './pages/admin/AdminOrders';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/commandes" element={ 
          <ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_USER', 'ROLE_EMPLOYE']}>
            <AdminOrders />
          </ProtectedRoute>
        } 
      />
      </Routes>
    </Router>
  );
}

export default App;